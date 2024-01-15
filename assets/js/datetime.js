export function getDateFromUnix(unix_timestamp){
    return dayjs(unix_timestamp *1000).format('DD MMMM [,] YYYY');
}

//formats the current day
export function getCurrentDay() {
    return dayjs().format('dddd DD MMMM [,] YYYY');
}

export function getDayFromUnix(unix_timestamp){
    return dayjs(unix_timestamp *1000).format('dddd');
}