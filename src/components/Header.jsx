import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, CloseIcon } from './icons';

const LINKS = [
  { to: '/', label: 'Главная', end: true },
  { to: '/psych', label: 'Психподдержка' },
  { to: '/first-aid', label: 'Первая помощь' },
  { to: '/donor', label: 'Донорство' },
  { to: '/faq', label: 'FAQ' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const onNavClick = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="logo" onClick={onNavClick}>
          <svg viewBox="0 0 64 64" width="32" height="32" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="#0E7490" />
            <path d="M32 45s-12-7.4-12-15.5a7 7 0 0 1 12-4.9 7 7 0 0 1 12 4.9C44 37.6 32 45 32 45z" fill="#FFFFFF" />
          </svg>
          <span>Ты не один</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          title="Меню"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span aria-hidden="true">Меню</span>
        </button>

        <nav
          id="site-nav"
          className={`site-nav${open ? ' is-open' : ''}`}
          aria-label="Основная навигация"
        >
          <ul>
            {LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} onClick={onNavClick}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/psych" className="btn btn-primary header-cta">
          Получить поддержку
        </Link>
      </div>
    </header>
  );
}
