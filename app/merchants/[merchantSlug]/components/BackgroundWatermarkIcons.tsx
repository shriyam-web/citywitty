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
} from "react-icons/fa";

export const BackgroundWatermarkIcons: React.FC = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
            {/* Large icon - Top Left */}
            <FaUtensils
                className="absolute text-slate-400"
                style={{
                    top: '50px',
                    left: '3%',
                    fontSize: '240px',
                    opacity: 0.20,
                    transform: 'rotate(-18deg)',
                }}
            />
            {/* Medium icon - Top Right */}
            <FaTshirt
                className="absolute text-slate-400"
                style={{
                    top: '30px',
                    right: '2%',
                    fontSize: '150px',
                    opacity: 0.22,
                    transform: 'rotate(22deg)',
                }}
            />
            {/* Small icon - Middle Left */}
            <FaLaptop
                className="absolute text-slate-400"
                style={{
                    top: '200px',
                    left: '6%',
                    fontSize: '85px',
                    opacity: 0.23,
                    transform: 'rotate(12deg)',
                }}
            />
            {/* Medium icon - Center Left */}
            <FaSpa
                className="absolute text-slate-400"
                style={{
                    top: '320px',
                    left: '1%',
                    fontSize: '170px',
                    opacity: 0.19,
                    transform: 'rotate(15deg)',
                }}
            />
            {/* Large icon - Center */}
            <FaHotel
                className="absolute text-slate-400"
                style={{
                    top: '280px',
                    left: '42%',
                    fontSize: '210px',
                    opacity: 0.18,
                    transform: 'rotate(-12deg)',
                }}
            />
            {/* Small icon - Middle Right */}
            <FaCar
                className="absolute text-slate-400"
                style={{
                    top: '420px',
                    right: '8%',
                    fontSize: '95px',
                    opacity: 0.21,
                    transform: 'rotate(-25deg)',
                }}
            />
            {/* Medium icon - Lower Left */}
            <FaDumbbell
                className="absolute text-slate-400"
                style={{
                    top: '560px',
                    left: '5%',
                    fontSize: '130px',
                    opacity: 0.22,
                    transform: 'rotate(18deg)',
                }}
            />
            {/* Large icon - Lower Center */}
            <FaGraduationCap
                className="absolute text-slate-400"
                style={{
                    top: '640px',
                    left: '48%',
                    fontSize: '200px',
                    opacity: 0.20,
                    transform: 'rotate(-8deg)',
                }}
            />
            {/* Small icon - Lower Right */}
            <FaBuilding
                className="absolute text-slate-400"
                style={{
                    top: '680px',
                    right: '4%',
                    fontSize: '110px',
                    opacity: 0.19,
                    transform: 'rotate(20deg)',
                }}
            />
            {/* Medium icon - Bottom Left */}
            <FaPlane
                className="absolute text-slate-400"
                style={{
                    top: '820px',
                    left: '10%',
                    fontSize: '165px',
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
                    fontSize: '90px',
                    opacity: 0.20,
                    transform: 'rotate(28deg)',
                }}
            />
            {/* Medium icon - Bottom Right */}
            <FaHeartbeat
                className="absolute text-slate-400"
                style={{
                    top: '940px',
                    right: '6%',
                    fontSize: '145px',
                    opacity: 0.18,
                    transform: 'rotate(-20deg)',
                }}
            />
            {/* Additional scattered icons */}
            <FaCoffee
                className="absolute text-slate-400"
                style={{
                    top: '150px',
                    right: '15%',
                    fontSize: '100px',
                    opacity: 0.17,
                    transform: 'rotate(35deg)',
                }}
            />
            <FaShoppingBag
                className="absolute text-slate-400"
                style={{
                    top: '480px',
                    left: '30%',
                    fontSize: '115px',
                    opacity: 0.19,
                    transform: 'rotate(-22deg)',
                }}
            />
            <FaPalette
                className="absolute text-slate-400"
                style={{
                    top: '780px',
                    right: '20%',
                    fontSize: '125px',
                    opacity: 0.18,
                    transform: 'rotate(16deg)',
                }}
            />
            <FaHome
                className="absolute text-slate-400"
                style={{
                    top: '1050px',
                    left: '25%',
                    fontSize: '135px',
                    opacity: 0.20,
                    transform: 'rotate(-10deg)',
                }}
            />
        </div>
    );
};