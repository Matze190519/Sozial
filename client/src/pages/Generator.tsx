import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Sparkles, Copy, Send, RefreshCw, ChevronDown,
  Instagram, Globe, Flame, Hash, Image, Video,
  CheckCircle, Loader2, TrendingUp, BookOpen, Star,
  ArrowRight, Eye, ThumbsUp, Rocket, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "tiktok", label: "TikTok", icon: "🎵" },
  { id: "facebook", label: "Facebook", icon: "📘" },
  { id: "linkedin", label: "LinkedIn", icon: "💼" },
  { id: "twitter", label: "X / Twitter", icon: "𝕏" },
  { id: "youtube", label: "YouTube", icon: "▶️" },
  { id: "pinterest", label: "Pinterest", icon: "📌" },
  { id: "threads", label: "Threads", icon: "🧵" },
  { id: "snapchat", label: "Snapchat", icon: "👻" },
];

const CONTENT_TYPES = [
  { id: "post", label: "Post", icon: "📝" },
  { id: "reel", label: "Reel / Short", icon: "🎬" },
  { id: "story", label: "Story", icon: "⭕" },
  { id: "carousel", label: "Carousel", icon: "🔄" },
];

const NICHES = [
  "Business & Erfolg", "Gesundheit & Wellness", "Beauty & Lifestyle",
  "Reisen & Freiheit", "Finanzen & Passiveinkommen", "Ernährung & Sport",
  "Familie & Work-Life-Balance", "Persönlichkeitsentwicklung"
];

const PILLARS = [
  "Produkte vorstellen", "Business Opportunity", "Lifestyle & Freiheit",
  "Kundenergebnisse", "Behind the Scenes", "Motivation & Mindset",
  "Education & Tipps", "Community & Team"
];

export default function Generator() {
  const [selectedPlatforms, setSelectedPlatforms] = useState(["instagram"]);
  const [contentType, setContentType] = useState("post");
  const [niche, setNiche] = useState(NICHES[0]);
  const [pillar, setPillar] = useState(PILLARS[0]);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("motivating");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [copied, setCopied] = useState(false);
  const [submittedForApproval, setSubmittedForApproval] = useState(false);
  const [publishedPlatforms, setPublishedPlatforms] = useState([]);

  const { data: blotatoStatus } = trpc.blotato.status.useQuery();

  const publishMutation = trpc.blotato.publishPost.useMutation({
    onSuccess: (data) => {
      setPublishedPlatforms(data.results.filter(r => r.success).map(r => r.platform));
    }
  });

  const generateMutation = trpc.content.generate.useMutation({
    onSuccess: (data) => {
      setGeneratedContent(data);
      setSubmittedForApproval(false);
      setPublishedPlatforms([]);
    }
  });

  const submitMutation = trpc.content.submitForApproval.useMutation({
    onSuccess: () => setSubmittedForApproval(true)
  });

  const { data: trendItems } = trpc.trends.listItems.useQuery({ limit: 5, minViralScore: 70 });

  const togglePlatform = (id) => {
    setSelectedPlatforms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (selectedPlatforms.length === 0) return;
    generateMutation.mutate({
      platforms: selectedPlatforms,
      contentType,
      niche,
      contentPillar: pillar,
      topic: topic || undefined,
      tone,
    });
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    const text = `${generatedContent.hook}\n\n${generatedContent.caption}\n\n${generatedContent.cta}\n\n${generatedContent.hashtags}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gold-gradient-text">Content Generator</h1>
            <p className="text-sm text-muted-foreground">KI-powered, sofort einsatzbereit für alle Plattformen</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
          <div className="gold-card p-5 rounded-xl space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Plattformen</h3>
            <div className="grid grid-cols-3 gap-2">
              {PLATFORMS.map(p => (
                <button key={p.id} onClick={() => togglePlatform(p.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${selectedPlatforms.includes(p.id) ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400" : "bg-white/5 border border-white/10 text-muted-foreground hover:border-white/20"}`}>
                  <span>{p.icon}</span><span className="truncate">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="gold-card p-5 rounded-xl space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Content-Typ</h3>
            <div className="grid grid-cols-4 gap-2">
              {CONTENT_TYPES.map(t => (
                <button key={t.id} onClick={() => setContentType(t.id)} className={`flex flex-col items-center gap-1 p-3 rounded-lg text-xs font-medium transition-all ${contentType === t.id ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400" : "bg-white/5 border border-white/10 text-muted-foreground hover:border-white/20"}`}>
                  <span className="text-base">{t.icon}</span><span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="gold-card p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Thema & Ausrichtung</h3>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Nische</label>
              <select value={niche} onChange={e => setNiche(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:border-yellow-500/50 focus:outline-none">
                {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Content Pillar</label>
              <select value={pillar} onChange={e => setPillar(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:border-yellow-500/50 focus:outline-none">
                {PILLARS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Spezifisches Thema (optional)</label>
              <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="z.B. Collagen-Produkt..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-yellow-500/50 focus:outline-none" />
            </div>
          </div>

          <div className="gold-card p-5 rounded-xl space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Ton / Stil</h3>
            <div className="grid grid-cols-2 gap-2">
              {["motivating", "informative", "storytelling", "humorous"].map(t => (
                <button key={t} onClick={() => setTone(t)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize ${tone === t ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400" : "bg-white/5 border border-white/10 text-muted-foreground hover:border-white/20"}`}>
                  {{ motivating: "🔥 Motivierend", informative: "📚 Informativ", storytelling: "📖 Storytelling", humorous: "😄 Humorvoll" }[t]}
                </button>
              ))}
            </div>
          </div>

          {trendItems && trendItems.length > 0 && (
            <div className="gold-card p-5 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <h3 className="text-sm font-semibold">Trend als Thema nutzen</h3>
              </div>
              <div className="space-y-2">
                {trendItems.slice(0, 3).map(trend => (
                  <button key={trend.id} onClick={() => setTopic(trend.title)} className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{trend.title}</p>
                      <p className="text-[10px] text-orange-400">{trend.viralPotential}% viral</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleGenerate} disabled={generateMutation.isPending || selectedPlatforms.length === 0} className="w-full gold-button h-12 text-base font-semibold gap-2">
            {generateMutation.isPending ? (<><Loader2 className="w-5 h-5 animate-spin" />KI generiert...</>) : (<><Sparkles className="w-5 h-5" />Content generieren</>)}
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <AnimatePresence mode="wait">
            {!generatedContent ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="gold-card rounded-xl h-full min-h-[500px] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/20 flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-yellow-400/40" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Bereit zum Generieren</h3>
                <p className="text-sm text-muted-foreground max-w-xs">Wähle deine Plattformen und klicke auf Content generieren — die KI erstellt dir sofort viralen Content.</p>
              </motion.div>
            ) : (
              <motion.div key="content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="gold-card p-5 rounded-xl space-y-4 border border-yellow-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-400">Content erstellt!</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleGenerate} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"><RefreshCw className="w-3.5 h-3.5" /></button>
                      <button onClick={handleCopy} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${copied ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/5 hover:bg-white/10 text-muted-foreground"}`}>
                        <Copy className="w-3.5 h-3.5" />{copied ? "Kopiert!" : "Kopieren"}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-yellow-400 font-semibold uppercase tracking-wider"><Flame className="w-3.5 h-3.5" /> Hook</div>
                    <p className="text-sm font-semibold text-foreground bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">{generatedContent.hook}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold uppercase tracking-wider"><Eye className="w-3.5 h-3.5" /> Caption</div>
                    <p className="text-sm text-foreground/90 bg-white/5 rounded-lg p-3 leading-relaxed whitespace-pre-wrap">{generatedContent.caption}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold uppercase tracking-wider"><ArrowRight className="w-3.5 h-3.5" /> Call to Action</div>
                    <p className="text-sm text-foreground/90 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">{generatedContent.cta}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-purple-400 font-semibold uppercase tracking-wider"><Hash className="w-3.5 h-3.5" /> Hashtags</div>
                    <p className="text-xs text-purple-300/80 bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 leading-relaxed">{generatedContent.hashtags}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {generatedContent.postId && !submittedForApproval && (
                    <Button onClick={() => generatedContent.postId && submitMutation.mutate({ postId: generatedContent.postId })} disabled={submitMutation.isPending} variant="outline" className="gap-2 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
                      {submitMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Zur Freigabe
                    </Button>
                  )}
                  {submittedForApproval && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />Eingereicht!
                    </div>
                  )}
                  <Button onClick={handleCopy} className={`gap-2 ${copied ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "gold-button"}`}>
                    <Copy className="w-4 h-4" />{copied ? "Kopiert!" : "Alles kopieren"}
                  </Button>
                </div>

                {blotatoStatus?.hasApiKey && generatedContent?.postId && (
                  <div className="space-y-2">
                    {publishedPlatforms.length === 0 ? (
                      <Button
                        onClick={() => generatedContent.postId && publishMutation.mutate({ postId: generatedContent.postId, platforms: selectedPlatforms })}
                        disabled={publishMutation.isPending}
                        className="w-full gold-button gap-2 h-10"
                      >
                        {publishMutation.isPending
                          ? <><Loader2 className="w-4 h-4 animate-spin" /> Wird gepostet...</>
                          : <><Rocket className="w-4 h-4" /> Jetzt direkt posten ({blotatoStatus.platformCount} Plattformen)</>
                        }
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />Gepostet auf {publishedPlatforms.length} Plattformen! 🚀
                      </div>
                    )}
                  </div>
                )}

                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-300">Nach der Admin-Freigabe landet dieser Post automatisch in der öffentlichen Library — dein Team kann ihn direkt kopieren.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
