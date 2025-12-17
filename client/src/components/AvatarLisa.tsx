import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Mic, Send } from 'lucide-react';
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskType,
} from '@heygen/streaming-avatar';

export function AvatarLisa() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'lisa'; text: string }>>([]);
  const [inputText, setInputText] = useState('');
  const avatarRef = useRef<StreamingAvatar | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize Avatar
  const initializeAvatar = async () => {
    if (avatarRef.current) return;

    setIsLoading(true);
    try {
      // Create session token
      const response = await fetch('https://api.heygen.com/v1/streaming.create_token', {
        method: 'POST',
        headers: {
          'x-api-key': 'YmFlMjg2MWQxMzQxNDFlZThkOTVhYjlhMmI4MWRjODEtMTc0OTkxMTYzNw==',
        },
      });
      const data = await response.json();
      const token = data.data.token;

      // Initialize avatar
      const avatar = new StreamingAvatar({ token });
      avatarRef.current = avatar;

      // Event listeners
      avatar.on(StreamingEvents.STREAM_READY, (event: any) => {
        if (videoRef.current && event.stream) {
          videoRef.current.srcObject = event.stream;
          videoRef.current.play();
        }
      });

      avatar.on(StreamingEvents.AVATAR_TALKING_MESSAGE, (message: any) => {
        setMessages((prev) => [...prev, { role: 'lisa', text: message }]);
      });

      // Start avatar session
      const isMobile = window.innerWidth < 768;
      await avatar.createStartAvatar({
        quality: isMobile ? AvatarQuality.Medium : AvatarQuality.High,
        avatarName: 'Katya_Black_Suit_public',
        knowledgeId: 'demo-1', // TODO: Replace with real Knowledge Base ID
        voice: {
          voiceId: 'de-DE-KatjaNeural',
          rate: 1.0,
        },
        language: 'de',
        disableIdleTimeout: false,
      });

      // Start voice chat
      await avatar.startVoiceChat();

      // Welcome message
      await avatar.speak({
        text: 'Hallo! Ich bin Lisa, deine Onboarding-Expertin im LR Lifestyle Team. Ich helfe dir bei deinen ersten Schritten und beantworte alle Fragen rund um dein LR Business. Was kann ich für dich tun?',
        task_type: TaskType.REPEAT,
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Avatar initialization failed:', error);
      setIsLoading(false);
      alert('Lisa ist gerade nicht verfügbar. Bitte versuche es später noch einmal.');
    }
  };

  // Send message
  const sendMessage = async (text: string) => {
    if (!text.trim() || !avatarRef.current) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInputText('');

    // Send to avatar
    try {
      await avatarRef.current.speak({
        text,
        task_type: TaskType.TALK,
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Toggle voice input
  const toggleVoiceInput = async () => {
    if (!avatarRef.current) return;

    if (isListening) {
      await avatarRef.current.stopListening();
      setIsListening(false);
    } else {
      await avatarRef.current.startListening();
      setIsListening(true);
    }
  };

  // Open chat
  const openChat = () => {
    setIsOpen(true);
    if (!avatarRef.current) {
      initializeAvatar();
    }
  };

  // Close chat
  const closeChat = async () => {
    setIsOpen(false);
    if (avatarRef.current) {
      await avatarRef.current.stopAvatar();
      avatarRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (avatarRef.current) {
        avatarRef.current.stopAvatar();
      }
    };
  }, []);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] shadow-lg hover:shadow-[0_0_30px_rgba(191,149,63,0.5)] transition-all duration-300 flex items-center justify-center group"
          aria-label="Chat mit Lisa öffnen"
        >
          <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-[#BF953F] animate-ping opacity-20"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 flex flex-col max-md:w-[calc(100vw-2rem)] max-md:h-[calc(100vh-8rem)]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Lisa</h3>
                <p className="text-white/60 text-sm">Onboarding-Expertin</p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Chat schließen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Avatar Video */}
          <div className="w-full h-64 bg-black/50 flex items-center justify-center relative">
            {isLoading ? (
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#BF953F] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-white/60 text-sm">Lisa wird geladen...</p>
              </div>
            ) : (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
              />
            )}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] text-white'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleVoiceInput}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] animate-pulse'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                aria-label="Spracheingabe"
              >
                <Mic className="w-5 h-5 text-white" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                placeholder="Schreib deine Frage..."
                className="flex-1 bg-white/10 text-white placeholder-white/40 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#BF953F]"
              />
              <button
                onClick={() => sendMessage(inputText)}
                className="w-10 h-10 rounded-full bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#AA771C] flex items-center justify-center hover:shadow-[0_0_20px_rgba(191,149,63,0.5)] transition-all"
                aria-label="Nachricht senden"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
