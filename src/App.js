import React from 'react';
import './style.css';
import { useEffect, useState, useRef } from 'react';

export default function App() {
  const { ref, active, toggle, event } = useClickAway();

  useEffect(() => {
    if (event) console.log(event);
  }, [active]);

  return (
    <div>
      <h1>Hola Devs!</h1>
      <div className="container" ref={ref}>
        <div className="button" onClick={toggle} style={{ cursor: 'pointer' }}>
          Get Event - Click Away
        </div>
        {active && <div className="contents">Clicked</div>}
      </div>
    </div>
  );
}

export function useClickAway() {
  const [active, setActive] = useState(false);
  const [event, setEvent] = useState(null);
  const ref = useRef(null);

  function toggle() {
    setActive(!active);
  }
  function handleClick(e) {
    if (!ref.current.contains(e.target)) setActive(false);
    setEvent(e);
  }

  useEffect(() => {
    if (active) document.addEventListener('mousedown', handleClick);
    else document.removeEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [active]);
  return { ref, active, setActive, toggle, event };
}
