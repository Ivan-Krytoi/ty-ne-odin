import { Link } from 'react-router-dom';

export default function SectionCard({ to, accent, icon, title, text, action = 'Подробнее' }) {
  return (
    <Link to={to} className="card" style={{ '--card-accent': accent, textDecoration: 'none' }}>
      <div className="card__head">
        <span className="card__icon">{icon}</span>
        <h2 className="card__title">{title}</h2>
      </div>
      <p className="card__text">{text}</p>
      <span className="btn btn-secondary">{action} →</span>
    </Link>
  );
}
