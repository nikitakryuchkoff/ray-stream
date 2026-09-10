"use client";
import { default as classNames } from "classnames";
import { ClipReveal, Reveal } from "@/components/ui";
import type { Translations } from "@/content";
import { useHeroIntroParallax } from "@/hooks";
import { scrollToSection } from "@/utils";
import styles from "./Hero.module.css";

const Hero = ({ t }: { t: Translations }) => {
  const { heroTopRef, isHeroVisible } = useHeroIntroParallax();

  return (
    <section className={styles.hero} id="hero" data-header-theme="dark">
      <div className={styles.glow} />
      <div className={styles.rays}>
        <div className={styles.ray} />
        <div className={styles.ray} />
        <div className={styles.ray} />
      </div>
      <div className={styles.top} ref={heroTopRef}>
        <div
          className={classNames(
            styles.text,
            styles.enter,
            styles.enterText,
            isHeroVisible && styles.enterVisible,
          )}
        >
          <Reveal delay={0} forceVisible={isHeroVisible}>
            <p className={classNames("label", "label-l", styles.heroLabel)}>
              {t.hero_label}
            </p>
          </Reveal>
          <h1>
            <ClipReveal forceVisible={isHeroVisible}>{t.hero_line1}</ClipReveal>
            <ClipReveal delay={1} forceVisible={isHeroVisible}>
              {t.hero_line2} <em>lighting</em>
            </ClipReveal>
          </h1>
          <Reveal delay={2} forceVisible={isHeroVisible}>
            <p className={styles.sub}>{t.hero_sub}</p>
          </Reveal>
          <Reveal delay={3} forceVisible={isHeroVisible}>
            <button
              className={styles.btn}
              onClick={() => scrollToSection("#ct")}
            >
              <span>{t.hero_cta}</span>
              <span className={styles.arrow}>→</span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export { Hero };
