import { useState } from 'react';
import { submitSupportRequest, dbOnline } from '../lib/supabaseClient';
import { ErrorIcon, WarningIcon, CheckIcon } from './icons';

const TOPICS = [
  'Тревога и стресс',
  'Учёба или работа',
  'Отношения и семья',
  'Одиночество',
  'Другое',
];

const EMPTY = { name: '', contact: '', topic: TOPICS[0], message: '' };

export default function SupportForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (name) => (e) =>
    setValues((v) => ({ ...v, [name]: e.target.value }));

  function validate() {
    const next = {};
    if (values.message.trim().length < 10) {
      next.message = 'Расскажите чуть подробнее — хотя бы 10 символов.';
    }
    if (values.contact.trim() && values.contact.trim().length < 5) {
      next.contact = 'Укажите контакт, по которому можно ответить (или оставьте поле пустым).';
    }
    return next;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('');
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setBusy(true);
    const result = await submitSupportRequest({
      name: values.name.trim() || 'Аноним',
      contact: values.contact.trim() || '',
      topic: values.topic,
      message: values.message.trim(),
    });
    setBusy(false);

    if (result.ok && result.saved === 'db') {
      setStatus('Обращение отправлено. Спасибо, что не замалчиваете трудности — мы рядом.');
    } else if (result.ok && result.saved === 'local') {
      setStatus('Сохранено на вашем устройстве (база данных пока не подключена). ' +
        'Для срочной помощи позвоните 112.');
    } else {
      setStatus('Не удалось отправить. Попробуйте позже или позвоните 112.');
    }
  }

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="sup-name">Как к вам обращаться?</label>
        <span className="hint" id="sup-name-hint">
          Можно указать «Аноним» — это не мешает получить поддержку.
        </span>
        <input
          id="sup-name"
          name="name"
          type="text"
          placeholder="Имя или «Аноним»"
          aria-describedby="sup-name-hint"
          value={values.name}
          onChange={set('name')}
        />
      </div>

      <div className="field">
        <label htmlFor="sup-contact">Контакт для ответа (необязательно)</label>
        <span className="hint" id="sup-contact-hint">
          Telegram, номер телефона или e-mail — если хотите получить
          поддержку в ответ (5 символов минимум).
        </span>
        <input
          id="sup-contact"
          name="contact"
          type="text"
          placeholder="Telegram, телефон или e-mail"
          aria-describedby="sup-contact-hint"
          value={values.contact}
          onChange={set('contact')}
        />
        {errors.contact && (
          <span className="field-error" role="alert">
            <ErrorIcon /> {errors.contact}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="sup-topic">Тема обращения</label>
        <select id="sup-topic" name="topic" value={values.topic} onChange={set('topic')}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="sup-message">Что происходит? (обязательно)</label>
        <textarea
          id="sup-message"
          name="message"
          placeholder="Пишите как удобно — чувства и слова, которые пришли первыми."
          aria-describedby="sup-message-hint"
          value={values.message}
          onChange={set('message')}
          required
        />
        {errors.message && (
          <span className="field-error" role="alert">
            <ErrorIcon /> {errors.message}
          </span>
        )}
      </div>

      <p className="form-status" aria-live="polite">
        {status && (
          status.startsWith('Не удалось') ? (
            <span className="field-error" role="status">
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
        {busy ? 'Отправляем…' : 'Отправить обращение'}
      </button>
      <p style={{ color: 'var(--c-text-2)', fontSize: '0.875rem', margin: 0 }}>
        {dbOnline
          ? 'Обращения хранятся в защищённой базе (Supabase) и не публикуются.'
          : 'Демо-режим: база не подключена, обращения сохраняются только на этом устройстве.'}
      </p>
    </form>
  );
}
