import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Features } from "./pages/Features";
import { Demo } from "./pages/Demo";
import { Documentation } from "./pages/Documentation";
import { Contact } from "./pages/Contact";
import { Auth } from "./pages/Auth";
import { Logs } from "./pages/Logs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/about" element={<About />} /> */}
                <Route path="/features" element={<Features />} />
                <Route path="/demo" element={<Demo />} />
                {/* <Route path="/docs" element={<Documentation />} /> */}
               {/*  <Route path="/contact" element={<Contact />} />  */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/logs" element={<Logs />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
