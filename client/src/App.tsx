import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import BackgroundEffects from "@/components/BackgroundEffects";
import Home from "./pages/Home";
import Technology from "@/pages/Technology";
import Partners from "@/pages/Partners";
import Concept from "@/pages/Concept";
import Autokonzept from "@/pages/Autokonzept";
import LRPartner from "@/pages/LRPartner";
import Karriere from "@/pages/Karriere";
import About from "./pages/About";
import Process from "./pages/Process";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import AGB from "./pages/AGB";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import ScrollToTop from "./components/ScrollToTop";

function Router() {
  return (
    <Switch>
      {/* Home without Layout (standalone onboarding page) */}
      <Route path="/" component={Home} />
      
      {/* All other pages with Layout */}
      <Route path="/technology">
        <Layout><Technology /></Layout>
      </Route>
      <Route path="/partners">
        <Layout><Partners /></Layout>
      </Route>
      <Route path="/concept">
        <Layout><Concept /></Layout>
      </Route>
      <Route path="/autokonzept">
        <Layout><Autokonzept /></Layout>
      </Route>
      <Route path="/lr-partner">
        <Layout><LRPartner /></Layout>
      </Route>
      <Route path="/karriere">
        <Layout><Karriere /></Layout>
      </Route>
      <Route path="/about">
        <Layout><About /></Layout>
      </Route>
      <Route path="/process">
        <Layout><Process /></Layout>
      </Route>
      <Route path="/datenschutz">
        <Layout><Datenschutz /></Layout>
      </Route>
      <Route path="/impressum">
        <Layout><Impressum /></Layout>
      </Route>
      <Route path="/agb">
        <Layout><AGB /></Layout>
      </Route>
      <Route path="/kontakt">
        <Layout><Contact /></Layout>
      </Route>
      <Route path="/faq">
        <Layout><FAQ /></Layout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <BackgroundEffects />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
