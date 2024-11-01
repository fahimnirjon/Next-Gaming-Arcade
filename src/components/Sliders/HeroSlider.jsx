"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider() {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="h-[340px] md:h-[480px] w-full mb-6 rounded-lg border border-accent-secondary bg-main"
        style={{
          "--swiper-pagination-color": "#FFBA08",
          "--swiper-pagination-bullet-incactive-color": "#999999",
          "--swiper-pagination-bullet-incactive-opacity": "1",
          "--swiper-pagination-bullet-size": "0.6em",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
          "--swiper-theme-color": "#FFF",
          "--swiper-navigation-size": "24px",
          "--swiper-navigation-sides-offset": "30px",
        }}
      >
        <SwiperSlide
          className="bg-[url('/slide/slide-1.png')] bg-no-repeat bg-right px-16 md:p-20 items-center"
          style={{ display: "flex" }}
        >
          <div className="max-w-3xl">
            <div className="text-accent text-sm mb-2 uppercase">
              Free Arcade Games
            </div>
            <h1 className="font-display text-2xl md:text-4xl lg:text-6xl mb-4">
              PLAY RETRO GAMES FOR FREE
            </h1>
            <p className="mb-6 max-w-[418px]">
              Relive the classics! Dive into our collection of retro games and
              enjoy them for free. Start playing now!
            </p>
            <a
              href="#"
              className="text-sm bg-accent-gradient py-3 px-6 rounded-xl border border-yellow-400 uppercase"
            >
              Play Mario
            </a>
          </div>
        </SwiperSlide>

        <SwiperSlide
          className="bg-[url('/slide/slide-1.png')] bg-no-repeat bg-right p-20 items-center"
          style={{ display: "flex" }}
        >
          <div className="max-w-3xl">
            <div className="text-accent text-sm mb-2 uppercase">
              Free Arcade Games
            </div>
            <h1 className="font-display text-4xl lg:text-6xl mb-4">Slide #2</h1>
            <p className="mb-6 max-w-[418px]">
              Relive the classics! Dive into our collection of retro games and
              enjoy them for free. Start playing now!
            </p>
            <a
              href="#"
              className="text-sm bg-accent-gradient py-3 px-6 rounded-xl border border-yellow-400 uppercase"
            >
              Play Mario
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
