import test from 'node:test'
import assert from 'node:assert/strict'
import { APP_VERSION, INITIAL_SHIPS, addShip, toggleStatus } from '../src/store.js'

test('v1.0.0 store adds and toggles ships cleanly', () => {
  assert.equal(APP_VERSION, '1.0.0')
  const next = addShip(INITIAL_SHIPS, 'Deploy v1 to GitHub Pages')
  assert.equal(next.length, INITIAL_SHIPS.length + 1)
  const toggled = toggleStatus(next, next[0].id)
  assert.equal(toggled[0].status, 'shipped')
})
