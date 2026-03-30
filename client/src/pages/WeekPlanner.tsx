import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Sparkles, Zap, Send, CheckCircle, Loader2,
  ChevronDown, ChevronUp, Copy, RefreshCw, Clock,
  Instagram, LayoutGrid, Play, BookOpen, Flame, ArrowRight,
  CalendarCheck, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

const TYPE_ICONS = {
  post: "📝", reel: "🎬", story: "⭕", carousel: "🔄"
};

const TYPE_COLORS = {
  post: "blue", reel: "pink", story: "orange", carousel: "purple"
};

const DAY_COLORS = [
  "from-yellow-500/20 to-amber-500/10 border-yellow-500/30",
  "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
  "from-purple-500/20 to-violet-500/10 border-purple-500/30",
  "from-emerald-500/20 to-green-500/10 border-emerald-500/30",
  "from-rose-500/20 to-pink-500/10 border-rose-500/30",
  "from-orange-500/20 to-amber-500/10 border-orange-500/30",
  "from-indigo-500/20 to-blue-500/10 border-indigo-500/30",
];

function getTodayISO() {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay() + 1);
  return d.toISOString().split("T")[0];
}

export default function WeekPlanner() {
  const [selectedPlatforms, setSelectedPlatforms] = useState(["instagram", "tiktok", "facebook"]);
  const [startDate, setStartDate] = useState(getTodayISO());
  const [postsPerDay, setPostsPerDay] = useState(1);
  const [topic, setTopic] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [expandedDay, setExpandedDay] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [copiedId, setCopiedId] = useState(null);

  const generateMutation = trpc.weekplan.generate.useMutation({
    onSuccess: (data) => {
      setGeneratedPlan(data.posts);
      setExpandedDay(0);
      setSubmitted(false);
      setScheduledCount(0);
    }
  });

  const submitMutation = trpc.weekplan.submitWeekForApproval.useMutation({
    onSuccess: () => setSubmitted(true)
  });

  const publishMutation = trpc.weekplan.publishWeek.useMutation({
    onSuccess: (data) => setScheduledCount(data.scheduled)
  });

  const { data: blotatoStatus } = trpc.blotato.status.useQuery();

  const togglePlatform = (id) => {
    setSelectedPlatforms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (selectedPlatforms.length === 0) return;
    generateMutation.mutate({ platforms: selectedPlatforms, startDate, postsPerDay, topic: topic || "LR Lifestyle" });
  };

  const handleCopyPost = (post) => {
    navigator.clipboard.writeText(`${post.hook}\n\n${post.caption}\n\n${post.cta}\n\n${post.hashtags}`);
    setCopiedId(post.postId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmitAll = () => {
    if (!generatedPlan) return;
    submitMutation.mutate({ postIds: generatedPlan.map(p => p.postId) });
  };

  const handlePublishAll = () => {
    if (!generatedPlan) return;
    publishMutation.mutate({ posts: generatedPlan.map(p => ({ postId: p.postId, scheduledDate: p.scheduledDate, platforms: selectedPlatforms })) });
  };

  const postsByDay = generatedPlan
    ? Array.from({ length: 7 }, (_, i) => generatedPlan.filter(p => p.dayIndex === i))
    : [];

  const totalPosts = generatedPlan?.length ?? 0;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gold-gradient-text">Wochen-Content-Planer</h1>
            <p className="text-sm text-muted-foreground">7 Tage Content auf einen Klick automatisch geplant und gepostet</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="gold-card rounded-xl p-6 space-y-5">
        <h2 className="font-semibold text-base flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          Woche konfigurieren
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Start der Woche</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-yellow-500/50 focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Posts pro Tag</label>
            <div className="flex gap-2">
              {[1, 2, 3].map(n => (
                <button key={n} onClick={() => setPostsPerDay(n)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${postsPerDay === n ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400" : "bg-white/5 border border-white/10 text-muted-foreground"}`}>{n}x</button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Fokus-Thema</label>
            <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="z.B. LR Collagen..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus:border-yellow-500/50 focus:outline-none" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Plattformen</label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map(p => (
              <button key={p.id} onClick={() => togglePlatform(p.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedPlatforms.includes(p.id) ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400" : "bg-white/5 border border-white/10 text-muted-foreground"}`}><span>{p.icon}</span><span>{p.label}</span></button>
            ))}
          </div>
        </div>
        <Button onClick={handleGenerate} disabled={generateMutation.isPending || selectedPlatforms.length === 0} className="gold-button w-full h-12 text-base font-bold gap-2">
          {generateMutation.isPending ? (<><Loader2 className="w-5 h-5 animate-spin" />KI erstellt Posts...</>) : (<><Zap className="w-5 h-5" />{postsPerDay * 7} Posts für 7 Tage generieren</>)}
        </Button>
      </motion.div>

      <AnimatePresence>
        {generatedPlan && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="gold-card rounded-xl p-5 border border-yellow-500/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-emerald-400" /></div>
                  <div>
                    <p className="font-bold text-foreground">{totalPosts} Posts generiert!</p>
                    <p className="text-xs text-muted-foreground">7 Tage x {postsPerDay} Posts für {selectedPlatforms.length} Plattformen</p>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Button onClick={handleGenerate} variant="outline" size="sm" className="gap-2 border-white/20" disabled={generateMutation.isPending}><RefreshCw className="w-3.5 h-3.5" />Neu generieren</Button>
                  {!submitted ? (
                    <Button onClick={handleSubmitAll} variant="outline" size="sm" className="gap-2 border-yellow-500/30 text-yellow-400" disabled={submitMutation.isPending}>{submitMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}Alle zur Freigabe</Button>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs"><CheckCircle className="w-3.5 h-3.5" />{totalPosts}x eingereicht!</div>
                  )}
                  {blotatoStatus?.hasApiKey ? (
                    scheduledCount === 0 ? (
                      <Button onClick={handlePublishAll} className="gold-button gap-2" size="sm" disabled={publishMutation.isPending}>{publishMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Rocket className="w-3.5 h-3.5" />}Direkt planen via Blotato</Button>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs"><CalendarCheck className="w-3.5 h-3.5" />{scheduledCount}x geplant!</div>
                    )
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-muted-foreground"><Clock className="w-3.5 h-3.5" />Blotato Key in Einstellungen</div>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {postsByDay.map((dayPosts, dayIdx) => {
                if (dayPosts.length === 0) return null;
                const isExpanded = expandedDay === dayIdx;
                const dayName = dayPosts[0]?.dayName ?? `Tag ${dayIdx + 1}`;
                return (
                  <motion.div key={dayIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: dayIdx * 0.05 }} className={`rounded-xl border bg-gradient-to-r ${DAY_COLORS[dayIdx]} overflow-hidden`}>
                    <button className="w-full flex items-center justify-between p-4" onClick={() => setExpandedDay(isExpanded ? null : dayIdx)}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold">{dayIdx + 1}</div>
                        <p className="font-semibold text-sm">{dayName}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">{dayPosts.map(post => <span key={post.postId} className="text-base">{TYPE_ICONS[post.contentType] ?? "\uD83D\uDCDD"}</span>)}</div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                          <div className="px-4 pb-4 space-y-4">
                            {dayPosts.map((post) => (
                              <div key={post.postId} className="bg-black/20 rounded-xl p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <p className="text-xs font-semibold">{post.contentPillar}</p>
                                  <div className="flex items-center gap-2">
                                    <div className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-medium">{post.qualityScore}% Score</div>
                                    <button onClick={() => handleCopyPost(post)} className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-[10px] text-muted-foreground hover:text-foreground"><Copy className="w-3 h-3" />{copiedId === post.postId ? "Kopiert!" : "Kopieren"}</button>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-[10px] text-yellow-400 font-semibold uppercase mb-1">Hook</p>
                                  <p className="text-xs font-medium bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2">{post.hook}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-blue-400 font-semibold uppercase mb-1">Caption</p>
                                  <p className="text-xs bg-white/5 rounded-lg p-2 line-clamp-4">{post.caption}</p>
                                </div>
                                <p className="text-[10px] text-purple-300/70 truncate">{post.hashtags.split(" ").slice(0, 6).join(" ")}...</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!generatedPlan && !generateMutation.isPending && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="gold-card rounded-xl p-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/5 border border-yellow-500/20 flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-yellow-400/40" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Bereit für deine Woche!</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">Wähle deine Plattformen, gib ein Thema ein und lass die KI deinen kompletten Wochen-Content-Plan erstellen in Sekunden.</p>
        </motion.div>
      )}
    </div>
  );
  }
