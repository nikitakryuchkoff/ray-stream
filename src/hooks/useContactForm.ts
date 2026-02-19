"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { CONTACT_EMAIL_REGEX, CONTACT_FORM_LIMITS } from "@/constants";

export type ContactFormStatus = "idle" | "sending" | "success" | "error";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

type ContactFormField = keyof ContactFormValues;
type ContactFormErrors = Partial<Record<ContactFormField, string>>;

interface UseContactFormResult {
  formValues: ContactFormValues;
  fieldErrors: ContactFormErrors;
  status: ContactFormStatus;
  isSubmitting: boolean;
  updateField: (field: ContactFormField, value: string) => void;
  touchField: (field: ContactFormField) => void;
  submitForm: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

const INITIAL_FORM_VALUES: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

const INITIAL_TOUCHED_FIELDS: Record<ContactFormField, boolean> = {
  name: false,
  email: false,
  message: false,
};
const STATUS_VISIBILITY_TIMEOUT_MS = 7000;

const setFieldError = (
  currentErrors: ContactFormErrors,
  field: ContactFormField,
  errorMessage?: string,
): ContactFormErrors => {
  const nextErrors = { ...currentErrors };

  if (errorMessage) {
    nextErrors[field] = errorMessage;
  } else {
    delete nextErrors[field];
  }

  return nextErrors;
};

const validateFieldValue = (
  field: ContactFormField,
  rawValue: string,
): string | undefined => {
  const value = rawValue.trim();

  if (field === "name") {
    if (!value) return "Please enter your name.";
    if (value.length < CONTACT_FORM_LIMITS.nameMinLength) {
      return `Name must contain at least ${CONTACT_FORM_LIMITS.nameMinLength} characters.`;
    }
    if (value.length > CONTACT_FORM_LIMITS.nameMaxLength) {
      return `Name must contain at most ${CONTACT_FORM_LIMITS.nameMaxLength} characters.`;
    }
    return undefined;
  }

  if (field === "email") {
    if (!value) return "Please enter your email.";
    if (!CONTACT_EMAIL_REGEX.test(value)) {
      return "Please enter a valid email address.";
    }
    return undefined;
  }

  if (!value) return "Please enter your message.";
  
  if (value.length > CONTACT_FORM_LIMITS.messageMaxLength) {
    return `Message must contain at most ${CONTACT_FORM_LIMITS.messageMaxLength} characters.`;
  }

  return undefined;
};

const validateFormValues = (values: ContactFormValues): ContactFormErrors => {
  const nextErrors: ContactFormErrors = {};

  (Object.keys(values) as ContactFormField[]).forEach((field) => {
    const errorMessage = validateFieldValue(field, values[field]);
    if (errorMessage) {
      nextErrors[field] = errorMessage;
    }
  });

  return nextErrors;
};

export const useContactForm = (): UseContactFormResult => {
  const [formValues, setFormValues] =
    useState<ContactFormValues>(INITIAL_FORM_VALUES);

  const [fieldErrors, setFieldErrors] = useState<ContactFormErrors>({});
  const [touchedFields, setTouchedFields] = useState(INITIAL_TOUCHED_FIELDS);
  const [status, setStatus] = useState<ContactFormStatus>("idle");

  useEffect(() => {
    if (status !== "success" && status !== "error") return;

    const timeoutId = window.setTimeout(() => {
      setStatus("idle");
    }, STATUS_VISIBILITY_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [status]);

  const updateField = useCallback(
    (field: ContactFormField, value: string) => {
      setFormValues((previousValues) => ({
        ...previousValues,
        [field]: value,
      }));
      setStatus("idle");

      setFieldErrors((previousErrors) => {
        const shouldValidateField =
          touchedFields[field] || Boolean(previousErrors[field]);
        if (!shouldValidateField) return previousErrors;

        const nextFieldError = validateFieldValue(field, value);
        return setFieldError(previousErrors, field, nextFieldError);
      });
    },
    [touchedFields],
  );

  const touchField = useCallback(
    (field: ContactFormField) => {
      setTouchedFields((previousTouchedFields) => ({
        ...previousTouchedFields,
        [field]: true,
      }));

      setFieldErrors((previousErrors) => {
        const nextFieldError = validateFieldValue(field, formValues[field]);
        return setFieldError(previousErrors, field, nextFieldError);
      });
    },
    [formValues],
  );

  const submitForm = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validationErrors = validateFormValues(formValues);

      setTouchedFields({
        name: true,
        email: true,
        message: true,
      });
      setFieldErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        setStatus("idle");
        return;
      }

      setStatus("sending");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) {
          throw new Error("Contact request failed");
        }

        setStatus("success");
        setFormValues(INITIAL_FORM_VALUES);
        setFieldErrors({});
        setTouchedFields(INITIAL_TOUCHED_FIELDS);
      } catch {
        setStatus("error");
      }
    },
    [formValues],
  );

  return {
    formValues,
    fieldErrors,
    status,
    isSubmitting: status === "sending",
    updateField,
    touchField,
    submitForm,
  };
};
