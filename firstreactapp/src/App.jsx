import { useState, useRef } from 'react';
import Trendsection from './Trendsection';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('publishedAt');
  const [lang, setLang] = useState('en');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const waveRef = useRef(null);

  const triggerModeChange = (e) => {
    const wave = waveRef.current;
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    wave.classList.add('animate');

    setTimeout(() => {
      setDarkMode((prev) => !prev);
    }, 200);

    wave.addEventListener('animationend', () => {
      wave.classList.remove('animate');
    }, { once: true });
  };

  return (
    <div className={`app-layout ${darkMode ? 'dark' : ''}`}>
      <div className="mode-wave" ref={waveRef}></div>

      {/* Sidebar - controlled by state */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>
        <h2>Filters</h2>

        <label>Sort By</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="publishedAt">Published At</option>
          <option value="relevance">Relevance</option>
          <option value="popularity">Popularity</option>
        </select>

        <label>Language</label>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
        </select>

        <label>From Date</label>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />

        <label>To Date</label>
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>

      {/* Main Content */}
      <div className="main-section">
        <header className="navbar">
          <div className="navbar-left">
            <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <h1 className="logo">TrendPulse</h1>
            <p className="logoP">- feel the pulse of current events</p>
          </div>

          <input
            type="text"
            className="search-input"
            placeholder="Search news"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="dark-toggle-switch" onClick={triggerModeChange}>
            <div className={`slider ${darkMode ? 'dark' : ''}`}>
              <span className="icon">{darkMode ? '🌙' : '☀️'}</span>
            </div>
          </div>
        </header>

        <Trendsection
          search={search.trim() || 'india'}
          sortBy={sortBy}
          lang={lang}
          from={from}
          to={to}
        />
      </div>
    </div>
  );
}

export default App;
