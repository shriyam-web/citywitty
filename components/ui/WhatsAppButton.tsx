"use client";

import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton({
    text,
    label,
    fullWidth = false,
    variant = "default",
}: {
    text: string;
    label: string;
    fullWidth?: boolean;
    variant?: "default" | "primary";
}) {
    const openWhatsApp = () => {
        const message = encodeURIComponent(text);
        window.open(`https://wa.me/916389202030?text=${message}`, "_blank");
    };

    return (
        <Button
            size="lg"
            className={`${variant === "primary"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-white text-blue-600 hover:bg-gray-100"
                } font-semibold px-8 py-4 text-lg ${fullWidth ? "w-full" : ""}`}
            onClick={openWhatsApp}
        >
            <MessageCircle className="mr-2 h-5 w-5" />
            {label}
            <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
    );
}
