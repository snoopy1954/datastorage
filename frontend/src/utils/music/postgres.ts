/**
 *         const regexp = /^(\{
 * "ident":(\d*),
 * "seqnr":(\d*),
 * "name":"([A-Za-z0-9.,&!?()\-+'´"äöüÖÄÜß_éáíâåñ[\]\s]*)",
 * "type":"([A-Za-z0-9\s]*)",
 * "grade":([0-9]*)
 * \})$/;

 */
export const getArtistRegexp = (): RegExp => {
    const parts: string[] = [];
    parts.push('^(\\{');
    parts.push('"ident":(\\d*),');
    parts.push('"seqnr":(\\d*),');
    parts.push('"name":"([A-Za-z0-9.,&!?()\\-+\'\\´"äöüÖÄÜß_éáíâåñ[\\]\\s]*)",');
    parts.push('"type":"([A-Za-z0-9\\s]*)",');
    parts.push('"grade":(\\d*)');
    parts.push('.*)$');
    const expression = parts.reduce(function(acc, cur){return acc.concat(cur)}, '');
    const regexp: RegExp = new RegExp(expression);

    return regexp;
};

export const getCdRegexp = (): RegExp => {
    const parts: string[] = [];
    parts.push('^(\\{');
    parts.push('"ident":(\\d*),');
    parts.push('"seqnr":(\\d*),');
    parts.push('"name":"([A-Za-z0-9.,;&!?#%{}()=\\-…+\'\\´\\"\\’äöüÖÄÜß_èéáàíâåñïóùúÚ²–[\\]\\s]*)",');
    parts.push('"artistident":(\\d*),');
    parts.push('"type":"([A-Za-z0-9\\s]*)",');
    parts.push('"source":"([A-Za-z]*)",');
    parts.push('"folder":"([A-Za-z0-9.,;&!?#%{}()=\\-…+\'´\\"\\’äöüÖÄÜß_èéáàíâåñïóùúÚ²–[\\]\\s]*)",');
    parts.push('"grade":(\\d*),');
    parts.push('"tracknumber":(\\d*),');
    parts.push('"year":"([\\d]*)",');
    parts.push('"time_s":"([\\d:]*)",');
    parts.push('"size_s":"([\\dMB\\s]*)",');
    parts.push('"bitrate_s":"([\\dBit/s\\s]*)",');
    parts.push('"time_i":([\\d]*),');
    parts.push('"size_i":([\\d]*),');
    parts.push('"bitrate_i":([\\d]*)');
    parts.push('.*)$');
    const expression = parts.reduce(function(acc, cur){return acc.concat(cur)}, '');
    const regexp: RegExp = new RegExp(expression);

    return regexp;
};

export const getTrackRegexp = (): RegExp => {
    const parts: string[] = [];
    parts.push('^(\\{');
    parts.push('"ident":(\\d*),');
    parts.push('"seqnr":(\\d*),');
    parts.push('"name":"([A-Za-z0-9.,;&!?#%{}()=\\-…+\'\\´\\"\\’äöüÖÄÜß_èéáàíâåñïóùúÚ²–[\\]\\s]*)",');
    parts.push('"cdident":(\\d*),');
    parts.push('"time_s":"([\\d:]*)",');
    parts.push('"size_s":"([\\dMB\\s]*)",');
    parts.push('"bitrate_s":"([\\dBit/s\\s]*)",');
    parts.push('"time_i":([\\d]*),');
    parts.push('"size_i":([\\d]*),');
    parts.push('"bitrate_i":([\\d]*),');
    parts.push('"songtitle":"([A-Za-z0-9.,;&!?#%{}()=\\-…+\'\\´\\"\\’äöüÖÄÜß_èéáàíâåñïóùúÚ²–[\\]\\s]*)",');
    parts.push('"artistname":"([A-Za-z0-9.,;&!?#%{}()=\\-…+\'\\´\\"\\’äöüÖÄÜß_èéáàíâåñïóùúÚ²–[\\]\\s]*)",');
    parts.push('"hits":([\\d]*)');
    parts.push('(.*))$');
    const expression = parts.reduce(function(acc, cur){return acc.concat(cur)}, '');
    const regexp: RegExp = new RegExp(expression);

    return regexp;
};
