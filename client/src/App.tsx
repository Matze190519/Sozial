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
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/technology" component={Technology} />
        <Route path="/partners" component={Partners} />
        <Route path="/concept" component={Concept} />
        <Route path="/autokonzept" component={Autokonzept} />
        <Route path="/lr-partner" component={LRPartner} />
        <Route path="/karriere" component={Karriere} />
        <Route path="/about" component={About} />
        <Route path="/process" component={Process} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/agb" component={AGB} />
        <Route path="/kontakt" component={Contact} />
        <Route path="/faq" component={FAQ} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
