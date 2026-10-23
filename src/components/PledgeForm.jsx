import { useState } from 'react';
import { submitPledge, getDonorCount, dbOnline } from '../lib/supabaseClient';
import { ErrorIcon, WarningIcon, CheckIcon } from './icons';

const EMPTY = { name: '', city: '', contact: '', note: '' };

export default function PledgeForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = 'Укажите, как к вам обращаться.';
    if (!values.city.trim()) next.city = 'Укажите город, чтобы мы могли подсказать ближайший центр крови.';
    return next;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('');
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setBusy(true);
    const result = await submitPledge({
      name: values.name.trim(),
      city: values.city.trim(),
      contact: values.contact.trim(),
      note: values.note.trim(),
    });
    setBusy(false);

    if (result.ok && result.saved === 'db') {
      setStatus('Готово! Мы рядом, и первое донорство проще, чем думают.');
    } else if (result.ok && result.saved === 'local') {
      setStatus('Сохранено на вашем устройстве (база данных пока не подключена).');
    } else {
      setStatus('Не удалось сохранить ответ. Попробуйте позже.');
    }
  }

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <p style={{ color: 'var(--c-text-2)', margin: 0 }}>
        {dbOnline
          ? 'Хотите попробовать? Напишите нам — мы подскажем ближайший центр переливания крови.'
          : 'Демо-режим: база не подключена, ответы сохраняются только на этом устройстве.'}
      </p>

      <div className="field">
        <label htmlFor="pledge-name">Имя</label>
        <input
          id="pledge-name"
          name="name"
          type="text"
          value={values.name}
          onChange={set('name')}
          required
        />
        {errors.name && (
          <span className="field-error" role="alert">
            <ErrorIcon /> {errors.name}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="pledge-city">Город</label>
        <input
          id="pledge-city"
          name="city"
          type="text"
          value={values.city}
          onChange={set('city')}
          required
        />
        {errors.city && (
          <span className="field-error" role="alert">
            <ErrorIcon /> {errors.city}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="pledge-contact">Контакт (необязательно)</label>
        <input
          id="pledge-contact"
          name="contact"
          type="text"
          placeholder="Telegram, телефон или e-mail"
          value={values.contact}
          onChange={set('contact')}
        />
      </div>

      <div className="field">
        <label htmlFor="pledge-note">Вопрос или пожелание (необязательно)</label>
        <textarea id="pledge-note" name="note" value={values.note} onChange={set('note')} />
      </div>

      <p className="form-status" aria-live="polite">
        {status && (
          status.startsWith('Не удалось') ? (
            <span className="field-error" role="alert">
              <ErrorIcon /> {status}
            </span>
          ) : status.startsWith('Сохранено на') ? (
            <span className="notice">
              <WarningIcon /> {status}
            </span>
          ) : (
            <span className="form-status__ok">
              <CheckIcon style={{ display: 'inline', verticalAlign: '-4px', marginRight: 6 }} width="18" height="18" />
              {status}
            </span>
          )
        )}
      </p>

      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? 'Сохраняем…' : 'Я хочу стать донором'}
      </button>
    </form>
  );
}
