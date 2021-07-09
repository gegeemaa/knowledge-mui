// 2 date-iin zoruug day, hour, minutes, second-eer ilerhiileh function
export const daysBetween = function (delay_time_ms) {
  var text = ''
  //take out milliseconds
  delay_time_ms = delay_time_ms / 1000
  var seconds = Math.floor(delay_time_ms % 60)
  delay_time_ms = delay_time_ms / 60
  var minutes = Math.floor(delay_time_ms % 60)
  delay_time_ms = delay_time_ms / 60
  var hours = Math.floor(delay_time_ms % 24)
  var days = Math.floor(delay_time_ms / 24)
  if (days === 0) {
    if (hours === 0) {
      if (minutes === 0) {
        text = seconds + ' seconds'
      } else {
        text = minutes + ' minutes'
      }
    } else {
      text = hours + ' hours '
    }
  } else {
    text = days + ' days '
  }
  return text
}
