
export function GetCurrentDateTime() {
    let dateObj: Date;
    dateObj = new Date();

    let year: string;
    let month: string;
    let day: string;

    let hour: string;
    let minutes: string;
    let seconds: string;

    year = dateObj.getFullYear().toString();
    month = (dateObj.getMonth() + 1).toString();
    day = dateObj.getDate().toString();

    hour = dateObj.getHours().toString();
    minutes = dateObj.getMinutes().toString();
    seconds = dateObj.getSeconds().toString();

    return FixSingleDigits(year) + '-' + FixSingleDigits(month)
    + '-' + FixSingleDigits(day) + ' ' + FixSingleDigits(hour)
    + ':' + FixSingleDigits(minutes) + ':' + FixSingleDigits(seconds);
}

export function FixSingleDigits(item: string) {
    if (item.length < 2) {
        item = '0' + item;
    }
    return item;
}