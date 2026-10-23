import { Link } from 'react-router-dom';
import { HOTLINES } from '../data/content';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <nav aria-label="Разделы сайта">
            <h3>Разделы сайта</h3>
            <ul>
              <li><Link to="/psych">Психологическая поддержка</Link></li>
              <li><Link to="/first-aid">Первая помощь</Link></li>
              <li><Link to="/donor">Донорство</Link></li>
              <li><Link to="/faq">Вопросы и ответы</Link></li>
            </ul>
          </nav>

          <section aria-label="Экстренные телефоны">
            <h3>Экстренные телефоны</h3>
            <ul>
              {HOTLINES.map((h) => (
                <li key={h.phone}>
                  <a href={`tel:${h.phone.replace(/[^+\d]/g, '')}`}>{h.phone}</a>
                  <br />
                  <span style={{ fontSize: '0.875rem', color: 'var(--c-text-2)' }}>{h.name}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="О проекте">
            <h3>О проекте</h3>
            <p style={{ color: 'var(--c-text-2)', fontSize: '0.9375rem' }}>
              «Ты не один» — проект команды номинации «Медицинские и социальные проекты»
              конкурса «Добрые Сайты 2026» (организатор — ВО «ДоброБит»).
            </p>
          </section>
        </div>

        <p className="disclaimer">
          Важно: сайт не заменяет приём врача или психолога и не ставит диагнозы.
          Памятки первой помощи — только до приезда медиков. В экстренных случаях звоните{' '}
          <a href="tel:112">112</a>. Материалы написаны простым языком, чтобы их мог
          прочитать любой пользователь, включая людей с ограниченными возможностями здоровья.
        </p>
      </div>
    </footer>
  );
}
