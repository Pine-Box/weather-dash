//returns formatted date string from unix_timestamp
export function getDateFromUnix(unix_timestamp){
    return dayjs(unix_timestamp *1000).format('DD MMMM [,] YYYY');
}

//returns formatted hour string from unix_timestamp. 00 means its the start of a new day
export function getHourFromUnix(unix_timestamp){
   return dayjs(unix_timestamp *1000).format('HH');
}

//returns the current day and date
export function getCurrentDay() {
    return dayjs().format('dddd DD MMMM [,] YYYY');
}

//returns the day (monday, tuesday ..) for a given timestamp
export function getDayFromUnix(unix_timestamp){
    return dayjs(unix_timestamp *1000).format('dddd');
}
