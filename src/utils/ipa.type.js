import IPA from 'ipa.js';
import { date2Str } from './tools';

export const DateString = new IPA((cp) => ({
    check: (v) => {
        if (typeof v !== 'string') return;
        const n = +new Date(v);
        return Boolean(n);
    },
    guarantee(v) {
        return this.check(v) ? v : this.mock();
    },
    mock: () => date2Str(null, { hasTime: true }),
}));