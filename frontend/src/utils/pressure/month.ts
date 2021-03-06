import { Month, MonthNoID, Day, Year } from '../../../../backend/src/types/pressure';
import { Monthnames, Daynames } from '../../types/basic';

export const sortMonthList = (monthList: Month[]): Month[] => {
  const sortedMonthList: Month[] = monthList.sort(function(a,b) {
    const nameA = a.key;
    const nameB = b.key;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return sortedMonthList;
};

export const emptyMonth = (): Month => {
  const newMonth: Month = {
    id: '',
    key: '',
    year: '',
    month: '',
    monthname: '',
    weight: {
        total: '',
        start: '',
        end: ''
    },
    diastolic: {
        total: '',
        early: '',
        late: ''
    },
    systolic: {
        total: '',
        early: '',
        late: ''
    },
    pulse: {
        total: '',
        early: '',
        late: ''
    },
    days: []
  };

  return newMonth;
};

const findValue = (tot: string, cur: string): string => {
  return cur!=='' ? cur : tot;
};

const findSum = (tot: string, cur: string): string => {
  return !isNaN(+tot) ? String(+tot + +(cur.replace(',',''))) : String(+tot);
};

const findCount = (tot: number, cur: string): number => {
  return cur!=='' ? tot+1 : tot;
};

const formatMeasure = (measureAsNumber: number): string => {
  const decimalPart = Math.trunc(measureAsNumber);
  const measureAsString = decimalPart===0 ? "" : String(decimalPart);

  return measureAsString;
};

const formatWeight = (weightAsNumber: number): string => {
  let weightAsString = weightAsNumber===0 ? "" : String(weightAsNumber / 10).replace('.', ',');
  if (weightAsString.length===2) weightAsString += ",0";
  weightAsString = weightAsString.substr(0,4);

  return weightAsString;
};

export const formatTime = (time: number): string => {
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

export const addStatsToMonth = (month: Month): Month => {
  const updatedMonth: Month = {
    ...month
  };

  updatedMonth.weight.start = updatedMonth.days.map(day => day.weight).reduceRight(findValue, '');
  updatedMonth.weight.end = updatedMonth.days.map(day => day.weight).reduce(findValue, '');

  let sum, count, sumEarly, sumLate, countEarly, countLate;

  sum = +(updatedMonth.days.map(day => day.weight).reduce(findSum,'0'));
  count = updatedMonth.days.map(day => day.weight).reduce(findCount, 0);
  updatedMonth.weight.total = formatWeight(sum/(count!==0 ? count : 1));

  sumEarly = +(updatedMonth.days.map(day => day.early.systolic).reduce(findSum,'0'));
  countEarly = updatedMonth.days.map(day => day.early.systolic).reduce(findCount, 0);
  updatedMonth.systolic.early = formatMeasure(sumEarly/(countEarly!==0 ? countEarly : 1));

  sumLate = +(updatedMonth.days.map(day => day.late.systolic).reduce(findSum,'0'));
  countLate = updatedMonth.days.map(day => day.late.systolic).reduce(findCount, 0);
  updatedMonth.systolic.late = formatMeasure(sumLate/(countLate!==0 ? countLate : 1));

  sum = sumEarly+sumLate;
  count = countEarly + countLate;
  updatedMonth.systolic.total = formatMeasure(sum/(count!==0 ? count : 1));

  sumEarly = +(updatedMonth.days.map(day => day.early.diastolic).reduce(findSum,'0'));
  countEarly = updatedMonth.days.map(day => day.early.diastolic).reduce(findCount, 0);
  updatedMonth.diastolic.early = formatMeasure(sumEarly/(countEarly!==0 ? countEarly : 1));

  sumLate = +(updatedMonth.days.map(day => day.late.diastolic).reduce(findSum,'0'));
  countLate = updatedMonth.days.map(day => day.late.diastolic).reduce(findCount, 0);
  updatedMonth.diastolic.late = formatMeasure(sumLate/(countLate!==0 ? countLate : 1));

  sum = sumEarly+sumLate;
  count = countEarly + countLate;
  updatedMonth.diastolic.total = formatMeasure(sum/(count!==0 ? count : 1));

  sumEarly = +(updatedMonth.days.map(day => day.early.pulse).reduce(findSum,'0'));
  countEarly = updatedMonth.days.map(day => day.early.pulse).reduce(findCount, 0);
  updatedMonth.pulse.early = formatMeasure(sumEarly/(countEarly!==0 ? countEarly : 1));

  sumLate = +(updatedMonth.days.map(day => day.late.pulse).reduce(findSum,'0'));
  countLate = updatedMonth.days.map(day => day.late.pulse).reduce(findCount, 0);
  updatedMonth.pulse.late = formatMeasure(sumLate/(countLate!==0 ? countLate : 1));

  sum = sumEarly+sumLate;
  count = countEarly + countLate;
  updatedMonth.pulse.total = formatMeasure(sum/(count!==0 ? count : 1));

  return updatedMonth;
};

export const getNumberOfDays = (date: string): number => {
  let numberOfDays = 31;
  const year = +date.substr(0,4);
  const month = +date.substr(4,2);
  if (month === 4 || month === 6 || month === 9 || month === 11) --numberOfDays;
  if (month === 2) {
    numberOfDays -= 3;
    if (year %   4 === 0) numberOfDays++;
    if (year % 100 === 0) numberOfDays--;
    if (year % 400 === 0) numberOfDays++;
  }

  return numberOfDays;
};

export const formatDay = (year: number, month: number, day: number): string => {
  const testdate = new Date(year, month-1, day);
  const dayName = Daynames[(testdate.getDay() + 6) % 7];
  const formatedDay = dayName + " " + (day < 10 ? "0" : "") + day + "." + (month < 10 ? "0" : "") + month + "." + year;
  
  return formatedDay;
};

export const getNextMonth = (currentYear: Year): MonthNoID => {
  let year = '';
  let month = '';
  if ( currentYear.lastMonth!==12 ) {
    year = currentYear.name.name;
    month = (currentYear.lastMonth < 9 ? "0" : "") + String(currentYear.lastMonth+1);
  } else {
    year = String(+currentYear.name+1);
    month = "01";
  }
//  const { year, month } = getYear(currentYear);
  const monthname = Monthnames[+month-1];
  const key = year + month;
  const numberOfDays = getNumberOfDays(key);
  const weight = { total: "", start: "", end: "" };
  const diastolic = { total: "", early: "", late: "" };
  const systolic = { total: "", early: "", late: "" };
  const pulse = { total: "", early: "", late: "" };
  const days: Day[] = [];
  for (let index = 0; index < numberOfDays; index++) {
    const date = formatDay(+year, +month, index+1);
    const day: Day = {
      date,
      weight: "",
      early: {
        time: "",
        systolic: "",
        diastolic: "",
        pulse: ""
      },
      late: {
        time: "",
        systolic: "",
        diastolic: "",
        pulse: ""
      }
    }
    days.push(day);
  }
  const newMonth: MonthNoID = {
    key,
    year,
    month,
    monthname,
    weight,	   
    diastolic,	   
    systolic,	   
    pulse,
    days: days
  };

  return newMonth;
};

export const getPromptForNextMonth = (year: Year): string => {
  return (year.lastMonth===12)
  ? `Soll der Monat Januar im Jahr ${+year.name.name+1} angelegt werden?`
  : `Soll der Monat ${formatMonth(year.lastMonth+1)} im Jahr ${year.name.name} angelegt werden?`;
};

export const formatMonth = (monthAsNumber: number): string => {
  return Monthnames[monthAsNumber-1];
};
