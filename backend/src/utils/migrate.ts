/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as fs from "fs";

import { Month, MonthNoID, Day, Weight, Average, Measure, Daynames, Monthnames } from '../types/blutdruckTypes';

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
