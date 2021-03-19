import { Format, FormatNoID } from '../../../../backend/src/types/basic';

export const newFormat = (): FormatNoID => {
    const format: FormatNoID = {
        name: "",
        seqnr: 0
    };

    return format;
};

export const nextFormat = (formats: Format[]): FormatNoID => {
    const format: FormatNoID = {
        name: "",
        seqnr: nextSeqnr(formats)
    };

    return format;
};

export const emptyFormat = (): Format => {
    const format: Format = {
        id: '',
        name: "",
        seqnr: 0
    };

    return format;
};

export const nextSeqnr = (formats: Format[]): number => {
    let maxNumber = 0;
    Object.values(formats).forEach(format => {
        if (format.seqnr >maxNumber) maxNumber = format.seqnr;
    });
    
    return maxNumber+1;
};

