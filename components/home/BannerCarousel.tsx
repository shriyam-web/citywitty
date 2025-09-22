'use client';

import Slider from "react-slick";
import Image from "next/image";

const images = ["/banners/1.jpg", "/banners/2.jpg", "/banners/1.png", "/banners/2.png"];

function NextArrow(props: any) {
    const { onClick } = props;
    return (
        <button
            className="absolute top-1/2 right-3 -translate-y-1/2 z-20 
                 bg-white/20 backdrop-blur-md hover:bg-white/40 
                 text-2xl p-2 rounded-full shadow-lg transition"
            onClick={onClick}
        >
            ›
        </button>
    );
}

function PrevArrow(props: any) {
    const { onClick } = props;
    return (
        <button
            className="absolute top-1/2 left-3 -translate-y-1/2 z-20 
                 bg-white/20 backdrop-blur-md hover:bg-white/40 
                  text-2xl p-2 rounded-full shadow-lg transition"
            onClick={onClick}
        >
            ‹
        </button>
    );
}

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
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 640, settings: { arrows: false, dots: true } },
        ],
        appendDots: (dots: any) => (
            <div className="relative mt-8">
                <ul className="flex justify-center gap-2 ">{dots}</ul>
            </div>
        ),

        customPaging: () => (
            <div className="w-3 h-3 rounded-full bg-white/70 border border-gray-400 hover:bg-blue-500 transition-all duration-300" />
        ),
    };

    return (
        <div className="relative w-full py-4 overflow-x-hidden">
            {/* //  bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400 */}
            <Slider {...settings}>
                {images.map((src, index) => (
                    <div key={index}>
                        {/* ✅ Center aligned wrapper */}
                        <div className="max-w-[85%] w-full mx-auto">
                            <Image
                                src={src}
                                alt={`Banner ${index + 1}`}
                                width={1200}
                                height={400}
                                className="object-contain w-full h-auto rounded-xl shadow-lg"
                                priority={index === 0}
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
