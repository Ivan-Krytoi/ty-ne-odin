import { useEffect, useState } from 'react';
import PageHead from '../components/PageHead';
import PledgeForm from '../components/PledgeForm';
import { DropIcon, CheckIcon, HeartIcon } from '../components/icons';
import {
  DONOR_REQUIREMENTS,
  DONOR_STEPS_PREPARE,
  DONOR_STEPS_AFTER,
  DONOR_MYTHS,
} from '../data/content';
import { getDonorCount, dbOnline } from '../lib/supabaseClient';

export default function Donorship() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let alive = true;
    getDonorCount().then((c) => {
      if (alive) setCount(c);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <PageHead
        badge="Донорство"
        title="Донорство: одна донация — до трёх спасённых жизней"
        text="Здесь — как подготовиться к сдаче крови, что взять с собой и на что обратить внимание после процедуры. Простыми словами и без страшных медицинских формулировок."
      />

      <section className="section" aria-labelledby="req-title">
        <div className="container">
          <h2 id="req-title">Главные требования</h2>
          <ul className="checklist" style={{ marginTop: 16 }}>
            {DONOR_REQUIREMENTS.map((r) => (
              <li key={r}>
                <CheckIcon />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          {dbOnline && count !== null && (
            <p style={{ color: 'var(--c-text-2)' }}>
              Через форму ниже уже заявили о намерении сдать кровь: <strong>{count}</strong> человек(а).
            </p>
          )}
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="prep-title">
        <div className="container">
          <h2 id="prep-title">Подготовка — за сутки до донации и утром</h2>
          <ul className="checklist" style={{ marginTop: 16 }}>
            {DONOR_STEPS_PREPARE.map((s) => (
              <li key={s}>
                <DropIcon width="20" height="20" style={{ color: 'var(--c-coral)' }} />
                <span>{s}</span>
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: 32 }}>После донации</h3>
          <ul className="checklist">
            {DONOR_STEPS_AFTER.map((s) => (
              <li key={s}>
                <CheckIcon />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="myths-title">
        <div className="container">
          <h2 id="myths-title">Мифы и правда</h2>
          <div className="grid-cards" style={{ marginTop: 24 }}>
            {DONOR_MYTHS.map((m) => (
              <article className="card" key={m.myth} style={{ '--card-accent': 'var(--c-coral)' }}>
                <div className="card__head">
                  <span className="card__icon">
                    <DropIcon width="22" height="22" />
                  </span>
                  <h3 className="card__title" style={{ margin: 0 }}>
                    {m.myth}
                  </h3>
                </div>
                <p className="card__text">{m.truth}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="pledge-title" id="pledge-form">
        <div className="container">
          <h2 id="pledge-title">Сообщить о готовности</h2>
          <PledgeForm />
        </div>
      </section>
    </>
  );
}
