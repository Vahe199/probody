import {DateTime} from "luxon";

export default class Dates {
    static humanizeDuration(weekDays, locale) {
        return DateTime.fromFormat(weekDays[0], 'EEE', {locale: 'en'}).toFormat('ccc', {locale}) + "-" + DateTime.fromFormat(weekDays[weekDays.length - 1], 'EEE', {locale: 'en'}).toFormat('ccc', {locale});
    }
}
