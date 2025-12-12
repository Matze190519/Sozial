import { Shield, Server, Lock } from 'lucide-react';

export default function TrustBar() {
  return (
    <div className="w-full bg-black/30 backdrop-blur-sm border-b border-white/5 py-3">
      <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 text-xs md:text-sm text-gray-400 font-medium tracking-wide uppercase">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-neon-cyan" />
          <span>DSGVO-konform (Details: Datenschutz)</span>
        </div>
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-electric-purple" />
          <span>Implementierung über IT-Partner</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-neon-pink" />
          <span>End-to-End Verschlüsselung</span>
        </div>
      </div>
    </div>
  );
}
