"use client";
import { default as classNames } from "classnames";
import { useCallback, useEffect, useRef } from "react";
import { Reveal, Separator } from "@/components/ui";
import type { Translations } from "@/content";
import { CONTACT_FORM_LIMITS } from "@/constants";
import { useContactForm } from "@/hooks";
import styles from "./Contact.module.css";

const Contact = ({ t }: { t: Translations }) => {
  const {
    formValues,
    fieldErrors,
    status,
    isSubmitting,
    updateField,
    touchField,
    submitForm,
  } = useContactForm();
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);
  const messageLength = formValues.message.length;
  const messageMaxLength = CONTACT_FORM_LIMITS.messageMaxLength;

  const resizeMessageTextarea = useCallback((element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, []);

  useEffect(() => {
    if (!messageTextareaRef.current) return;
    resizeMessageTextarea(messageTextareaRef.current);
  }, [formValues.message, resizeMessageTextarea]);

  return (
    <section className={styles.section} id="ct">
      <div className="wrap">
        <Separator />
        <div className={styles.inner}>
          <Reveal>
            <p className={classNames("label", styles.sectionLabel)}>
              {t.ct_label}
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2>{t.ct_h2}</h2>
          </Reveal>
          <Reveal delay={2}>
            <p className={styles.subtitle}>{t.ct_sub}</p>
          </Reveal>
          <Reveal delay={3}>
            <form className={styles.form} onSubmit={submitForm} noValidate>
              <div className={styles.row}>
                <div
                  className={classNames(
                    styles.group,
                    fieldErrors.name && styles.groupInvalid,
                  )}
                >
                  <label htmlFor="contact-name">{t.f_name}</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder={t.f_name_ph}
                    value={formValues.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    onBlur={() => touchField("name")}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={
                      fieldErrors.name ? "contact-name-error" : undefined
                    }
                  />
                  {fieldErrors.name && (
                    <p id="contact-name-error" className={styles.fieldError}>
                      {fieldErrors.name}
                    </p>
                  )}
                </div>
                <div
                  className={classNames(
                    styles.group,
                    fieldErrors.email && styles.groupInvalid,
                  )}
                >
                  <label htmlFor="contact-email">{t.f_email}</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="email@company.com"
                    value={formValues.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    onBlur={() => touchField("email")}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={
                      fieldErrors.email ? "contact-email-error" : undefined
                    }
                  />
                  {fieldErrors.email && (
                    <p id="contact-email-error" className={styles.fieldError}>
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>
              <div
                className={classNames(
                  styles.group,
                  fieldErrors.message && styles.groupInvalid,
                )}
              >
                <label htmlFor="contact-message">{t.f_msg}</label>
                <textarea
                  id="contact-message"
                  ref={messageTextareaRef}
                  placeholder={t.f_msg_ph}
                  value={formValues.message}
                  maxLength={messageMaxLength}
                  onChange={(event) => {
                    updateField("message", event.target.value);
                    resizeMessageTextarea(event.currentTarget);
                  }}
                  onBlur={() => touchField("message")}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={
                    fieldErrors.message ? "contact-message-error" : undefined
                  }
                />
                {fieldErrors.message && (
                  <p id="contact-message-error" className={styles.fieldError}>
                    {fieldErrors.message}
                  </p>
                )}
                <div className={styles.charCounter}>
                  {messageLength}/{messageMaxLength}
                </div>
              </div>
              <button
                className={styles.submit}
                type="submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? t.f_sending : t.f_submit}</span>
              </button>
              {status === "success" && (
                <div
                  className={classNames(
                    styles.statusCard,
                    styles.statusSuccess,
                  )}
                  role="status"
                  aria-live="polite"
                >
                  <div className={styles.statusIcon} aria-hidden>
                    <svg viewBox="0 0 24 24">
                      <path d="M20 7L10 17l-6-6" />
                    </svg>
                  </div>
                  <div className={styles.statusBody}>
                    <p className={styles.statusTitle}>{t.f_success}</p>
                    <p className={styles.statusHint}>
                      We&apos;ll contact you by email shortly.
                    </p>
                  </div>
                </div>
              )}
              {status === "error" && (
                <div
                  className={classNames(styles.statusCard, styles.statusError)}
                  role="alert"
                >
                  <div className={styles.statusIcon} aria-hidden>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 8v5" />
                      <path d="M12 16h.01" />
                      <path d="M10.2 3.9L1.8 18.2A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.8L13.8 3.9a2 2 0 0 0-3.6 0z" />
                    </svg>
                  </div>
                  <div className={styles.statusBody}>
                    <p className={styles.statusTitle}>{t.f_error}</p>
                    <p className={styles.statusHint}>
                      Please check the fields and try again.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export { Contact };
