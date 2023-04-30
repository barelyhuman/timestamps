import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { fromMilliseconds } from '../src/index.mjs'

test('1 hour', () => {
  const { hours, minutes, seconds } = fromMilliseconds(3600 * 1000)
  assert.equal(hours, 1)
  assert.equal(minutes, 0)
  assert.equal(seconds, 0)
})

test('1 min', () => {
  const { hours, minutes, seconds } = fromMilliseconds(60 * 1000)
  assert.equal(hours, 0)
  assert.equal(minutes, 1)
  assert.equal(seconds, 0)
})

test('1 second', () => {
  const { hours, minutes, seconds } = fromMilliseconds(1000)
  assert.equal(hours, 0)
  assert.equal(minutes, 0)
  assert.equal(seconds, 1)
})

test('1 hour 1 second', () => {
  const { hours, minutes, seconds } = fromMilliseconds((3600 + 1) * 1000)

  assert.equal(hours, 1)
  assert.equal(minutes, 0)
  assert.equal(seconds, 1)
})

test('1 hour 2 minutes 1 second', () => {
  const { hours, minutes, seconds } = fromMilliseconds(3721 * 1000)

  assert.equal(hours, 1)
  assert.equal(minutes, 2)
  assert.equal(seconds, 1)
})

test('24 hours 1 minute 0 second', () => {
  const _hour = 24 * 60 * 60 * 1000
  const _min = 60 * 1000
  const { hours, minutes, seconds } = fromMilliseconds(_hour + _min)
  assert.equal(hours, 24)
  assert.equal(minutes, 1)
  assert.equal(seconds, 0)
})

test.run()
