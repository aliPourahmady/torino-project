"use client";
import Image from "next/image";
import { useState } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import styles from "./CardSlider.module.css";

function CardSlider({ slides }) {
  const [swiper, setSwiper] = useState(null);
  const [index, setIndex] = useState(0);
  const last = slides.length - 1;

  return (
    <div className={styles.slider}>
      <Swiper
        dir="rtl"
        effect="cards"
        modules={[EffectCards]}
        cardsEffect={{ rotate: false, slideShadows: false, perSlideOffset: 20 }}
        grabCursor
        onSwiper={setSwiper}
        onSlideChange={(s) => setIndex(s.activeIndex)}
        className={styles.swiper}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="(min-width: 768px) 300px, 255px"
              priority={i === 0}
              className={`${styles.slide} ${i < index ? styles.passed : ""}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.controls} dir="ltr">
        <button
          type="button"
          onClick={() => swiper?.slidePrev()}
          disabled={index === 0}
          aria-label="قبلی"
        >
          ←
        </button>
        <span>{digitsEnToFa(`${index + 1} / ${slides.length}`)}</span>
        <button
          type="button"
          onClick={() => swiper?.slideNext()}
          disabled={index === last}
          aria-label="بعدی"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default CardSlider;
