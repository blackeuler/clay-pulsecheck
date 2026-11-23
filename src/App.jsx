import React, { useState } from 'react'
import { APP_VERSION, INITIAL_SHIPS, addShip, toggleStatus } from './store.js'

export default function App() {
  const [ships, setShips] = useState(INITIAL_SHIPS)
  const [draft, setDraft] = useState('')
  const shippedCount = ships.filter(s => s.status === 'shipped').length

  function onSubmit(e) {
    e.preventDefault()
    if (!draft.trim()) return
    setShips(prev => addShip(prev, draft))
    setDraft('')
  }

  return (
    <div style={{ maxWidth: 720, margin: '48px auto', padding: '0 20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#34d399', fontWeight: 600 }}>
            CorpFreq Clay Test · v{APP_VERSION}
          </div>
          <h1 style={{ margin: '6px 0 4px', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>PulseCheck</h1>
          <p style={{ margin: 0, color: '#9ca3af', fontSize: 14 }}>Real repo → real React build → live deploy → user feedback loop.</p>
        </div>
        <div style={{ textAlign: 'right', background: '#12141c', border: '1px solid #222633', borderRadius: 12, padding: '10px 16px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#f9fafb' }}>{shippedCount}/{ships.length}</div>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>shipped</div>
        </div>
      </header>

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="Add a concrete milestone to ship..."
          style={{ flex: 1, background: '#12141c', border: '1px solid #2a2f3d', borderRadius: 10, padding: '12px 14px', color: '#f9fafb', fontSize: 14 }}
        />
        <button
          type="submit"
          style={{ background: '#34d399', color: '#052e16', border: 'none', borderRadius: 10, padding: '0 18px', fontWeight: 700, cursor: 'pointer' }}
        >
          Add
        </button>
      </form>

      <div style={{ display: 'grid', gap: 10 }}>
        {ships.map(item => (
          <div
            key={item.id}
            onClick={() => setShips(prev => toggleStatus(prev, item.id))}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#12141c',
              border: '1px solid #222633',
              borderRadius: 12,
              padding: '14px 16px',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 500, textDecoration: item.status === 'shipped' ? 'line-through' : 'none', color: item.status === 'shipped' ? '#6b7280' : '#f3f4f6' }}>
              {item.title}
            </span>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 999,
              background: item.status === 'shipped' ? 'rgba(52,211,153,0.14)' : 'rgba(251,191,36,0.14)',
              color: item.status === 'shipped' ? '#34d399' : '#fbbf24'
            }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
