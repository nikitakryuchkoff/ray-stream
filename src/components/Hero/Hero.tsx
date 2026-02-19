"use client";
import { ClipReveal, Reveal } from "@/components/ui";
import type { Translations } from "@/content";
import { useHeroIntroParallax } from "@/hooks";
import { classNames, scrollToSection } from "@/utils";
import s from "./Hero.module.css";

const Hero = ({ t }: { t: Translations }) => {
  const { heroTopRef, isHeroVisible } = useHeroIntroParallax();

  return (
    <section className={s.hero} id="hero" data-header-theme="dark">
      <div className={s.glow} />
      <div className={s.rays}>
        <div className={s.ray} />
        <div className={s.ray} />
        <div className={s.ray} />
      </div>
      <div className={s.top} ref={heroTopRef}>
        <div
          className={classNames(
            s.text,
            s.enter,
            s.enterText,
            isHeroVisible && s.enterVisible,
          )}
        >
          <Reveal delay={0} forceVisible={isHeroVisible}>
            <p className={classNames("label", "label-l", s.heroLabel)}>
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
            <p className={s.sub}>{t.hero_sub}</p>
          </Reveal>
          <Reveal delay={3} forceVisible={isHeroVisible}>
            <button className={s.btn} onClick={() => scrollToSection("#ct")}>
              <span>{t.hero_cta}</span>
              <span className={s.arrow}>→</span>
            </button>
          </Reveal>
        </div>
      </div>
      <div
        className={classNames(
          s.videoWrap,
          s.enter,
          s.enterVideo,
          isHeroVisible && s.enterVisible,
        )}
      >
        <Reveal variant="scale" delay={4} forceVisible={isHeroVisible}>
          <div className={s.vc}>
            <div className={s.beams}>
              <div className={s.beam} />
              <div className={s.beam} />
              <div className={s.beam} />
            </div>
            <div className={s.vp}>
              <div className={s.playBtn}>
                <svg viewBox="0 0 16 16">
                  <polygon points="4,2 14,8 4,14" />
                </svg>
              </div>
              <span className={s.videoLabel}>{t.video_label}</span>
            </div>
          </div>
        </Reveal>
      </div>
      <div className={s.scrollInd}>
        <span>Scroll</span>
        <div className={s.scrollMouse} />
      </div>
    </section>
  );
};

export { Hero };
