import { useState, useEffect } from 'react';

export default function ResetAgentUI() { const [startTime, setStartTime] = useState(null); const [hoursFasted, setHoursFasted] = useState(0); const [slipLogged, setSlipLogged] = useState(false); const [note, setNote] = useState('');

useEffect(() => { if (startTime) { const interval = setInterval(() => { const now = new Date(); const diff = (now - new Date(startTime)) / 36e5; // ms to hours setHoursFasted(diff.toFixed(2)); }, 60000); return () => clearInterval(interval); } }, [startTime]);

const handleStartFast = () => { setStartTime(new Date().toISOString()); setSlipLogged(false); };

const handleSlip = () => { setSlipLogged(true); setStartTime(null); setHoursFasted(0); };

const milestoneText = () => { const hours = parseFloat(hoursFasted); if (hours < 12) return 'Glycogen is being used.'; if (hours < 24) return 'Transitioning into fat burn.'; if (hours < 48) return 'In ketosis. Growth hormone rising.'; if (hours < 72) return 'Deep fat burn and cellular cleanup.'; return 'Autophagy in full effect. Mental clarity likely peaking.'; };

return ( <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', maxWidth: '600px', margin: 'auto' }}> <h1>Reset Agent UI</h1>

<section style={{ marginBottom: '1.5rem' }}>
    <button onClick={handleStartFast} style={{ marginRight: '1rem' }}>Start New Fast</button>
    <button onClick={handleSlip}>I Broke My Fast</button>
    <p>{startTime ? `Started: ${new Date(startTime).toLocaleString()}` : 'Fast not started'}</p>
    <p>{slipLogged ? 'Slip logged. Resetting...' : `Hours fasted: ${hoursFasted}`}</p>
    <p><strong>{milestoneText()}</strong></p>
  </section>

  <section style={{ marginBottom: '1.5rem' }}>
    <h3>Agent Notes</h3>
    <textarea
      value={note}
      onChange={(e) => setNote(e.target.value)}
      rows="4"
      style={{ width: '100%' }}
      placeholder="Reflections, cravings, insights..."
    />
    <br />
    <button onClick={() => alert('Note saved! (future feature)')}>Save Note</button>
  </section>

  <section>
    <h3>Sample Garmin Sync</h3>
    <ul>
      <li>Steps: 1,410</li>
      <li>Sleep Score: 45 (Poor)</li>
      <li>HRV: 24 ms - Balanced</li>
      <li>Body Battery: Charged +21 / Drained -22</li>
      <li>Stress: 57</li>
    </ul>
  </section>

  <section style={{ marginTop: '2rem', background: '#f0f0f0', padding: '1rem' }}>
    <h3>Daily Agent Message</h3>
    <p>
      {hoursFasted < 12 ?
        'Let’s get through the glycogen phase. Hydrate and keep moving.' :
        'You’re shifting into fat burn mode. Consider a Zone 2 walk today.'}
    </p>
  </section>
</div>

); }

