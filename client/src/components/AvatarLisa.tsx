import { useState, useRef, useEffect } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import * as LivekitClient from 'livekit-client';

export default function AvatarLisa() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const roomRef = useRef<LivekitClient.Room | null>(null);
  const sessionInfoRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const updateStatus = (msg: string) => {
    console.log('[Avatar Lisa]', msg);
    setStatus(msg);
  };

  const startSession = async () => {
    try {
      setIsLoading(true);
      updateStatus('Erstelle Session...');

      // 1. Get Access Token from Backend
      const tokenRes = await fetch('/api/get-access-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!tokenRes.ok) {
        throw new Error('Failed to get access token');
      }

      const tokenData = await tokenRes.json();
      const sessionToken = tokenData.token;

      // 2. Create New Session (streaming.new API)
      const newSessionRes = await fetch('https://api.heygen.com/v1/streaming.new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          quality: 'high',
          avatar_name: 'Katya_ProfessionalLook2_public',
          knowledge_id: '762753739eb4ac6a1e76b8b6c35ed20',
          voice: {
            voice_id: 'f6d7e19df7364577b0025bda1f4ef842', // Gentle Greta
            rate: 1.0,
          },
          version: 'v2',
          video_encoding: 'H264',
        }),
      });

      if (!newSessionRes.ok) {
        const errorData = await newSessionRes.json();
        throw new Error(`Session creation failed: ${errorData.message || newSessionRes.statusText}`);
      }

      const sessionData = await newSessionRes.json();
      sessionInfoRef.current = sessionData.data;

      updateStatus('Session erstellt, verbinde LiveKit...');

      // 3. Create LiveKit Room
      const room = new LivekitClient.Room({
        adaptiveStream: true,
        dynacast: true,
        videoCaptureDefaults: {
          resolution: LivekitClient.VideoPresets.h720.resolution,
        },
      });

      roomRef.current = room;

      // 4. Handle Room Events
      room.on(LivekitClient.RoomEvent.Connected, () => {
        updateStatus('✅ LiveKit verbunden');
      });

      room.on(LivekitClient.RoomEvent.Disconnected, (reason) => {
        updateStatus(`❌ LiveKit getrennt: ${reason}`);
      });

      room.on(LivekitClient.RoomEvent.Reconnecting, () => {
        updateStatus('⚠️ Verbinde neu...');
      });

      room.on(LivekitClient.RoomEvent.Reconnected, () => {
        updateStatus('🔁 Neu verbunden');
      });

      // 5. Handle Media Streams (WICHTIG!)
      mediaStreamRef.current = new MediaStream();
      
      room.on(LivekitClient.RoomEvent.TrackSubscribed, (track: LivekitClient.RemoteTrack) => {
        console.log('[Track Subscribed]', track.kind);
        
        if (track.kind === 'video' || track.kind === 'audio') {
          const mediaTrack = track.mediaStreamTrack;
          if (mediaTrack && mediaStreamRef.current) {
            mediaStreamRef.current.addTrack(mediaTrack);
            
            // Setze srcObject NUR wenn BEIDE Tracks da sind
            if (
              mediaStreamRef.current.getVideoTracks().length > 0 &&
              mediaStreamRef.current.getAudioTracks().length > 0
            ) {
              if (videoRef.current) {
                videoRef.current.srcObject = mediaStreamRef.current;
                videoRef.current.autoplay = true;
                videoRef.current.playsInline = true;
                updateStatus('🎬 Video-Stream bereit!');
                setIsLoading(false);
              }
            }
          }
        }
      });

      room.on(LivekitClient.RoomEvent.TrackUnsubscribed, (track: LivekitClient.RemoteTrack) => {
        const mediaTrack = track.mediaStreamTrack;
        if (mediaTrack && mediaStreamRef.current) {
          mediaStreamRef.current.removeTrack(mediaTrack);
        }
      });

      // 6. Prepare Connection
      await room.prepareConnection(
        sessionInfoRef.current.url,
        sessionInfoRef.current.access_token
      );

      updateStatus('Verbindung vorbereitet, starte Stream...');

      // 7. Start Streaming
      const startRes = await fetch('https://api.heygen.com/v1/streaming.start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          session_id: sessionInfoRef.current.session_id,
        }),
      });

      if (!startRes.ok) {
        throw new Error('Failed to start streaming');
      }

      // 8. Connect to Room
      await room.connect(
        sessionInfoRef.current.url,
        sessionInfoRef.current.access_token
      );

      updateStatus('✅ Verbunden! Warte auf Video...');

    } catch (error: any) {
      console.error('[Avatar Lisa Error]', error);
      updateStatus(`❌ Fehler: ${error.message}`);
      setIsLoading(false);
    }
  };

  const stopSession = async () => {
    try {
      if (sessionInfoRef.current) {
        // Get token again for stop request
        const tokenRes = await fetch('/api/get-access-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
          
          await fetch('https://api.heygen.com/v1/streaming.stop', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokenData.token}`,
            },
            body: JSON.stringify({
              session_id: sessionInfoRef.current.session_id,
            }),
          });
        }
      }

      if (roomRef.current) {
        roomRef.current.disconnect();
        roomRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      mediaStreamRef.current = null;
      sessionInfoRef.current = null;
      setIsLoading(false);
      updateStatus('Session beendet');

    } catch (error: any) {
      console.error('[Stop Error]', error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !sessionInfoRef.current) return;

    try {
      const tokenRes = await fetch('/api/get-access-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!tokenRes.ok) return;

      const tokenData = await tokenRes.json();

      await fetch('https://api.heygen.com/v1/streaming.task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({
          session_id: sessionInfoRef.current.session_id,
          text: message,
          task_type: 'talk',
        }),
      });

      setMessage('');
    } catch (error: any) {
      console.error('[Send Message Error]', error);
    }
  };

  useEffect(() => {
    if (isOpen && !sessionInfoRef.current) {
      startSession();
    }

    return () => {
      if (sessionInfoRef.current) {
        stopSession();
      }
    };
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-3xl z-50"
        aria-label="Chat mit Lisa"
      >
        👩
      </button>
    );
  }

  return (
    <div
      className={`fixed ${
        isFullscreen
          ? 'inset-0'
          : 'bottom-6 right-6 w-96 h-[600px]'
      } bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-xl">
            👩
          </div>
          <div>
            <h3 className="font-bold text-white">Lisa</h3>
            <p className="text-xs text-gray-400">Deine LR Assistentin</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5 text-white" />
            ) : (
              <Maximize2 className="w-5 h-5 text-white" />
            )}
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              stopSession();
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Video Container */}
      <div className="flex-1 relative bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
        />
        
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white text-sm">{status}</p>
          </div>
        )}

        {status && !isLoading && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
            <p className="text-white text-xs">{status}</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-yellow-500/20 bg-slate-900/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Frage Lisa etwas..."
            className="flex-1 px-4 py-2 bg-white/10 border border-yellow-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            disabled={isLoading || !sessionInfoRef.current}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !sessionInfoRef.current || !message.trim()}
            className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            →
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Stelle Lisa eine Frage über LR Lifestyle!
        </p>
      </div>
    </div>
  );
}
