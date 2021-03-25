/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as fs from "fs";
import pdfkit from 'pdfkit';


import { Month, MonthNoID, Day, Weight, Average, Measure } from '../../types/pressure';

enum Monthnames {
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
}

enum Daynames {
    "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"
}

export const importPG = (filename: string): MonthNoID[] => {
    const months: MonthNoID[] = [];
    const pressureData = fs.readFileSync(filename, 'utf8');
    const pressureDataLines: string[] = pressureData.split('\n');
    const pressureMonths = pressureDataLines
        .filter(line => line.startsWith('20'))
        .filter(line => line.split('\t').length===14)
        .sort();
    const pressureDays = pressureDataLines
        .filter(line => line.startsWith('20'))
        .filter(line => line.split('\t').length===11)
        .sort();
    pressureMonths.forEach(currentMonth => {
        const monthparts: string[] = currentMonth.split('\t');
        const monthdays = pressureDays.filter(pressureDay => pressureDay.split('\t')[1]===monthparts[0]);
        const key = monthparts[0];
        const year = key.substr(0,4);
        const month = key.substr(4);
        const monthname = Monthnames[+month-1];
        const weight: Weight = { 
            total: formatWeight(+monthparts[2]),
            start: formatWeight(+monthparts[3]),
            end: formatWeight(+monthparts[4])
        };
        const diastolic: Average = {
            total: formatMeasure(+monthparts[5]),
            early: formatMeasure(+monthparts[6]),
            late: formatMeasure(+monthparts[7])
        };
        const systolic: Average = {
            total: formatMeasure(+monthparts[8]),
            early: formatMeasure(+monthparts[9]),
            late: formatMeasure(+monthparts[10])
        };
        const pulse: Average = {
            total: formatMeasure(+monthparts[11]),
            early: formatMeasure(+monthparts[12]),
            late: formatMeasure(+monthparts[13])
        };
        const days: Day[] = [];
        monthdays.forEach((currentDay, index) => {
            const dayparts: string[] = currentDay.split('\t');
            const date = formatDay(+year, +month, index+1);
            const weight = formatWeight(+dayparts[2]);
            const early: Measure = {
                time: formatTime(+dayparts[3]),
                systolic: formatMeasure(+dayparts[4]),
                diastolic: formatMeasure(+dayparts[5]),
                pulse: formatMeasure(+dayparts[6])
            };
            const late: Measure = {
                time: formatTime(+dayparts[7]),
                systolic: formatMeasure(+dayparts[8]),
                diastolic: formatMeasure(+dayparts[9]),
                pulse: formatMeasure(+dayparts[10])
            };
            const day: Day = {
                date,
                weight,
                early,
                late,
            };
            days.push(day);    
        });
        const newMonth: MonthNoID = {
            key,
            year,
            month,
            monthname,
            weight,
            diastolic,
            systolic,
            pulse,
            days    
        };
        months.push(newMonth);
    });

    return months;
};

const formatDay = (year: number, month: number, day: number): string => {
    const testdate = new Date(year, month-1, day);
    const dayName = Daynames[(testdate.getDay() + 6) % 7];
    const formatedDay = dayName + " " + (day < 10 ? "0" : "") + String(day) + "." + (month < 10 ? "0" : "") + String(month) + "." + String(year);
    
    return formatedDay;
};

const formatTime = (time: number): string => {
    let timeAsString = +time===-1 
      ? ""
      : String(time);
    switch (timeAsString.length) {
      case 1:
        timeAsString = "00:00";
        break;
      case 2:
        timeAsString = `00:${timeAsString}`;
        break;
      case 3:
        timeAsString = `0${timeAsString.substr(0,1)}:${timeAsString.substr(1,2)}`;
        break;
      case 4:
        timeAsString = `${timeAsString.substr(0,2)}:${timeAsString.substr(2,2)}`;
        break;   
      default:
      }
  
    return timeAsString;
};

const formatMeasure = (measureAsNumber: number): string => {
    const measureAsString = measureAsNumber===0 ? "" : String(measureAsNumber);
  
    return measureAsString;
};

const formatWeight = (weightAsNumber: number): string => {
    let weightAsString = weightAsNumber===0 ? "" : String(weightAsNumber / 10).replace('.', ',');
    if (weightAsString.length===2) weightAsString += ",0";
  
    return weightAsString;
};

export const exportMG = (filename: string, month: Month): Month => {
    let content = '<MONTH>\n';
    content += `<KEY>${month.key}</KEY>\n`;
    content += `<YEAR>${month.year}</YEAR>\n`;
    content += `<MONTHNUMBER>${month.month}</MONTHNUMBER>\n`;
    content += `<MONTHNAME>${month.monthname}</MONTHNAME>\n`;
    content += `<WEIGHT>\n`;
    content += `<START>${month.weight.start}</START>\n`;
    content += `<END>${month.weight.end}</END>\n`;
    content += `<TOTAL>${month.weight.total}</TOTAL>\n`;
    content += `</WEIGHT>\n`;
    content += `<DIASTOLIC>\n`;
    content += `<EARLY>${month.diastolic.early}</EARLY>\n`;
    content += `<LATE>${month.diastolic.late}</LATE>\n`;
    content += `<TOTAL>${month.diastolic.total}</TOTAL>\n`;
    content += `</DIASTOLIC>\n`;
    content += `<SYSTOLIC>\n`;
    content += `<EARLY>${month.systolic.early}</EARLY>\n`;
    content += `<LATE>${month.systolic.late}</LATE>\n`;
    content += `<TOTAL>${month.systolic.total}</TOTAL>\n`;
    content += `</SYSTOLIC>\n`;
    content += `<PULSE>\n`;
    content += `<EARLY>${month.pulse.early}</EARLY>\n`;
    content += `<LATE>${month.pulse.late}</LATE>\n`;
    content += `<TOTAL>${month.pulse.total}</TOTAL>\n`;
    content += `</PULSE>\n`;
    month.days.forEach((day,index) => {
        content += `<DAY number="${index}">\n`;
        content += `<DATE>${day.date}</DATE>\n`;
        content += `<WEIGHT>${day.weight}</WEIGHT>\n`;
        content += `<EARLY>\n`;
        content += `<TIME>${day.early.time}</TIME>\n`;
        content += `<DIASTOLIC>${day.early.diastolic}</DIASTOLIC>\n`;
        content += `<SYSTOLIC>${day.early.systolic}</SYSTOLIC>\n`;
        content += `<PULSE>${day.early.pulse}</PULSE>\n`;
        content += `</EARLY>\n`;
        content += `<LATE>\n`;
        content += `<TIME>${day.late.time}</TIME>\n`;
        content += `<DIASTOLIC>${day.late.diastolic}</DIASTOLIC>\n`;
        content += `<SYSTOLIC>${day.late.systolic}</SYSTOLIC>\n`;
        content += `<PULSE>${day.late.pulse}</PULSE>\n`;
        content += `</LATE>\n`;
        content += `</DAY>\n`;
    });
    content += '</MONTH>\n';

    try {
        fs.writeFileSync(filename, content);
    } catch (err) {
        console.error(err);
    }

    return month;
};

export const pdfMG = (filename: string, month: Month): Month => {
    // ToDo: existiert folder (speziell subfolder year)?

    const width   = 43;             // Breite eines 'kleinen' Feldes, die großen sind 3x so groß 
    const height  = 16;             // Zeilenhöhe
    const offsetx = 50;             // linker Rand
    const offsety = 20;             // Abstanf zum Topic
    const font1 = 'Helvetica-Bold'; // Font der Überschriften
    const font2 = 'Courier';        // Font der Variablen
    const small   = 12;             // Fontgröße
    const middle  = 18;
    const big     = 24;

    // Überschrift: Monat und Jahr
    const main = 
        {
            text: `${month.monthname} ${month.year}`,
            font: font1,
            size: big,
            align: 'left',
            x: 80,
            y: 40
        };

    const topics = [
        // Unterpunkt Gewicht
        // Zeile 1: Spaltenüberschriften
        // Zeile 2: Werte
        {
            text: 'Gewicht',
            font: font1,
            size: middle,
            align: 'left',
            x: 50,
            y: 75,
            rows: 
            [
                {
                    columns:
                    [
                        {
                            text: '',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Mittelwert',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Start',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Ende',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                    ],
                },
                {
                    columns:
                    [
                        {
                            text: '',
                            font: font2,
                            size: small,
                            align: 'left'
                        },
                        {
                            text: `${month.weight.total}`,
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: `${month.weight.start}`,
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: `${month.weight.end}`,
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                    ],
                },
            ]
        },
        // Unterpunkt Blutdruck
        // Zeile 1: Spaltenüberschriften
        // Zeile 2: Werte Systolisch
        // Zeile 3: Werte Diastolisch
        // Zeile 4: Werte Puls
        {
            text: 'Blutdruck',
            font: font1,
            size: middle,
            align: 'left',
            x: 50,
            y: 140,
            rows: [
                {
                    columns:
                    [
                        {
                            text: 'Messwert',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Gesamt',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Früh',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Spät',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                    ],
                },
                {
                    columns:
                    [
                        {
                            text: 'Systolisch',
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: `${month.systolic.total}`,
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: `${month.systolic.early}`,
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: `${month.systolic.late}`,
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                    ],
                },
                {
                    columns:
                    [
                        {
                            text: 'Diastolisch',
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: `${month.diastolic.total}`,
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: `${month.diastolic.early}`,
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: `${month.diastolic.late}`,
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                    ],
                },
                {
                    columns:
                    [
                        {
                            text: 'Puls',
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: `${month.pulse.total}`,
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: `${month.pulse.early}`,
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: `${month.pulse.late}`,
                            font: font2,
                            size: small,
                            align: 'center'
                        },
                    ],
                },

            ]
        },
        // Unterpunkt Messwerte
        // Zeile 1: Spaltenüberschriften
        // Zeile 2..32: Werte 
        {
            text: 'Messwerte',
            font: font1,
            size: middle,
            align: 'left',
            x: 50,
            y: 235,
            rows: [
                {
                    columns:
                    [
                        {
                            text: 'Datum',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'KG',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Früh',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Syst',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Diast',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Puls',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Spät',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Syst',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Diast',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                        {
                            text: 'Puls',
                            font: font1,
                            size: small,
                            align: 'center'
                        },
                    ],
                },
            ],
        },
    ];

    const PDFDocument = pdfkit;
    const doc = new PDFDocument({ size: 'A4' });
    doc.pipe(fs.createWriteStream(filename));

    // Überschrift
    doc.fontSize(24)
       .font('Helvetica-Bold')
       .text(main.text, main.x, main.y);

    // 3 Unterpunkte
    for (let topic=0;topic<3;topic++) {
        // Überschrift
        doc.fontSize(topics[topic].size)
           .font(topics[topic].font)
           .text(topics[topic].text, topics[topic].x, topics[topic].y);
        const x = offsetx;
        switch (topic) {
            // Unterpunkt 1 und 2 (Gewicht und Durchschnittswerte)
            case 0:
            case 1:
                // 4 breite Spalten
                for (let row=0;row<topics[topic].rows.length;row++) {
                    const y = topics[topic].y + offsety + row*height;
                    // Rahmen pro Zeile
                    doc.moveTo(x,y)
                       .lineTo(x+width*4*3,y)
                       .lineTo(x+width*4*3,y+height)
                       .lineTo(x,y+height)
                       .lineTo(x,y)
                       .stroke();
                    // senkrechte Striche
                    for (let column=1;column<topics[topic].rows[row].columns.length;column++) {
                        doc.moveTo(x+column*width*3,y)
                           .lineTo(x+column*width*3,y+height)
                           .stroke();
                    }
                    // Text, schon oben definiert
                    for (let column=0;column<topics[topic].rows[row].columns.length;column++) {
                        doc.fontSize(topics[topic].rows[row].columns[column].size)
                           .font(topics[topic].rows[row].columns[column].font)
                           .text(topics[topic].rows[row].columns[column].text, x+column*width*3, y+5, 
                                { width: width*3, align: topics[topic].rows[row].columns[column].align });
                    }
                }
                break;
            // Unterpunkt 3 (die Messwerte)
            case 2:
                const y = topics[topic].y + offsety;
                // Rahmen
                doc.moveTo(x,y)
                   .lineTo(x+width*4*3,y)
                   .lineTo(x+width*4*3,y+32*height)
                   .lineTo(x,y+32*height)
                   .lineTo(x,y)
                   .stroke();
                // senkrechter Strich (breiter Abstand)
                doc.moveTo(x+width*3,y)
                   .lineTo(x+width*3,y+32*height)
                   .stroke();
                // Überschrift der breiten Spalte
                doc.fontSize(topics[topic].rows[0].columns[0].size)
                   .font(topics[topic].rows[0].columns[0].font)
                   .text(topics[topic].rows[0].columns[0].text, x, y+5, 
                        { width: width*3, align: topics[topic].rows[0].columns[0].align });
                // 8 schmale Spalten
                for (let column=1;column<topics[topic].rows[0].columns.length;column++) {
                    // Überschriften der schmalen Spalten
                    doc.fontSize(topics[topic].rows[0].columns[column].size)
                       .font(topics[topic].rows[0].columns[column].font)
                       .text(topics[topic].rows[0].columns[column].text, x+(column+2)*width, y+5, 
                            { width: width, align: topics[topic].rows[0].columns[column].align });
                    // senkrechte Linien
                    doc.moveTo(x+(column+2)*width,y)
                            .lineTo(x+(column+2)*width,y+32*height)
                            .stroke();
                }
                // waagrechte Linien
                for (let row=1; row<32; row++) {
                    doc.moveTo(x,y+row*height)
                       .lineTo(x+width*12,y+row*height)
                       .stroke(); 
                }
                // zeilenweise Werte
                for (let row=0;row<month.days.length;row++) {
                    doc.fontSize(small)
                       .font(font2)
                       .text(month.days[row].date, x, y+((row+1)*height)+5, 
                            { width: width*3, align: topics[topic].rows[0].columns[0].align })
                       .text(month.days[row].weight, x+width*3, y+((row+1)*height)+5, 
                            { width: width, align: topics[topic].rows[0].columns[0].align })
                       .text(month.days[row].early.time, x+width*4, y+((row+1)*height)+5, 
                            { width: width, align: topics[topic].rows[0].columns[0].align })
                       .text(month.days[row].early.systolic, x+width*5, y+((row+1)*height)+5, 
                            { width: width, align: topics[topic].rows[0].columns[0].align })
                       .text(month.days[row].early.diastolic, x+width*6, y+((row+1)*height)+5, 
                            { width: width, align: topics[topic].rows[0].columns[0].align })
                       .text(month.days[row].early.pulse, x+width*7, y+((row+1)*height)+5, 
                            { width: width, align: topics[topic].rows[0].columns[0].align })
                       .text(month.days[row].late.time, x+width*8, y+((row+1)*height)+5, 
                            { width: width, align: topics[topic].rows[0].columns[0].align })
                       .text(month.days[row].late.systolic, x+width*9, y+((row+1)*height)+5, 
                            { width: width, align: topics[topic].rows[0].columns[0].align })
                       .text(month.days[row].late.diastolic, x+width*10, y+((row+1)*height)+5, 
                            { width: width, align: topics[topic].rows[0].columns[0].align })
                       .text(month.days[row].late.pulse, x+width*11, y+((row+1)*height)+5, 
                            { width: width, align: topics[topic].rows[0].columns[0].align })
                        ;
                }
                break;
            default:
        }
    }

    doc.end();

    return month;
};
