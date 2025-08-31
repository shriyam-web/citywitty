"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Mail, X } from "lucide-react";

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/916389202030?text=Hi, I need support with CityWitty",
      "_blank"
    );
  };

  const openCall = () => {
    window.location.href = "tel:+916389202030";
  };

  const openEmail = () => {
    window.location.href =
      "mailto:contact@citywitty.com?subject=Support Request";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">Need Help?</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={openCall}
              className="w-full justify-start"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openWhatsApp}
              className="w-full justify-start"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openEmail}
              className="w-full justify-start"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full h-14 w-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
