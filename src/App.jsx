import React, { useEffect, useRef, useState } from 'react'
import { APP_VERSION, RELEASE_LOG, INITIAL_SHIPS, INITIAL_FEEDBACK, addShip, toggleStatus, upvoteShip, addFeedback } from './store.js'

function loadSaved(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [ships, setShips] = useState(() => loadSaved('pulsecheck.ships.v12', INITIAL_SHIPS))
  const [feedback, setFeedback] = useState(() => loadSaved('pulsecheck.fb.v12', INITIAL_FEEDBACK))
  const [draft, setDraft] = useState('')
  const [fbDraft, setFbDraft] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    try { window.localStorage.setItem('pulsecheck.ships.v12', JSON.stringify(ships)) } catch {}
  }, [ships])

  useEffect(() => {
    try { window.localStorage.setItem('pulsecheck.fb.v12', JSON.stringify(feedback)) } catch {}
  }, [feedback])

  useEffect(() => {
    function onKey(e) {
      if (e.key.toLowerCase() === 'n' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const shippedCount = ships.filter(s => s.status === 'shipped').length
  const totalVotes = ships.reduce((sum, s) => sum + (s.votes || 0), 0)

  return (
    <div style={{ maxWidth: 820, margin: '40px auto', padding: '0 20px 64px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#34d399', fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#34d399', display: 'inline-block' }} />
            CorpFreq Stage 1 Clay Test · Live v{APP_VERSION}
          </div>
          <h1 style={{ margin: '8px 0 4px', fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em' }}>PulseCheck</h1>
          <p style={{ margin: 0, color: '#9ca3af', fontSize: 14 }}>
            Built, deployed, monitored, and iterated autonomously. Press <kbd style={{ background: '#1f2430', padding: '2px 6px', borderRadius: 5, fontSize: 12 }}>N</kbd> to add a milestone.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ background: '#12141c', border: '1px solid #222633', borderRadius: 12, padding: '10px 16px', textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{shippedCount}/{ships.length}</div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>shipped</div>
          </div>
          <div style={{ background: '#12141c', border: '1px solid #222633', borderRadius: 12, padding: '10px 16px', textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#34d399' }}>{totalVotes}</div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>user votes</div>
          </div>
        </div>
      </header>

      <form
        onSubmit={e => { e.preventDefault(); if (!draft.trim()) return; setShips(p => addShip(p, draft)); setDraft('') }}
        style={{ display: 'flex', gap: 10, marginBottom: 20 }}
      >
        <input
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="Add a milestone to ship next (press N)..."
          style={{ flex: 1, background: '#12141c', border: '1px solid #2a2f3d', borderRadius: 10, padding: '12px 14px', color: '#f9fafb', fontSize: 14 }}
        />
        <button type="submit" style={{ background: '#34d399', color: '#052e16', border: 'none', borderRadius: 10, padding: '0 18px', fontWeight: 700, cursor: 'pointer' }}>
          Add Ship
        </button>
      </form>

      <div style={{ display: 'grid', gap: 10, marginBottom: 32 }}>
        {ships.map(item => (
          <div
            key={item.id}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, background: '#12141c', border: '1px solid #222633', borderRadius: 12, padding: '12px 14px' }}
          >
            <div onClick={() => setShips(p => toggleStatus(p, item.id))} style={{ flex: 1, cursor: 'pointer' }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: item.status === 'shipped' ? '#9ca3af' : '#f9fafb', textDecoration: item.status === 'shipped' ? 'line-through' : 'none' }}>
                {item.title}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShips(p => upvoteShip(p, item.id))}
              style={{ background: '#1a1f2c', border: '1px solid #2e3547', color: '#e5e7eb', borderRadius: 8, padding: '5px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            >
              ▲ {item.votes || 0}
            </button>
            <span
              onClick={() => setShips(p => toggleStatus(p, item.id))}
              style={{
                fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, cursor: 'pointer',
                background: item.status === 'shipped' ? 'rgba(52,211,153,0.14)' : 'rgba(251,191,36,0.14)',
                color: item.status === 'shipped' ? '#34d399' : '#fbbf24'
              }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        <div style={{ background: '#12141c', border: '1px solid #222633', borderRadius: 14, padding: 18 }}>
          <h2 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700 }}>Mom-Test Feedback Loop</h2>
          <form
            onSubmit={e => { e.preventDefault(); if (!fbDraft.trim()) return; setFeedback(p => addFeedback(p, fbDraft)); setFbDraft('') }}
            style={{ display: 'flex', gap: 8, marginBottom: 12 }}
          >
            <input
              value={fbDraft}
              onChange={e => setFbDraft(e.target.value)}
              placeholder="What tripped you up? (1 line)"
              style={{ flex: 1, background: '#0c0e14', border: '1px solid #2a2f3d', borderRadius: 8, padding: '8px 10px', color: '#f9fafb', fontSize: 13 }}
            />
            <button type="submit" style={{ background: '#38bdf8', color: '#082f49', border: 'none', borderRadius: 8, padding: '0 12px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
              Send
            </button>
          </form>
          <div style={{ display: 'grid', gap: 8 }}>
            {feedback.map(f => (
              <div key={f.id} style={{ background: '#0c0e14', borderRadius: 8, padding: '8px 10px', fontSize: 12 }}>
                <div style={{ color: '#e5e7eb', marginBottom: 3 }}>“{f.text}”</div>
                <div style={{ color: '#34d399', fontSize: 11 }}>{f.author} · {f.status}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#12141c', border: '1px solid #222633', borderRadius: 14, padding: 18 }}>
          <h2 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700 }}>Live Release Telemetry</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {RELEASE_LOG.map(r => (
              <div key={r.version} style={{ background: '#0c0e14', borderRadius: 8, padding: '8px 10px', fontSize: 12 }}>
                <span style={{ color: '#34d399', fontWeight: 700, marginRight: 8 }}>{r.version}</span>
                <span style={{ color: '#d1d5db' }}>{r.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
