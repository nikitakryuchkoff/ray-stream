"use client";

import { useCallback, useState, type FormEvent } from "react";

export type ContactFormStatus = "idle" | "sending" | "success" | "error";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

interface UseContactFormResult {
  formValues: ContactFormValues;
  status: ContactFormStatus;
  isSubmitting: boolean;
  updateField: (field: keyof ContactFormValues, value: string) => void;
  submitForm: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

const INITIAL_FORM_VALUES: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

export const useContactForm = (): UseContactFormResult => {
  const [formValues, setFormValues] =
    useState<ContactFormValues>(INITIAL_FORM_VALUES);

  const [status, setStatus] = useState<ContactFormStatus>("idle");

  const updateField = useCallback(
    (field: keyof ContactFormValues, value: string) => {
      setFormValues((previousValues) => ({
        ...previousValues,
        [field]: value,
      }));
    },
    [],
  );

  const submitForm = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
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
      } catch {
        setStatus("error");
      }
    },
    [formValues],
  );

  return {
    formValues,
    status,
    isSubmitting: status === "sending",
    updateField,
    submitForm,
  };
};
