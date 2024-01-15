function getDateFromUnix(unix_timestamp){
    let date = new Date(unix_timestamp);
    return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
}