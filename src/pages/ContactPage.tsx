import { useEffect, useRef, type FormEvent } from 'react';
import { Breadcrumb } from '../components/catalog/Layout';
import { Button } from '../components/ui/button';
import { Loading } from '../components/catalog/Icons';
import { useContactForm } from '../hooks/useContactForm';
import { SITE_EMAIL } from '../constants/site';
import { CONTACT_FORM_LIMITS } from '../constants/contact';
import styles from './ContactPage.module.css';

export function ContactPage({ model }: { model?: string }) {
  const form = useContactForm(model);
  const element = useRef<HTMLFormElement>(null);
  const submitted = useRef(false);
  useEffect(() => {
    if (submitted.current && Object.keys(form.fieldErrors).length) {
      element.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      submitted.current = false;
    }
  }, [form.fieldErrors]);
  const send = (event: FormEvent<HTMLFormElement>) => { submitted.current = true; void form.submitForm(event); };
  const mailSubject = `Raystream enquiry${model ? ` — ${model}` : ''}`;
  const mailBody = `${model ? `Equipment: ${model}\n\n` : ''}${form.formValues.message}\n\nName: ${form.formValues.name}\nEmail: ${form.formValues.email}`;
  const mailto = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  return <>
    <Breadcrumb items={[{ label: 'Contact' }]} /><section className="contact-page"><div className="contact-copy"><h1>Good lighting<br />starts with<br />a conversation.</h1><p>Tell us what you're working on. We'll help you explore equipment and the details of your lighting system.</p><a className="contact-email" href={mailto}>{SITE_EMAIL}</a><div className="contact-guide"><h3>A useful starting point</h3><p>Include the model, installation context, approximate length and any preferred colour or control requirements. A first idea is enough to get started.</p></div></div>
    <form ref={element} className="contact-form" noValidate onSubmit={send} aria-busy={form.isSubmitting}>
      {model && <div className="model-selection"><div><span className="eyebrow">YOUR SELECTED EQUIPMENT</span><strong>{model}</strong></div><a href="/catalog">Change model</a></div>}
      {form.status === 'success' && <div className="form-status" role="status"><strong>Thank you for your enquiry.</strong>Your message has been accepted. Raystream will reply by email.</div>}
      {form.status === 'error' && <div className="form-status error" role="alert"><strong>Your message could not be sent.</strong>Please try again or email <a href={mailto}>{SITE_EMAIL} (opens your email app)</a>. Your details are still here.</div>}
      <div className={`form-field ${form.fieldErrors.name ? 'invalid' : ''}`}><label htmlFor="contact-name">Your name <span aria-hidden="true">*</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="Name" required minLength={CONTACT_FORM_LIMITS.nameMinLength} maxLength={CONTACT_FORM_LIMITS.nameMaxLength} value={form.formValues.name} onChange={event => form.updateField('name', event.target.value)} onBlur={() => form.touchField('name')} aria-invalid={Boolean(form.fieldErrors.name)} aria-describedby={form.fieldErrors.name ? 'name-error' : undefined} disabled={form.isSubmitting} /><span className="field-error" id="name-error">{form.fieldErrors.name}</span></div>
      <div className={`form-field ${form.fieldErrors.email ? 'invalid' : ''}`}><label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required value={form.formValues.email} onChange={event => form.updateField('email', event.target.value)} onBlur={() => form.touchField('email')} aria-invalid={Boolean(form.fieldErrors.email)} aria-describedby={form.fieldErrors.email ? 'email-error' : undefined} disabled={form.isSubmitting} /><span className="field-error" id="email-error">{form.fieldErrors.email}</span></div>
      <div className={`form-field ${form.fieldErrors.message ? 'invalid' : ''}`}><label htmlFor="contact-message">Tell us about your project <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" placeholder="Application, model, approximate length or any questions..." required maxLength={CONTACT_FORM_LIMITS.messageMaxLength} value={form.formValues.message} onChange={event => form.updateField('message', event.target.value)} onBlur={() => form.touchField('message')} aria-invalid={Boolean(form.fieldErrors.message)} aria-describedby={`message-count${form.fieldErrors.message ? ' message-error' : ''}`} disabled={form.isSubmitting} /><span className="message-count" id="message-count">{form.formValues.message.length} / {CONTACT_FORM_LIMITS.messageMaxLength}</span><span className="field-error" id="message-error">{form.fieldErrors.message}</span></div>
      <div className="form-bottom"><p className="form-note">Your details are used to respond to this enquiry.<br />All fields are required.</p><Button className={`submit-button ${form.isSubmitting ? 'loading' : ''}`} type="submit" disabled={form.isSubmitting} aria-busy={form.isSubmitting}>{form.isSubmitting && <span className="button-spinner" aria-hidden="true"><Loading className="icon" /></span>}{form.isSubmitting ? 'Sending enquiry...' : form.status === 'error' ? 'Try sending again' : 'Send enquiry'}</Button></div>
      <span className={styles.sendingStatus} role="status">{form.isSubmitting ? 'Sending your enquiry. Please wait.' : ''}</span>
    </form></section>
  </>;
}
