import { Switch, Route, Redirect } from "wouter";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Generator from "@/pages/Generator";
import Library from "@/pages/Library";
import Approval from "@/pages/Approval";
import Settings from "@/pages/Settings";
import Trends from "@/pages/Trends";
import Login from "@/pages/Login";
import WeekPlanner from "@/pages/WeekPlanner";

function ProtectedRoute({ component: Component, adminOnly = false }) {
  const { data: user, isLoading } = trpc.auth.me.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
}

function PlaceholderPage({ title, icon }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">{icon}</div>
        <h2 className="text-2xl font-bold gold-gradient-text">{title}</h2>
        <p className="text-muted-foreground">Diese Seite wird bald verfügbar sein.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />

      <Route path="/" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/generator" component={() => <ProtectedRoute component={Generator} />} />
      <Route path="/library" component={() => <ProtectedRoute component={Library} />} />
      <Route path="/trends" component={() => <ProtectedRoute component={Trends} />} />
      <Route path="/settings" component={() => <ProtectedRoute component={Settings} />} />
      <Route path="/approval" component={() => <ProtectedRoute component={Approval} adminOnly />} />

      <Route path="/weekplanner" component={() => <ProtectedRoute component={WeekPlanner} />} />

      <Route path="/hashtags" component={() => <ProtectedRoute component={() => <PlaceholderPage title="Hashtag Engine" icon="#️⃣" />} />} />
      <Route path="/calendar" component={() => <ProtectedRoute component={() => <PlaceholderPage title="Content Kalender" icon="📅" />} />} />
      <Route path="/queue" component={() => <ProtectedRoute component={() => <PlaceholderPage title="Post Queue" icon="⏰" />} />} />
      <Route path="/analytics" component={() => <ProtectedRoute component={() => <PlaceholderPage title="Analytics" icon="📊" />} />} />
      <Route path="/creator-spy" component={() => <ProtectedRoute component={() => <PlaceholderPage title="Creator Spy" icon="👁️" />} />} />
      <Route path="/templates" component={() => <ProtectedRoute component={() => <PlaceholderPage title="Templates" icon="📋" />} />} />
      <Route path="/team" component={() => <ProtectedRoute component={() => <PlaceholderPage title="Mein Team" icon="👥" />} adminOnly />} />

      <Route component={() => <Redirect to="/" />} />
    </Switch>
  );
        }
