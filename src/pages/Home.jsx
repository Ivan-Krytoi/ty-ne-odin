import { Link } from 'react-router-dom';
import { SITE_GOALS, STEPS_HOW } from '../data/content';
import { HeartIcon, CrossIcon, DropIcon } from '../components/icons';
import SectionCard from '../components/SectionCard';

const SECTIONS = [
  {
    to: '/psych',
    accent: 'var(--c-accent)',
    icon: <HeartIcon width="24" height="24" />,
    title: 'Психологическая поддержка',
    text: 'Тревога, усталость и одиночество — это не слабость. Техники самопомощи, телефоны доверия и анонимная форма обращения.',
    action: 'Поддержка',
  },
  {
    to: '/first-aid',
    accent: 'var(--c-alert)',
    icon: <CrossIcon width="24" height="24" />,
    title: 'Первая помощь',
    text: 'Простые пошаговые памятки для критических ситуаций: что делать до приезда медиков — и чего делать нельзя.',
    action: 'Памятки',
  },
  {
    to: '/donor',
    accent: 'var(--c-coral)',
    icon: <DropIcon width="24" height="24" />,
    title: 'Донорство',
    text: 'Как подготовиться к донации крови, какие требования и мифы существуют — и как помочь, если сдавать кровь пока нельзя.',
    action: 'Стать донором',
  },
];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__inner">
          <div className="hero__text">
            <h1 id="hero-title">Ты не один</h1>
            <p>
              Психологическая поддержка, первая помощь и донорство — простыми словами
              и без стеснения. Сайт-помощник для тех, кому сейчас трудно, и для тех,
              кто хочет помочь другим.
            </p>

            <div className="hero__actions">
              <Link to="/psych" className="btn btn-primary">
                Получить помощь
              </Link>
              <Link to="/faq" className="btn btn-secondary">
                Как это работает
              </Link>
            </div>
          </div>

          <div className="hero__art" aria-hidden="true">
            <svg viewBox="0 0 320 260" width="320" height="260" role="img">
              <circle cx="160" cy="130" r="100" fill="#ECFEFF" />
              <circle cx="160" cy="130" r="74" fill="#FDE2DE" />
              <path
                d="M160 170s-42-26-42-53a23 23 0 0 1 42-13 23 23 0 0 1 42 13c0 27-42 53-42 53z"
                fill="none"
                stroke="#0E7490"
                strokeWidth="6"
                strokeLinejoin="round"
              />
              <circle cx="62" cy="70" r="10" fill="#0E7490" opacity="0.35" />
              <circle cx="258" cy="196" r="14" fill="#F97362" opacity="0.4" />
              <circle cx="264" cy="70" r="6" fill="#0E7490" opacity="0.3" />
            </svg>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="sections-title">
        <div className="container">
          <h2 id="sections-title">Три раздела — три способа помочь</h2>
          <div className="grid-cards" style={{ marginTop: 32 }}>
            {SECTIONS.map((s) => (
              <SectionCard key={s.to} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="goal-title">
        <div className="container">
          <h2 id="goal-title">Зачем этот сайт</h2>
          <ul className="checklist" style={{ marginTop: 16 }}>
            {SITE_GOALS.map((g) => (
              <li key={g}>
                <HeartIcon width="20" height="20" style={{ color: 'var(--c-accent)' }} />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <h2 id="how-title">Как работает сайт</h2>
          <ol className="steps" style={{ marginTop: 24 }}>
            {STEPS_HOW.map((s, i) => (
              <li className="step" key={s.title}>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
