import { Resend } from "resend";
import { NextResponse } from "next/server";
import { CONTACT_EMAIL_REGEX, CONTACT_FORM_LIMITS } from "@/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

const normalizeInput = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const validateContactPayload = (payload: {
  name: string;
  email: string;
  message: string;
}): string | null => {
  if (!payload.name) return "Name is required.";
  if (payload.name.length < CONTACT_FORM_LIMITS.nameMinLength) {
    return `Name must contain at least ${CONTACT_FORM_LIMITS.nameMinLength} characters.`;
  }
  if (payload.name.length > CONTACT_FORM_LIMITS.nameMaxLength) {
    return `Name must contain at most ${CONTACT_FORM_LIMITS.nameMaxLength} characters.`;
  }

  if (!payload.email) return "Email is required.";
  if (!CONTACT_EMAIL_REGEX.test(payload.email)) {
    return "Email is invalid.";
  }

  if (!payload.message) return "Message is required.";
  if (payload.message.length > CONTACT_FORM_LIMITS.messageMaxLength) {
    return `Message must contain at most ${CONTACT_FORM_LIMITS.messageMaxLength} characters.`;
  }

  return null;
};

export const POST = async (req: Request) => {
  try {
    const payload = await req.json();
    const name = normalizeInput(payload.name);
    const email = normalizeInput(payload.email);
    const message = normalizeInput(payload.message);

    const validationError = validateContactPayload({
      name,
      email,
      message,
    });
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    await resend.emails.send({
      from: "RayStream <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `New request from ${name}`,
      replyTo: email,
      html: `
        <h2>New request from RayStream website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
};
