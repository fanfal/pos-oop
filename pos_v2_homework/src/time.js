//this function is an oop that using to print the time of computer system
function Time()
{
  var time = new Date();
  dateDigitToString = function(num){
    return num < 10 ? '0' + num : num;
  }
  this.year = dateDigitToString(time.getFullYear());
  this.month = dateDigitToString(time.getMonth()+1);
  this.date = dateDigitToString(time.getDate());
  this.hour = dateDigitToString(time.getHours());
  this.minute = dateDigitToString(time.getMinutes());
  this.second = dateDigitToString(time.getSeconds());
  this.string = '打印时间：'+ this.year + '年' + this.month + '月' + this.date + '日 ' + this.hour +
  ':' + this.minute + ':' + this.second;
}
