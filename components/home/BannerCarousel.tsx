'use client';

import Slider from "react-slick";
import Image from "next/image";

const images = ["/banners/1.png", "/banners/2.png"];

export function BannerCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        arrows: true,
        swipe: true,
        adaptiveHeight: true,
        pauseOnHover: true,
        appendDots: (dots: any) => (
            <div className="absolute bottom-6 w-full">
                <ul className="flex justify-center gap-3">{dots}</ul>
            </div>
        ),
        customPaging: () => (
            <div className="w-3 h-3 border-2 border-white rounded-full bg-white/50 hover:bg-white transition-all duration-300" />
        ),
    };

    return (
        <div className="relative mt-10 w-[90%] mx-auto overflow-hidden rounded-xl">
            <Slider {...settings}>
                {images.map((src, index) => (
                    <div key={index} className="relative h-60 sm:h-72 md:h-80 lg:h-96">
                        <Image
                            src={src}
                            alt={`Banner ${index + 1}`}
                            fill
                            className="object-cover w-full h-full rounded-xl"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
