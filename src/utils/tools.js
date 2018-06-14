export const __ = (_v) => {
    const v = +_v;
    return v < 10 ? `0${v}` : v.toString();
};

export const date2Str = (d, options = {}) => {
    const { hasDate = true, hasTime = false } = options;
    const date = d && d.getDate ? d : new Date();
    const YYYY = date.getFullYear();
    const MM = __(date.getMonth() + 1);
    const DD = __(date.getDate());
    const HH = __(date.getHours());
    const mm = __(date.getMinutes());
    let str = '';
    if (hasDate) {
        str += `${YYYY}-${MM}-${DD}`;
    }
    if (hasTime) {
        str += ` ${HH}:${mm}`;
    }
    return str;
};