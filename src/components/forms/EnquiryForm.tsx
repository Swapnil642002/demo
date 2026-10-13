"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { courseOptions, enquirySchema } from "@/lib/enquiry-schema";
import { elapsedSinceMount, markMounted } from "@/lib/clock";

type FormValues = z.infer<typeof enquirySchema>;

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; message: string; demo: boolean }
  | { state: "error"; message: string };

const fieldBase =
  "w-full rounded-md border bg-white px-4 py-3 text-base text-navy-900 placeholder:text-ink-500 transition-colors focus:outline-none";

const okBorder = "border-ivory-400 focus:border-navy-700";
const badBorder = "border-danger-600";

export function EnquiryForm({ defaultCourse }: { defaultCourse?: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  useEffect(() => {
    markMounted();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      course: (defaultCourse as FormValues["course"]) ?? "not-sure",
      message: "",
      company: "",
      formTime: 0,
    },
  });

  async function onSubmit(values: FormValues) {
    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          formTime: elapsedSinceMount(),
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        demo?: boolean;
        message: string;
      };

      if (!res.ok) {
        setStatus({ state: "error", message: data.message });
        return;
      }
      setStatus({ state: "success", message: data.message, demo: Boolean(data.demo) });
      reset();
    } catch {
      setStatus({
        state: "error",
        message:
          "We could not reach the server. Please check your connection and try again, or call +91 87262 74444.",
      });
    }
  }

  const err = (name: keyof FormValues) => errors[name]?.message as string | undefined;
  const border = (name: keyof FormValues) => (err(name) ? badBorder : okBorder);

  if (status.state === "success") {
    return (
      <div role="status" className="rounded-xl border border-success-600 bg-success-50 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="mt-0.5 shrink-0 text-success-700">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <div>
            <h3 className="font-serif text-lg font-bold text-success-700">Enquiry validated</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-900">{status.message}</p>
            {status.demo ? (
              <p className="mt-3 rounded-md border border-gold-500 bg-white px-3 py-2 text-xs leading-relaxed text-navy-800">
                <strong>Demo mode:</strong> no email was sent and nothing was stored on a
                server. The college will not receive this enquiry until a delivery provider
                is connected.
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => setStatus({ state: "idle" })}
              className="mt-4 text-sm font-semibold text-navy-800 underline underline-offset-4 hover:text-gold-600"
            >
              Submit another enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-describedby="enquiry-form-intro" className="space-y-5">
      <p id="enquiry-form-intro" className="text-sm leading-relaxed text-ink-600">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">required</span> are required. We use your details only to
        respond to this enquiry.
      </p>

      <div role="status" aria-live="polite">
        {status.state === "error" ? (
          <p className="rounded-md border border-danger-600 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-700">
            {status.message}
          </p>
        ) : null}
      </div>

      <input type="hidden" {...register("formTime")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full name" required error={err("fullName")}>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(err("fullName"))}
            aria-describedby={err("fullName") ? "fullName-error" : undefined}
            className={`${fieldBase} ${border("fullName")}`}
            {...register("fullName")}
          />
        </Field>

        <Field id="phone" label="Phone / mobile" required error={err("phone")}>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            aria-invalid={Boolean(err("phone"))}
            aria-describedby={err("phone") ? "phone-error" : undefined}
            className={`${fieldBase} ${border("phone")}`}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field id="email" label="Email address" required error={err("email")}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(err("email"))}
          aria-describedby={err("email") ? "email-error" : undefined}
          className={`${fieldBase} ${border("email")}`}
          {...register("email")}
        />
      </Field>

      <Field id="course" label="Programme of interest" required error={err("course")}>
        <select
          id="course"
          aria-invalid={Boolean(err("course"))}
          aria-describedby={err("course") ? "course-error" : undefined}
          className={`${fieldBase} ${border("course")}`}
          {...register("course")}
        >
          {courseOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="message"
        label="Your question"
        hint="Maximum 2000 characters."
        error={err("message")}
      >
        <textarea
          id="message"
          rows={4}
          aria-invalid={Boolean(err("message"))}
          aria-describedby={err("message") ? "message-error" : "message-hint"}
          className={`${fieldBase} resize-y ${border("message")}`}
          {...register("message")}
        />
      </Field>

      {/* Honeypot — invisible to people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || status.state === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy-800 px-6 py-3.5 text-base font-semibold text-ivory-50 transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status.state === "loading" ? (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-ivory-50 border-t-transparent"
            />
            Sending…
          </>
        ) : (
          "Submit enquiry"
        )}
      </button>
    </form>
  );
}

/** Label + control + hint/error, so every field is wired identically. */
function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-navy-900">
        {label}
        {required ? (
          <>
            {" "}
            <span aria-hidden="true" className="text-danger-600">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
