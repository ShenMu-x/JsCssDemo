/* 通用功能函数 */

function getDateString(date){
    return `${date.getFullYear()},${date.getMonth() + 1},${date.getDate()}`; 
}

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

today = getDateString(today);
tomorrow = getDateString(tomorrow);

export {
    today,
    tomorrow
}