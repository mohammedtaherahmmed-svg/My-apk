import { useCallback, useEffect, useState } from "react";
import { DEFAULT_COMPANY, type CompanyProfile } from "@/lib/company";
import type { Lang } from "@/lib/i18n";

const PROFILE_KEY = "monochrome.profile.v1";
const LANG_KEY = "monochrome.lang.v1";

function readProfile(): CompanyProfile {
  if (typeof window === "undefined") return DEFAULT_COMPANY;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_COMPANY;
    const parsed = JSON.parse(raw) as Partial<CompanyProfile>;
    return {
      ...DEFAULT_COMPANY,
      ...parsed,
      products:
        Array.isArray(parsed.products) && parsed.products.length > 0
          ? parsed.products
          : DEFAULT_COMPANY.products,
    };
  } catch {
    return DEFAULT_COMPANY;
  }
}

function readLang(): Lang {
  if (typeof window === "undefined") return "ar";
  const stored = window.localStorage.getItem(LANG_KEY);
  return stored === "en" || stored === "ar" ? stored : "ar";
}

export function useCompany() {
  const [profile, setProfile] = useState<CompanyProfile>(DEFAULT_COMPANY);
  const [lang, setLangState] = useState<Lang>("ar");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProfile(readProfile());
    setLangState(readLang());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang, hydrated]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const reset = useCallback(() => setProfile(DEFAULT_COMPANY), []);
  const patch = useCallback((partial: Partial<CompanyProfile>) => {
    setProfile((prev) => ({ ...prev, ...partial }));
  }, []);
  const patchProduct = useCallback(
    (index: number, partial: Partial<CompanyProfile["products"][number]>) => {
      setProfile((prev) => ({
        ...prev,
        products: prev.products.map((item, i) => (i === index ? { ...item, ...partial } : item)),
      }));
    },
    [],
  );

  return { profile, patch, patchProduct, reset, lang, setLang, hydrated };
}
