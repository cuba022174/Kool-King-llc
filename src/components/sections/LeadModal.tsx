"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  Thermometer,
  Users,
  X,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

interface LeadFormData {
  shopName: string;
  technicianCount: string;
  brands: string[];
  email: string;
}

const EMPTY_FORM: LeadFormData = {
  shopName: "",
  technicianCount: "",
  brands: [],
  email: "",
};

const BRAND_OPTIONS = [
  "Carrier",
  "Trane",
  "Lennox",
  "Rheem",
  "Goodman",
  "York",
  "Copeland",
  "Other",
];

const STEPS = [
  { title: "Tell us about your shop", subtitle: "Who are we setting up?" },
  { title: "What do your techs run?", subtitle: "Select every brand you service." },
  { title: "Where should we send access?", subtitle: "We'll email your private invite." },
] as const;

type FieldErrors = Partial<Record<keyof LeadFormData, string>>;
type SubmitStatus = "idle" | "submitting" | "success";

function validateStep(step: number, data: LeadFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (step === 0) {
    if (!data.shopName.trim()) {
      errors.shopName = "Shop name is required.";
    }
    const count = Number(data.technicianCount);
    if (!data.technicianCount.trim() || Number.isNaN(count) || count < 1) {
      errors.technicianCount = "Enter at least 1 technician.";
    }
  }

  if (step === 1) {
    if (data.brands.length === 0) {
      errors.brands = "Select at least one brand.";
    }
  }

  if (step === 2) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email.trim())) {
      errors.email = "Enter a valid work email.";
    }
  }

  return errors;
}

export default function LeadModal() {
  const isOpen = useAppStore((state) => state.isLeadModalOpen);
  const closeLeadModal = useAppStore((state) => state.closeLeadModal);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<LeadFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const titleId = useId();
  const subtitleId = useId();
  const shopNameErrorId = useId();
  const technicianCountErrorId = useId();
  const brandsErrorId = useId();
  const emailErrorId = useId();

  const isLastStep = step === STEPS.length - 1;

  // Reset to a clean first step whenever the modal is closed, so the
  // next open always starts fresh.
  const handleClose = () => {
    closeLeadModal();
    window.setTimeout(() => {
      setStep(0);
      setForm(EMPTY_FORM);
      setErrors({});
      setStatus("idle");
    }, 200);
  };

  // Lock body scroll and allow Escape to dismiss while open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Move focus into the dialog, and to the first field of each new step.
  useEffect(() => {
    if (!isOpen) return;
    if (status === "success") {
      dialogRef.current?.focus();
      return;
    }
    firstFieldRef.current?.focus();
  }, [isOpen, step, status]);

  const updateField = <K extends keyof LeadFormData>(
    key: K,
    value: LeadFormData[K],
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const toggleBrand = (brand: string) => {
    setForm((previous) => {
      const isSelected = previous.brands.includes(brand);
      return {
        ...previous,
        brands: isSelected
          ? previous.brands.filter((entry) => entry !== brand)
          : [...previous.brands, brand],
      };
    });
    setErrors((previous) => ({ ...previous, brands: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (!isLastStep) {
      setStep((previous) => previous + 1);
      return;
    }

    // Simulated submission — swap for a real API call when the backend
    // for lead capture is wired up.
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
    }, 1100);
  };

  const handleBack = () => {
    setErrors({});
    setStep((previous) => Math.max(0, previous - 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="lead-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            aria-hidden="true"
            className="fixed inset-0 z-[80] bg-obsidian/70 backdrop-blur-sm"
          />

          <div className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center p-4">
            <motion.div
              key="lead-modal-panel"
              ref={dialogRef}
              tabIndex={-1}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={subtitleId}
              className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-abyssal/80 shadow-cryo backdrop-blur-2xl"
            >
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dialog"
                className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-chrome/70 transition-colors hover:border-cryo/40 hover:text-cryo"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              {status === "success" ? (
                <div className="flex flex-col items-center px-8 py-14 text-center">
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-cryo/40 bg-cryo/10 text-cryo"
                  >
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  </motion.div>
                  <h2
                    id={titleId}
                    className="mt-6 font-heading text-xl font-semibold text-chrome"
                  >
                    You&rsquo;re on the list
                  </h2>
                  <p id={subtitleId} className="mt-2 text-sm text-chrome/60">
                    We&rsquo;ll email <span className="text-chrome">{form.email}</span>{" "}
                    as soon as your private access is ready.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cryo to-laser px-6 py-3 text-sm font-semibold text-obsidian shadow-cryo transition-shadow hover:shadow-laser"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="px-6 pb-6 pt-14 sm:px-8">
                  {/* Progress indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-widest text-chrome/50">
                      <span>
                        Step {step + 1} of {STEPS.length}
                      </span>
                      <span>Request Private Access</span>
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cryo to-laser"
                        animate={{
                          width: `${((step + 1) / STEPS.length) * 100}%`,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2
                        id={titleId}
                        className="font-heading text-xl font-semibold text-chrome"
                      >
                        {STEPS[step].title}
                      </h2>
                      <p id={subtitleId} className="mt-1 text-sm text-chrome/60">
                        {STEPS[step].subtitle}
                      </p>

                      <div className="mt-6 flex flex-col gap-5">
                        {step === 0 && (
                          <>
                            <div>
                              <label
                                htmlFor="shopName"
                                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-chrome/60"
                              >
                                Shop name
                              </label>
                              <div className="relative">
                                <Building2
                                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-chrome/40"
                                  aria-hidden="true"
                                />
                                <input
                                  ref={firstFieldRef}
                                  id="shopName"
                                  name="shopName"
                                  type="text"
                                  autoComplete="organization"
                                  value={form.shopName}
                                  onChange={(event) =>
                                    updateField("shopName", event.target.value)
                                  }
                                  aria-invalid={Boolean(errors.shopName)}
                                  aria-describedby={
                                    errors.shopName ? shopNameErrorId : undefined
                                  }
                                  placeholder="Arctic Air Mechanical"
                                  className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-3 text-sm text-chrome placeholder:text-chrome/30 focus:outline-none focus:ring-2 ${
                                    errors.shopName
                                      ? "border-red-400/60 focus:ring-red-400/40"
                                      : "border-white/10 focus:border-cryo/40 focus:ring-cryo/30"
                                  }`}
                                />
                              </div>
                              {errors.shopName && (
                                <p
                                  id={shopNameErrorId}
                                  role="alert"
                                  className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                                >
                                  <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                  {errors.shopName}
                                </p>
                              )}
                            </div>

                            <div>
                              <label
                                htmlFor="technicianCount"
                                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-chrome/60"
                              >
                                Technician count
                              </label>
                              <div className="relative">
                                <Users
                                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-chrome/40"
                                  aria-hidden="true"
                                />
                                <input
                                  id="technicianCount"
                                  name="technicianCount"
                                  type="number"
                                  min={1}
                                  inputMode="numeric"
                                  value={form.technicianCount}
                                  onChange={(event) =>
                                    updateField(
                                      "technicianCount",
                                      event.target.value,
                                    )
                                  }
                                  aria-invalid={Boolean(errors.technicianCount)}
                                  aria-describedby={
                                    errors.technicianCount
                                      ? technicianCountErrorId
                                      : undefined
                                  }
                                  placeholder="6"
                                  className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-3 text-sm text-chrome placeholder:text-chrome/30 focus:outline-none focus:ring-2 ${
                                    errors.technicianCount
                                      ? "border-red-400/60 focus:ring-red-400/40"
                                      : "border-white/10 focus:border-cryo/40 focus:ring-cryo/30"
                                  }`}
                                />
                              </div>
                              {errors.technicianCount && (
                                <p
                                  id={technicianCountErrorId}
                                  role="alert"
                                  className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                                >
                                  <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                  {errors.technicianCount}
                                </p>
                              )}
                            </div>
                          </>
                        )}

                        {step === 1 && (
                          <fieldset
                            aria-invalid={Boolean(errors.brands)}
                            aria-describedby={
                              errors.brands ? brandsErrorId : undefined
                            }
                          >
                            <legend className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-chrome/60">
                              Equipment brands you service
                            </legend>
                            <div className="grid grid-cols-2 gap-2">
                              {BRAND_OPTIONS.map((brand, index) => {
                                const isChecked = form.brands.includes(brand);
                                return (
                                  <label
                                    key={brand}
                                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                                      isChecked
                                        ? "border-cryo/50 bg-cryo/10 text-cryo"
                                        : "border-white/10 bg-white/5 text-chrome/70 hover:border-white/20"
                                    }`}
                                  >
                                    <input
                                      ref={index === 0 ? firstFieldRef : undefined}
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => toggleBrand(brand)}
                                      className="h-4 w-4 shrink-0 rounded border-white/20 bg-transparent text-cryo focus:ring-cryo/40"
                                    />
                                    <span className="flex items-center gap-1.5">
                                      <Thermometer className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                                      {brand}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                            {errors.brands && (
                              <p
                                id={brandsErrorId}
                                role="alert"
                                className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                              >
                                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                {errors.brands}
                              </p>
                            )}
                          </fieldset>
                        )}

                        {step === 2 && (
                          <div>
                            <label
                              htmlFor="email"
                              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-chrome/60"
                            >
                              Work email
                            </label>
                            <div className="relative">
                              <Mail
                                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-chrome/40"
                                aria-hidden="true"
                              />
                              <input
                                ref={firstFieldRef}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={(event) =>
                                  updateField("email", event.target.value)
                                }
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={
                                  errors.email ? emailErrorId : undefined
                                }
                                placeholder="you@yourshop.com"
                                className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-3 text-sm text-chrome placeholder:text-chrome/30 focus:outline-none focus:ring-2 ${
                                  errors.email
                                    ? "border-red-400/60 focus:ring-red-400/40"
                                    : "border-white/10 focus:border-cryo/40 focus:ring-cryo/30"
                                }`}
                              />
                            </div>
                            {errors.email && (
                              <p
                                id={emailErrorId}
                                role="alert"
                                className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                              >
                                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                {errors.email}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-chrome/70 transition-colors hover:text-chrome"
                      >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Back
                      </button>
                    ) : (
                      <span />
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cryo to-laser px-6 py-2.5 text-sm font-semibold text-obsidian shadow-cryo transition-shadow hover:shadow-laser disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Submitting
                        </>
                      ) : isLastStep ? (
                        "Submit"
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
