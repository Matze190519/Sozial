import { useState, useRef, useEffect } from 'react';
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskType,
  VoiceEmotion,
} from '@heygen/streaming-avatar';

interface AvatarLisaProps {
  // Optional props for customization
}

export default function AvatarLisa({}: AvatarLisaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [debug, setDebug] = useState<string>();
  const [text, setText] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);

  async function fetchAccessToken() {
    try {
      const response = await fetch('/api/get-access-token', {
        method: 'POST',
      });
      const token = await response.text();
      console.log('Access Token:', token);
      return token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  }

  async function startSession() {
    setIsLoadingSession(true);
    try {
      const newToken = await fetchAccessToken();
      avatar.current = new StreamingAvatar({ token: newToken });
      
      // Setup event listeners
      avatar.current.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
        console.log('Avatar started talking', e);
      });
      
      avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
        console.log('Avatar stopped talking', e);
      });
      
      avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        console.log('Stream disconnected');
        endSession();
      });
      
      avatar.current.on(StreamingEvents.STREAM_READY, (event) => {
        console.log('Stream ready:', event.detail);
        setStream(event.detail);
      });

      // Start avatar with Knowledge Base
      const isMobile = window.innerWidth < 768;
      await avatar.current.createStartAvatar({
        quality: isMobile ? AvatarQuality.Medium : AvatarQuality.High,
        avatarName: 'Katya_ProfessionalLook2_public',
        knowledgeId: '762753739eb4ac6a1e76b8b6c35ed20',
        language: 'de', // DEUTSCH!
        voice: {
          voiceId: 'de-DE-Wavenet-F', // Deutsche Stimme (Google Wavenet)
          rate: 1.0,
        },
        disableIdleTimeout: false,
      });

      setDebug('Session started successfully');
    } catch (error) {
      console.error('Error starting session:', error);
      setDebug(`Error: ${error}`);
    } finally {
      setIsLoadingSession(false);
    }
  }

  async function handleSpeak() {
    if (!avatar.current || !text.trim()) {
      setDebug('Please enter text and start session');
      return;
    }
    
    setIsLoadingRepeat(true);
    try {
      await avatar.current.speak({
        text: text,
        taskType: TaskType.TALK,
        taskMode: 'sync',
      });
      
      setChatHistory(prev => [...prev, { role: 'user', content: text }]);
      setText('');
    } catch (error) {
      console.error('Error speaking:', error);
      setDebug(`Error: ${error}`);
    } finally {
      setIsLoadingRepeat(false);
    }
  }

  async function endSession() {
    if (!avatar.current) return;
    
    try {
      await avatar.current.stopAvatar();
      setStream(undefined);
    } catch (error) {
      console.error('Error ending session:', error);
    }
  }

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
        setDebug('Playing stream');
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
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
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
            {isLoadingSession ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                <p className="text-white">Lisa wird geladen...</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👩</span>
                </div>
                <p className="text-white">Starte Session...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {chatHistory.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="mb-2">👋 Hallo! Ich bin Lisa.</p>
            <p className="text-sm">Stelle mir eine Frage über LR Lifestyle!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSpeak()}
            placeholder="Frage Lisa etwas..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            disabled={!stream || isLoadingRepeat}
          />
          <button
            onClick={handleSpeak}
            disabled={!stream || isLoadingRepeat || !text.trim()}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoadingRepeat ? '...' : '→'}
          </button>
        </div>
        {debug && (
          <p className="text-xs text-gray-500 mt-2">{debug}</p>
        )}
      </div>
    </div>
  );
}
