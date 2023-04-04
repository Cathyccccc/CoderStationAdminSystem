/**
 * 格式化时间戳返回日期时间字符串
 * @param {String} timestamp 时间戳
 * @param {String} type 想要输出的时间类型
 */
export function formatDate(timestamp, type) {
  if (!timestamp) {
    return;
  }
  const date = new Date(parseInt(timestamp));
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let seconds = date.getSeconds();
  const weekArr = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];
  let weekDay = weekArr[date.getDay()];

  if (month > 0 && month <= 9) {
    month = '0' + month;
  }
  if (day > 0 && day <= 9) {
    day = '0' + day;
  }
  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour;
  }
  if (minute >= 0 && minute <= 9) {
    minute = '0' + minute;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds;
  }

  let str = '';
  switch (type) {
    case 'year':
      str = `${year}-${month}-${day}`;
      break;
    case 'time':
      str = `${hour}:${minute}:${seconds}`;
      break;
    case 'year-time':
      str = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
      break;
    case 'time-week':
      str = `${hour}:${minute}:${seconds} ${weekDay}`;
      break;
    default:
      str = `${year}-${month}-${day} ${hour}:${minute}:${seconds} ${weekDay}`;
  }
  return str;
}
