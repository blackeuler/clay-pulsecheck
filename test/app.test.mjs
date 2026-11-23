import test from 'node:test'
import assert from 'node:assert/strict'
import { APP_VERSION, RELEASE_LOG, INITIAL_SHIPS, INITIAL_FEEDBACK, addShip, toggleStatus, upvoteShip, addFeedback } from '../src/store.js'

test('v1.2.0 store, feedback loop, and release log pass', () => {
  assert.equal(APP_VERSION, '1.2.0')
  assert.equal(RELEASE_LOG.length, 3)
  const next = addShip(INITIAL_SHIPS, 'Live telemetry check')
  assert.equal(next.length, INITIAL_SHIPS.length + 1)
  const voted = upvoteShip(next, next[0].id)
  assert.equal(voted.find(i => i.id === next[0].id).votes, 2)
  const fb = addFeedback(INITIAL_FEEDBACK, 'Works great on mobile')
  assert.equal(fb.length, INITIAL_FEEDBACK.length + 1)
  const toggled = toggleStatus(voted, next[0].id)
  assert.equal(toggled.find(i => i.id === next[0].id).status, 'shipped')
})
