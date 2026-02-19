"use client";
import { default as classNames } from "classnames";
import { Reveal, Separator } from "@/components/ui";
import type { Translations } from "@/content";
import { useContactForm } from "@/hooks";
import styles from "./Contact.module.css";

const Contact = ({ t }: { t: Translations }) => {
  const { formValues, status, isSubmitting, updateField, submitForm } =
    useContactForm();

  return (
    <section className={styles.section} id="ct">
      <div className="wrap">
        <Separator />
        <div className={styles.inner}>
          <Reveal>
            <p className={classNames("label", styles.sectionLabel)}>{t.ct_label}</p>
          </Reveal>
          <Reveal delay={1}>
            <h2>{t.ct_h2}</h2>
          </Reveal>
          <Reveal delay={2}>
            <p className={styles.subtitle}>{t.ct_sub}</p>
          </Reveal>
          <Reveal delay={3}>
            <form onSubmit={submitForm}>
              <div className={styles.row}>
                <div className={styles.group}>
                  <label>{t.f_name}</label>
                  <input
                    type="text"
                    placeholder={t.f_name_ph}
                    value={formValues.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    required
                  />
                </div>
                <div className={styles.group}>
                  <label>{t.f_email}</label>
                  <input
                    type="email"
                    placeholder="email@company.com"
                    value={formValues.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <div className={styles.group}>
                <label>{t.f_msg}</label>
                <textarea
                  placeholder={t.f_msg_ph}
                  value={formValues.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  required
                />
              </div>
              <button
                className={styles.submit}
                type="submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? t.f_sending : t.f_submit}</span>
              </button>
              {status === "success" && (
                <p className={styles.status} data-status="success">
                  {t.f_success}
                </p>
              )}
              {status === "error" && (
                <p className={styles.status} data-status="error">
                  {t.f_error}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export { Contact };
