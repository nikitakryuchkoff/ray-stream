"use client";
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "@/i18n/types";
import s from "./LangSwitcher.module.css";

export default function LangSwitcher({
  lang,
  className = "",
}: {
  lang: Lang;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (newLang: Lang) => {
    const newPath = pathname.replace(/^\/(ru|en)/, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <div className={`${s.switcher} ${className}`}>
      <button
        className={`${s.btn} ${lang === "ru" ? s.active : ""}`}
        onClick={() => switchTo("ru")}
      >
        RU
      </button>
      <button
        className={`${s.btn} ${lang === "en" ? s.active : ""}`}
        onClick={() => switchTo("en")}
      >
        EN
      </button>
    </div>
  );
}
