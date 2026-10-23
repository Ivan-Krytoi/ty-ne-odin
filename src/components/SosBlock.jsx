import { Link } from 'react-router-dom';
import { PhoneIcon } from './icons';

export default function SosBlock() {
  return (
    <aside className="container" role="region" aria-label="Срочная помощь">
      <div className="sos">
        <p className="sos__text">
          Нужна срочная помощь?
          <small>Скор, полиция, МЧС — единый номер, бесплатно и круглосуточно.</small>
        </p>
        <a href="tel:112" className="sos__phone">
          <PhoneIcon width="20" height="20" />
          112
        </a>
        <Link to="/first-aid" className="sos__link">
          Памятки первой помощи →
        </Link>
      </div>
    </aside>
  );
}
