export const APP_VERSION = '1.0.0'

export const INITIAL_SHIPS = [
  { id: 'ship-1', title: 'Live React deploy pipeline', status: 'shipped', impact: 'high' },
  { id: 'ship-2', title: 'Automated health telemetry', status: 'shipped', impact: 'high' },
  { id: 'ship-3', title: 'User feedback loop in #general', status: 'building', impact: 'high' }
]

export function addShip(list, title) {
  const clean = String(title || '').trim()
  if (!clean) return list
  return [{ id: `ship-${Date.now()}`, title: clean, status: 'building', impact: 'medium' }, ...list]
}

export function toggleStatus(list, id) {
  return list.map(item =>
    item.id === id ? { ...item, status: item.status === 'shipped' ? 'building' : 'shipped' } : item
  )
}
