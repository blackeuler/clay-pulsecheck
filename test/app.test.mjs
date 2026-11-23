import test from 'node:test'
import assert from 'node:assert/strict'
import { APP_VERSION, INITIAL_SHIPS, INITIAL_FEEDBACK, addShip, toggleStatus, upvoteShip, addFeedback } from '../src/store.js'

test('v1.1.0 store supports upvoting and Mom-Test feedback collection', () => {
  assert.equal(APP_VERSION, '1.1.0')
  const next = addShip(INITIAL_SHIPS, 'Keyboard shortcut N')
  assert.equal(next.length, INITIAL_SHIPS.length + 1)
  const voted = upvoteShip(next, next[0].id)
  assert.equal(voted.find(i => i.id === next[0].id).votes, 2)
  const fb = addFeedback(INITIAL_FEEDBACK, 'Persist state across refreshes')
  assert.equal(fb.length, INITIAL_FEEDBACK.length + 1)
  const toggled = toggleStatus(voted, next[0].id)
  assert.equal(toggled.find(i => i.id === next[0].id).status, 'shipped')
})
