import React from 'react';
import {
    FaUtensils,
    FaTshirt,
    FaSpa,
    FaHotel,
    FaLaptop,
    FaCar,
    FaDumbbell,
    FaGraduationCap,
    FaBuilding,
    FaPlane,
    FaGift,
    FaHeartbeat,
    FaCoffee,
    FaShoppingBag,
    FaPalette,
    FaHome,
    FaLeaf,
    FaBook,
    FaMusic,
} from "react-icons/fa";

export const BackgroundWatermarkIcons: React.FC = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
            {/* Large icon - Top Left */}
            <FaUtensils
                className="absolute text-slate-400"
                style={{
                    top: '60px',
                    left: '4%',
                    fontSize: '120px',
                    opacity: 0.20,
                    transform: 'rotate(-18deg)',
                }}
            />
            {/* Medium icon - Top Right */}
            <FaTshirt
                className="absolute text-slate-400"
                style={{
                    top: '40px',
                    right: '8%',
                    fontSize: '90px',
                    opacity: 0.22,
                    transform: 'rotate(22deg)',
                }}
            />
            {/* Small icon - Middle Left */}
            <FaLaptop
                className="absolute text-slate-400"
                style={{
                    top: '220px',
                    left: '12%',
                    fontSize: '60px',
                    opacity: 0.23,
                    transform: 'rotate(12deg)',
                }}
            />
            {/* Medium icon - Center Left */}
            <FaSpa
                className="absolute text-slate-400"
                style={{
                    top: '340px',
                    left: '6%',
                    fontSize: '110px',
                    opacity: 0.19,
                    transform: 'rotate(15deg)',
                }}
            />
            {/* Large icon - Center */}
            <FaHotel
                className="absolute text-slate-400"
                style={{
                    top: '300px',
                    left: '44%',
                    fontSize: '130px',
                    opacity: 0.18,
                    transform: 'rotate(-12deg)',
                }}
            />
            {/* Small icon - Middle Right */}
            <FaCar
                className="absolute text-slate-400"
                style={{
                    top: '420px',
                    right: '14%',
                    fontSize: '65px',
                    opacity: 0.21,
                    transform: 'rotate(-25deg)',
                }}
            />
            {/* Medium icon - Lower Left */}
            <FaDumbbell
                className="absolute text-slate-400"
                style={{
                    top: '600px',
                    left: '14%',
                    fontSize: '90px',
                    opacity: 0.22,
                    transform: 'rotate(18deg)',
                }}
            />
            {/* Large icon - Lower Center */}
            <FaGraduationCap
                className="absolute text-slate-400"
                style={{
                    top: '640px',
                    left: '56%',
                    fontSize: '125px',
                    opacity: 0.20,
                    transform: 'rotate(-8deg)',
                }}
            />
            {/* Small icon - Lower Right */}
            <FaBuilding
                className="absolute text-slate-400"
                style={{
                    top: '720px',
                    right: '10%',
                    fontSize: '70px',
                    opacity: 0.19,
                    transform: 'rotate(20deg)',
                }}
            />
            {/* Medium icon - Bottom Left */}
            <FaPlane
                className="absolute text-slate-400"
                style={{
                    top: '820px',
                    left: '18%',
                    fontSize: '105px',
                    opacity: 0.21,
                    transform: 'rotate(-15deg)',
                }}
            />
            {/* Small icon - Bottom Center */}
            <FaGift
                className="absolute text-slate-400"
                style={{
                    top: '900px',
                    left: '38%',
                    fontSize: '60px',
                    opacity: 0.20,
                    transform: 'rotate(28deg)',
                }}
            />
            {/* Medium icon - Bottom Right */}
            <FaHeartbeat
                className="absolute text-slate-400"
                style={{
                    top: '940px',
                    right: '16%',
                    fontSize: '95px',
                    opacity: 0.18,
                    transform: 'rotate(-20deg)',
                }}
            />
            {/* Additional scattered icons */}
            <FaCoffee
                className="absolute text-slate-400"
                style={{
                    top: '160px',
                    right: '24%',
                    fontSize: '60px',
                    opacity: 0.17,
                    transform: 'rotate(35deg)',
                }}
            />
            <FaShoppingBag
                className="absolute text-slate-400"
                style={{
                    top: '480px',
                    left: '34%',
                    fontSize: '70px',
                    opacity: 0.19,
                    transform: 'rotate(-22deg)',
                }}
            />
            <FaPalette
                className="absolute text-slate-400"
                style={{
                    top: '780px',
                    right: '28%',
                    fontSize: '80px',
                    opacity: 0.18,
                    transform: 'rotate(16deg)',
                }}
            />
            <FaHome
                className="absolute text-slate-400"
                style={{
                    top: '1080px',
                    left: '36%',
                    fontSize: '90px',
                    opacity: 0.20,
                    transform: 'rotate(-10deg)',
                }}
            />
            <FaLeaf
                className="absolute text-slate-400"
                style={{
                    top: '520px',
                    right: '32%',
                    fontSize: '65px',
                    opacity: 0.18,
                    transform: 'rotate(10deg)',
                }}
            />
            <FaBook
                className="absolute text-slate-400"
                style={{
                    top: '680px',
                    left: '42%',
                    fontSize: '75px',
                    opacity: 0.19,
                    transform: 'rotate(-14deg)',
                }}
            />
            <FaMusic
                className="absolute text-slate-400"
                style={{
                    top: '1020px',
                    left: '12%',
                    fontSize: '70px',
                    opacity: 0.18,
                    transform: 'rotate(8deg)',
                }}
            />
        </div>
    );
};
