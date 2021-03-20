import { Format, FormatNoID } from '../../../../backend/src/types/basic';

export const nextFormat = (formats: Format[]): FormatNoID => {
    let maxNumber = 0;
    Object.values(formats).forEach(format => {
        if (format.seqnr>maxNumber) {
            maxNumber = format.seqnr;
        }
    });
  
    const format: FormatNoID = {
        name: '',
        seqnr: maxNumber + 1
    };
  
    return format;
};

export const emptyFormat = (): Format => {
    const format: Format = {
        id: '',
        name: '',
        seqnr: 0
    };
  
    return format;
};
  
export const getFormat = (formats: Format[], formatName: string): Format => {
    let format: Format = emptyFormat();
  
    Object.values(formats).forEach(item => {
      if (item.name===formatName) format = item;
    });
  
    return format;
};

const sortFormatlist = (a: Format, b: Format) => {
  const nameA = a.seqnr;
  const nameB = b.seqnr;
  if (nameA > nameB) {
      return -1;
  }
  if (nameA < nameB) {
      return 1;
  }
  return 0;
};

export const sortFormats = (formats: Format[]) => {
  return formats.sort(sortFormatlist);
};

  
    
  