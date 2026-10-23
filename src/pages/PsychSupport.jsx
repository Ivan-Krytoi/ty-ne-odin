import PageHead from '../components/PageHead';
import SupportForm from '../components/SupportForm';
import { PhoneIcon, HeartIcon, WarningIcon } from '../components/icons';
import { HOTLINES, SELF_HELP, WARNING_SIGNS } from '../data/content';

export default function PsychSupport() {
  return (
    <>
      <PageHead
        badge="Психологическая поддержка"
        title="Поддержка рядом — с каждой"
        text="Здесь можно найти техники самопомощи, обратиться анонимно и понять, когда нужна помощь специалиста. Обращаться за поддержкой — нормально и по-взрослому."
      />

      <section className="section" aria-labelledby="hotlines-title">
        <div className="container">
          <h2 id="hotlines-title">Телефоны, куда можно позвонить прямо сейчас</h2>
          <div className="hotlines" style={{ marginTop: 24 }}>
            {HOTLINES.map((h) => (
              <div className="card" key={h.phone} style={{ '--card-accent': 'var(--c-accent)' }}>
                <div className="card__head">
                  <span className="card__icon">
                    <PhoneIcon width="22" height="22" />
                  </span>
                  <h3 className="card__title" style={{ margin: 0 }}>
                    <a href={`tel:${h.phone.replace(/[^+\d]/g, '')}`}>{h.phone}</a>
                  </h3>
                </div>
                <p className="card__text">
                  <strong style={{ color: 'var(--c-text)' }}>{h.name}.</strong> {h.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="selfhelp-title">
        <div className="container">
          <h2 id="selfhelp-title">Техники самопомощи</h2>
          <p style={{ color: 'var(--c-text-2)' }}>
            Простые упражнения, которые можно сделать прямо сейчас — сами или рядом с близким.
          </p>
          <div className="grid-cards" style={{ marginTop: 24 }}>
            {SELF_HELP.map((t) => (
              <article className="card" key={t.title} style={{ '--card-accent': 'var(--c-accent)' }}>
                <div className="card__head">
                  <span className="card__icon">
                    <HeartIcon width="22" height="22" />
                  </span>
                  <h3 className="card__title" style={{ margin: 0 }}>
                    {t.title}
                  </h3>
                </div>
                <ol style={{ margin: '0 0 12px', paddingLeft: '1.3em' }}>
                  {t.steps.map((step) => (
                    <li key={step} style={{ marginBottom: 6 }}>
                      {step}
                    </li>
                  ))}
                </ol>
                <p className="card__text">{t.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="signs-title">
        <div className="container">
          <h2 id="signs-title">Когда нужен специалист</h2>
          <p style={{ color: 'var(--c-text-2)' }}>
            Самопомощь ценна, но не всесильна. Обратитесь к врачу, психологу
            или позвоните 112, если что-то из этого списка — про вашу ситуацию:
          </p>
          <ul className="checklist" style={{ marginTop: 16 }}>
            {WARNING_SIGNS.map((s) => (
              <li key={s}>
                <WarningIcon style={{ color: 'var(--c-warn)' }} width="20" height="20" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <p style={{ color: 'var(--c-text-2)' }}>
            Мы не ставим диагнозов и не ведём терапию. Наша роль — быть понятным
            входом к помощи: телефоны, направления и анонимная форма.
          </p>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="form-title" id="support-form">
        <div className="container">
          <h2 id="form-title">Анонимная форма обращения</h2>
          <p style={{ color: 'var(--c-text-2)' }}>
            Напишите, что происходит. Обращение сохранится в защищённой базе проекта.
            Ответ приходит на указанный контакт — или просто знайте, что вас услышали.
          </p>
          <SupportForm />
        </div>
      </section>
    </>
  );
}
