import { MessageCircle } from "lucide-react";

export default function WhatsAppWidget() {
  const phoneNumber = "491715060008"; // Format: Country code + number without + or 00
  const message = encodeURIComponent("Hallo, ich habe eine Frage zu Lina Voice.");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="font-bold hidden group-hover:inline-block transition-all duration-300">
        WhatsApp Support
      </span>
    </a>
  );
}
