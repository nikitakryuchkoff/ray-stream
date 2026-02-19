'use client';
import { useState, FormEvent } from 'react';
import type { Translations } from '@/i18n/types';
import Reveal from '@/components/ui/Reveal';
import Separator from '@/components/ui/Separator';
import s from './Contact.module.css';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact({ t }: { t: Translations }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error();

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className={s.section} id="ct">
      <div className="wrap">
        <Separator />
        <div className={s.inner} style={{ marginTop: 'clamp(36px,5vh,56px)' }}>
          <Reveal><p className="label" style={{ marginBottom: 10 }}>{t.ct_label}</p></Reveal>
          <Reveal delay={1}><h2>{t.ct_h2}</h2></Reveal>
          <Reveal delay={2}><p className={s.subtitle}>{t.ct_sub}</p></Reveal>
          <Reveal delay={3}>
            <form onSubmit={handleSubmit}>
              <div className={s.row}>
                <div className={s.group}>
                  <label>{t.f_name}</label>
                  <input
                    type="text"
                    placeholder={t.f_name_ph}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className={s.group}>
                  <label>{t.f_email}</label>
                  <input
                    type="email"
                    placeholder="email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={s.group}>
                <label>{t.f_msg}</label>
                <textarea
                  placeholder={t.f_msg_ph}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <button
                className={s.submit}
                type="submit"
                disabled={status === 'sending'}
              >
                <span>{status === 'sending' ? t.f_sending : t.f_submit}</span>
              </button>
              {status === 'success' && <p className={s.status} data-status="success">{t.f_success}</p>}
              {status === 'error' && <p className={s.status} data-status="error">{t.f_error}</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
