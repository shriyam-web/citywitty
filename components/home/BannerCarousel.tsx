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
        responsive: [
            {
                breakpoint: 640,
                settings: { arrows: false, dots: true },
            },
        ],
        appendDots: (dots: any) => (
            <div className="absolute -bottom-3 w-full z-20">
                <ul className="flex justify-center gap-2">{dots}</ul>
            </div>
        ),
        customPaging: () => (
            <div className="w-3 h-3 rounded-full bg-white/70 border border-gray-300 hover:bg-blue-500 transition-all duration-300" />
        ),
    };

    return (
        <>
            <br />
            <div className="relative w-full overflow-visible">
                <Slider {...settings}>
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="flex justify-center px-2 bg-gray-100"
                        >
                            {/* Add vertical padding around the image */}
                            <div className="w-[85%] py-4 mx-auto">
                                <Image
                                    src={src}
                                    alt={`Banner ${index + 1}`}
                                    width={1200}
                                    height={400}
                                    className="object-contain w-full h-auto rounded-xl"
                                    priority={index === 0}
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
}
