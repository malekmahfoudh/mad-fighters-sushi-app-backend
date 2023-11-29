
//converts a UTC time to local time
export const timeConversion = (time) => {
    return new Date(time).toLocaleString();
}