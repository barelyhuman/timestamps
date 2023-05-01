const norm = num => Number(num.toFixed(0))

const padTimeLeft = s => String.prototype.padStart.apply(String(s), [2, '0'])

/**
 * @param {number} seconds
 * @example
 * fromSeconds(3600) // {hours:1, minutes:0, seconds:0}
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
 * @example
 * fromMilliseconds(3600 * 1000) // {hours:1, minutes:0, seconds:0}
 */
export function fromMilliseconds(mills) {
  const inSeconds = mills / 1000
  return fromSeconds(inSeconds)
}

/**
 * @param {number} inSeconds
 * @param {string} pattern pattern to format into,
 * the following are the replacements
 * {hh} => long hours
 * {mm} => long minutes
 * {ss} => long seconds
 * {h} => short hours
 * {m} => short minutes
 * {s} => short seconds
 * @example
 * formatSeconds(3600, '{hh}:{mm}:{ss}') // 01:00:00
 */
export function formatSeconds(inSeconds, pattern) {
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
 * @param {string} pattern pattern to format into,
 * the following are the replacements
 * {hh} => long hours
 * {mm} => long minutes
 * {ss} => long seconds
 * {h} => short hours
 * {m} => short minutes
 * {s} => short seconds
 *
 * @example
 * formatMilliseconds(3600 * 1000, '{hh}:{mm}:{ss}') // 01:00:00
 */
export function formatMilliseconds(mills, pattern) {
  const inSeconds = mills / 1000
  return formatSeconds(inSeconds, pattern)
}

/**
 * @param {number} mills
 * @param {string} pattern pattern to parse based on
 * * the following are the replacements
 * {hh} => long hours
 * {mm} => long minutes
 * {ss} => long seconds
 * {h} => short hours
 * {m} => short minutes
 * {s} => short seconds
 *
 * @example
 * parse('01:00:00', '{hh}:{mm}:{ss}') // {hours:1, minutes:0, seconds:0}
 */
export function parse(timestamp, pattern = '{hh}h {mm}m {ss}s') {
  const output = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  const patternSequence = []

  const regex = pattern

    // Sanitize Pattern
    .replace('(', '\\(')
    .replace(')', '\\)')
    .replace('[', '\\[')
    .replace(']', '\\]')
    .replace('|', '\\|')

    // Construct Regex and find match positions
    .replace('{hh}', (_, offset) => {
      patternSequence[offset] = 'hours_long'
      return '(\\d{2})'
    })
    .replace('{h}', (_, offset) => {
      patternSequence[offset] = 'hours_short'
      return '(\\d{1})'
    })
    .replace('{mm}', (_, offset) => {
      patternSequence[offset] = 'mins_long'
      return '(\\d{2})'
    })
    .replace('{m}', (_, offset) => {
      patternSequence[offset] = 'mins_short'
      return '(\\d{1})'
    })
    .replace('{ss}', (_, offset) => {
      patternSequence[offset] = 'seconds_long'
      return '(\\d{2})'
    })
    .replace('{s}', (_, offset) => {
      patternSequence[offset] = 'seconds_short'
      return '(\\d{1})'
    })

  const santizedPtrSeq = patternSequence.filter(x => x)

  const matchedValues = timestamp.match(new RegExp(regex))

  if (!matchedValues) {
    return output
  }

  matchedValues.slice(1).forEach((match, index) => {
    if (santizedPtrSeq[index].startsWith('hours')) {
      output.hours = norm(Number(match))
    }
    if (santizedPtrSeq[index].startsWith('mins')) {
      output.minutes = norm(Number(match))
    }
    if (santizedPtrSeq[index].startsWith('seconds')) {
      output.seconds = norm(Number(match))
    }
  })

  return output
}
