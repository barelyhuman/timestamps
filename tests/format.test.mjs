import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { formatMilliseconds } from '../src/index.mjs'

test('no pattern', () => {
  assert.equal(formatMilliseconds(3600 * 1000), '01h 00m 00s')
})

test('{hh}h:{mm}m', () => {
  assert.equal(formatMilliseconds(3600 * 1000, '{hh}h:{mm}m'), '01h:00m')
})

test('{h}h:{m}m', () => {
  assert.equal(formatMilliseconds(3600 * 1000, '{h}h:{m}m'), '1h:0m')
})

test(':{m}m', () => {
  assert.equal(formatMilliseconds(3600 * 1000, ':{m}m'), ':0m')
})

test('{s}s|{ss}s', () => {
  assert.equal(formatMilliseconds(3600 * 1000, '{s}s|{ss}s'), '0s|00s')
})

test.run()
