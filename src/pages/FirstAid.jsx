import PageHead from '../components/PageHead';
import SosBlock from '../components/SosBlock';
import { CrossIcon, WarningIcon } from '../components/icons';
import { FIRST_AID } from '../data/content';

export default function FirstAid() {
  return (
    <>
      <PageHead
        badge="Первая помощь"
        badgeAlert
        title="Первая помощь: что делать до приезда медиков"
        text="Короткие пошаговые памятки для критических ситуаций. Первое действие в них всегда одинаковое — звонить на 112 или 103, это бесплатно и правильно."
      />

      <section className="section" aria-labelledby="guides-title">
        <div className="container">
          <h2 id="guides-title" style={{ marginBottom: 24 }}>
            Памятки первой помощи
          </h2>
          {FIRST_AID.map((guide) => (
            <article className="guide" key={guide.id} aria-labelledby={`guide-${guide.id}`}>
              <h3
                id={`guide-${guide.id}`}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'var(--c-alert)',
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    flex: 'none',
                  }}
                >
                  <CrossIcon width="22" height="22" />
                </span>
                {guide.title}
              </h3>

              <p
                style={{
                  color: '#991b1b',
                  background: '#FEF2F2',
                  borderLeft: '4px solid var(--c-alert)',
                  borderRadius: '0 var(--radius-input) var(--radius-input) 0',
                  padding: '12px 16px',
                  maxWidth: '70ch',
                }}
              >
                {guide.warning}
              </p>

              <ol>
                {guide.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              <p className="dont">
                <strong style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <WarningIcon width="18" height="18" style={{ color: 'var(--c-warn)' }} />
                  Чего делать нельзя:
                </strong>
                <span
                  style={{
                    display: 'block',
                    color: 'var(--c-text-2)',
                    marginTop: 6,
                  }}
                >
                  {guide.donts.join(' ')}
                </span>
              </p>
            </article>
          ))}

          <p style={{ color: 'var(--c-text-2)' }}>
            Полноценные навыки формирует очное обучение первой помощи. Наши памятки —
            только до приезда медиков, в помощь тем, кто растерялся и не знает, с чего начать.
          </p>
          <SosBlock />
        </div>
      </section>
    </>
  );
}
