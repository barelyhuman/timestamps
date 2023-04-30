const norm = num => Number(num.toFixed(0))

const padTimeLeft = s => String.prototype.padStart.apply(String(s), [2, '0'])

/**
 * @param {number} seconds
 */
export function fromSeconds(seconds) {
  const hours = seconds / 3600
  const hourRems = seconds % 3600
  return {
    hours: norm(hours),
    minutes: norm(hourRems / 60),
    seconds: norm(hourRems % 60),
  }
}

/**
 * @param {number} mills
 */
export function fromMilliseconds(mills) {
  const inSeconds = mills / 1000
  return fromSeconds(inSeconds)
}

/**
 * @param {number} inSeconds
 * @param {string} pattern
 */
function formatSeconds(inSeconds, pattern) {
  const { hours, minutes, seconds } = fromSeconds(inSeconds)
  return (pattern || '{hh}h {mm}m {ss}s')
    .replace('{h}', hours)
    .replace('{hh}', padTimeLeft(hours))
    .replace('{m}', minutes)
    .replace('{mm}', padTimeLeft(minutes))
    .replace('{s}', seconds)
    .replace('{ss}', padTimeLeft(seconds))
}

/**
 * @param {number} mills
 * @param {string} pattern
 */
export function formatMilliseconds(mills, pattern) {
  const inSeconds = mills / 1000
  return formatSeconds(inSeconds, pattern)
}
