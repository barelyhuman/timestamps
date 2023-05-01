import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { parse } from '../src/index.mjs'

test('no pattern', () => {
  const { hours, minutes, seconds } = parse('01h 24m 21s')
  assert.equal(hours, 1)
  assert.equal(minutes, 24)
  assert.equal(seconds, 21)
})

test('parse {hh}h:{mm}m', () => {
  const { hours, minutes, seconds } = parse('01h:02m', '{hh}h:{mm}m')

  assert.equal(hours, 1)
  assert.equal(minutes, 2)
  assert.equal(seconds, 0)
})

test('parse {h}h{m}m', () => {
  const { hours, minutes, seconds } = parse('1h2m', '{h}h{m}m')
  assert.equal(hours, 1)
  assert.equal(minutes, 2)
  assert.equal(seconds, 0)
})

test('parse {s}s|{ss}s', () => {
  const { hours, minutes, seconds } = parse('2s|02s', '{s}s|{ss}s')
  assert.equal(hours, 0)
  assert.equal(minutes, 0)
  assert.equal(seconds, 2)
})

test('parse {hh}:{mm}:{ss}', () => {
  const { hours, minutes, seconds } = parse('01:02:03', '{hh}:{mm}:{ss}')
  assert.equal(hours, 1)
  assert.equal(minutes, 2)
  assert.equal(seconds, 3)
})

test.run()
