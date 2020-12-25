import React from "react";
import { FieldProps, FormikProps } from "formik";
import { Form } from "semantic-ui-react";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { DayValue, Day, CalendarDigit } from 'react-modern-calendar-datepicker';

const customLocale = {
    months: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ],
    weekDays: [
      {
        name: 'Montag',
        short: 'Mo',
      },
      {
        name: 'Dienstag',
        short: 'Di',
      },
      {
        name: 'Mittwoch',
        short: 'Mi',
      },
      {
        name: 'Donnerstag',
        short: 'Do',
      },
      {
        name: 'Freitag',
        short: 'Fr',
      },
      {
        name: 'Samstag',
        short: 'Sa',
        isWeekend: true,
      },
      {
        name: 'Sonntag', 
        short: 'So',
        isWeekend: true,
      },
    ],

    weekStartingIndex: 6,

    getToday(gregorainTodayObject: Day) {
      return gregorainTodayObject;
    },

    toNativeDate(date: Day) {
      return new Date(date.year, date.month - 1, date.day);
    },

    getMonthLength(date: Day) {
      return new Date(date.year, date.month, 0).getDate();
    },

    transformDigit(digit: CalendarDigit) {
      return digit;
    },

    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    defaultPlaceholder: 'Select...',

    from: 'from',
    to: 'to',

    digitSeparator: ',',

    yearLetterSkip: 0,

    isRtl: false,
};

const date2DayValue = (date: string): DayValue => {
    if (date==='') return null;

    return { year: +date.substr(6,4), month: +date.substr(3,2), day: +date.substr(0,2) };
};

const dayValue2date = (dayValue: DayValue): string => {
    if (dayValue===null||dayValue===undefined) return '';
    
    return (dayValue.day < 10 ? "0" : "") + dayValue.day + "." + (dayValue.month < 10 ? "0" : "") + dayValue.month + "." + dayValue.year;
}

interface PickProps extends FieldProps {
    label: string;
    date: string;
    setFieldValue: FormikProps<{}>["setFieldValue"];
    setFieldTouched: FormikProps<{}>["setFieldTouched"];
};

export const PickField: React.FC<PickProps> = ({
    field,
    label,
    date,
    setFieldValue,
    setFieldTouched  
    }) => {
        const formatInputValue = () => date;
        
        return (
          <Form.Field>
            <label>{label}</label>
            <DatePicker
              value={date2DayValue(date)}
              onChange={async (event) => {
                setFieldValue(field.name, dayValue2date(event));
                setFieldTouched(field.name);
              }}
              formatInputText={formatInputValue}
              inputPlaceholder="Tag auswählen"
              shouldHighlightWeekends={true}
              locale={customLocale}
              calendarPopperPosition={'auto'}
            />
          </Form.Field>
        );
};
        
  