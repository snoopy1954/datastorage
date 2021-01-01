/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
export const parseString = (text: any): string => {
    if (!text || !isString(text)) {
//      throw new Error(`Incorrect or missing parameter: ${text}`);
      text = '';
    }
  
    return text;
};

export const parseNumber = (text: any): number => {
    if (isNaN(text)) {
      throw new Error(`Incorrect or missing parameter: ${text}`);
    }
  
    return text;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const parseImage = (text: any): ArrayBuffer => {
    return text;
};

export const parseStringArray = (text: any): [string] => {

    return text;
};

export const parseBoolean = (text: any): boolean => {

    return text;
};

export const parseDate = (text: any): Date => {
    if (!text) {
      throw new Error(`Incorrect or missing parameter: ${text}`);
    }
  
    return text;
};

