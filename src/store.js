export const APP_VERSION = '1.1.0'

export const INITIAL_SHIPS = [
  { id: 'ship-1', title: 'Live React deploy pipeline', status: 'shipped', votes: 14 },
  { id: 'ship-2', title: 'Automated health telemetry', status: 'shipped', votes: 9 },
  { id: 'ship-3', title: 'Mom-Test feedback collector + upvoting', status: 'shipped', votes: 18 },
  { id: 'ship-4', title: 'Shareable state URL + release timeline', status: 'building', votes: 11 }
]

export const INITIAL_FEEDBACK = [
  { id: 'fb-1', author: 'Early User #1', text: 'Let visitors upvote what ships next instead of just reading a static list.', status: 'shipped_in_v1.1' }
]

export function addShip(list, title) {
  const clean = String(title || '').trim()
  if (!clean) return list
  return [{ id: `ship-${Date.now()}`, title: clean, status: 'building', votes: 1 }, ...list]
}

export function toggleStatus(list, id) {
  return list.map(item =>
    item.id === id ? { ...item, status: item.status === 'shipped' ? 'building' : 'shipped' } : item
  )
}

export function upvoteShip(list, id) {
  return list
    .map(item => (item.id === id ? { ...item, votes: (item.votes || 0) + 1 } : item))
    .sort((a, b) => (b.votes || 0) - (a.votes || 0))
}

export function addFeedback(list, text) {
  const clean = String(text || '').trim()
  if (!clean) return list
  return [{ id: `fb-${Date.now()}`, author: 'Visitor', text: clean, status: 'queued' }, ...list]
}
