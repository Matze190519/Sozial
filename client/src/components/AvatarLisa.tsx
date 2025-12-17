import { useState, useRef, useEffect } from 'react';
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskType,
  StartAvatarRequest,
} from '@heygen/streaming-avatar';

export default function AvatarLisa() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);

  async function fetchAccessToken() {
    try {
      const response = await fetch('/api/get-access-token', {
        method: 'POST',
      });
      const token = await response.text();
      return token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  }

  async function startSession() {
    setIsLoading(true);
    try {
      const token = await fetchAccessToken();
      
      // Initialize Avatar
      avatar.current = new StreamingAvatar({ token });
      
      // Setup event listeners
      avatar.current.on(StreamingEvents.STREAM_READY, (event: any) => {
        console.log('Stream ready:', event.detail);
        setStream(event.detail);
      });
      
      avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        console.log('Stream disconnected');
        endSession();
      });
      
      avatar.current.on(StreamingEvents.AVATAR_START_TALKING, () => {
        console.log('Avatar started talking');
      });
      
      avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, () => {
        console.log('Avatar stopped talking');
      });

      // Start avatar with config
      const config: StartAvatarRequest = {
        quality: AvatarQuality.High,
        avatarName: 'Katya_ProfessionalLook2_public',
        knowledgeId: '762753739eb4ac6a1e76b8b6c35ed20',
        language: 'en',
        voice: {
          voiceId: 'de-DE-Wavenet-F',
          rate: 1.0,
        },
      };

      await avatar.current.createStartAvatar(config);
      
    } catch (error) {
      console.error('Error starting session:', error);
      alert('Fehler beim Starten: ' + error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSpeak() {
    if (!avatar.current || !text.trim()) return;
    
    setIsSending(true);
    try {
      await avatar.current.speak({
        text: text,
        taskType: TaskType.TALK,
        taskMode: 'sync',
      });
      setText('');
    } catch (error) {
      console.error('Error speaking:', error);
      alert('Fehler beim Senden: ' + error);
    } finally {
      setIsSending(false);
    }
  }

  async function endSession() {
    if (!avatar.current) return;
    
    try {
      await avatar.current.stopAvatar();
      setStream(null);
      avatar.current = null;
    } catch (error) {
      console.error('Error ending session:', error);
    }
  }

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
      };
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      endSession();
    };
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          startSession();
        }}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
        aria-label="Chat mit Lisa"
      >
        <svg
          className="w-8 h-8 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[500px] h-[700px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-2xl">👩</span>
          </div>
          <div>
            <h3 className="text-white font-bold">Lisa</h3>
            <p className="text-white/80 text-sm">Deine LR Assistentin</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsOpen(false);
            endSession();
          }}
          className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Video Container */}
      <div className="flex-1 bg-gray-900 relative">
        {stream ? (
          <video
            ref={mediaStream}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isLoading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mx-auto mb-4"></div>
                <p className="text-white text-lg">Lisa wird geladen...</p>
                <p className="text-white/60 text-sm mt-2">Das kann 10-20 Sekunden dauern</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-4">
                  <span className="text-5xl">👩</span>
                </div>
                <p className="text-white">Starte Session...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="mb-2 text-center">
          {!stream && !isLoading && (
            <p className="text-sm text-gray-500">Warte auf Video-Stream...</p>
          )}
          {stream && (
            <p className="text-sm text-green-600">✓ Lisa ist bereit!</p>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isSending && stream && handleSpeak()}
            placeholder="Frage Lisa etwas..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            disabled={!stream || isSending}
          />
          <button
            onClick={handleSpeak}
            disabled={!stream || isSending || !text.trim()}
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSending ? '...' : '→'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Stelle Lisa eine Frage über LR Lifestyle!
        </p>
      </div>
    </div>
  );
}
