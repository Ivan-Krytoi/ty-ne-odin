export default function PageHead({ badge, badgeAlert = false, title, text }) {
  return (
    <div className="page-head">
      <div className="container">
        {badge && (
          <span className={`page-head__badge${badgeAlert ? ' page-head__badge--alert' : ''}`}>{badge}</span>
        )}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </div>
  );
}
