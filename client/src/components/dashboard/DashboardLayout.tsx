import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import {
  LayoutDashboard, Zap, BookOpen, CheckCircle, TrendingUp,
  Settings, Users, Calendar, BarChart3, Hash, Clock,
  Flame, Eye, Layers, Star, ChevronLeft, ChevronRight,
  LogOut, Crown, Bell, Menu, X, CalendarRange
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: "/generator", label: "Content Generator", icon: <Zap className="w-4 h-4" />, badge: "KI" },
  { href: "/weekplanner", label: "Wochen-Planer", icon: <CalendarRange className="w-4 h-4" />, badge: "NEU" },
  { href: "/library", label: "Content Library", icon: <BookOpen className="w-4 h-4" /> },
  { href: "/trends", label: "Trend Scanner", icon: <TrendingUp className="w-4 h-4" /> },
  { href: "/hashtags", label: "Hashtag Engine", icon: <Hash className="w-4 h-4" /> },
  { href: "/calendar", label: "Content Kalender", icon: <Calendar className="w-4 h-4" /> },
  { href: "/queue", label: "Post Queue", icon: <Clock className="w-4 h-4" /> },
  { href: "/analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
  { href: "/creator-spy", label: "Creator Spy", icon: <Eye className="w-4 h-4" /> },
  { href: "/templates", label: "Templates", icon: <Layers className="w-4 h-4" /> },
  { href: "/approval", label: "Freigabe-Queue", icon: <CheckCircle className="w-4 h-4" />, adminOnly: true },
  { href: "/team", label: "Mein Team", icon: <Users className="w-4 h-4" />, adminOnly: true },
];

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { data: user } = trpc.auth.me.useQuery();
  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => { window.location.href = "/login"; }
  });

  const isAdmin = user?.role === "admin";
  const filteredNav = NAV_ITEMS.filter(item => !item.adminOnly || isAdmin);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-3 p-4 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shrink-0">
          <Star className="w-4 h-4 text-black" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden">
              <p className="font-bold text-sm gold-gradient-text whitespace-nowrap">LR Content Hub</p>
              <p className="text-[10px] text-muted-foreground whitespace-nowrap">Social Media System</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        {filteredNav.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              <motion.div
                whileHover={{ x: 2 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all relative group
                  ${isActive
                    ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/10 text-yellow-400 border border-yellow-500/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
              >
                <span className={isActive ? "text-yellow-400" : "text-muted-foreground group-hover:text-foreground"}>
                  {item.icon}
                </span>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-medium whitespace-nowrap flex-1">
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!collapsed && item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div layoutId="activeIndicator" className="absolute right-2 w-1.5 h-1.5 rounded-full bg-yellow-400" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3 space-y-2">
        <Link href="/settings" onClick={() => setMobileOpen(false)}>
          <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground ${collapsed ? "justify-center" : ""}`}>
            <Settings className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="text-sm">Einstellungen</span>}
          </div>
        </Link>
        {!collapsed && user && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-[10px] font-bold text-black shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{user?.name ?? "Partner"}</p>
              {isAdmin && (
                <p className="text-[10px] text-yellow-400 flex items-center gap-1">
                  <Crown className="w-2.5 h-2.5" /> Admin
                </p>
              )}
            </div>
            <button onClick={() => logout.mutate()} className="text-muted-foreground hover:text-red-400 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden md:flex flex-col shrink-0 border-r border-white/10 bg-black/60 backdrop-blur-xl relative z-20"
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full border border-white/20 bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-30"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25 }} className="fixed left-0 top-0 bottom-0 w-64 z-40 md:hidden border-r border-white/10 bg-black/95 backdrop-blur-xl">
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/60 backdrop-blur-xl">
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <p className="font-bold text-sm gold-gradient-text">LR Content Hub</p>
          <Link href="/settings">
            <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          </Link>
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
