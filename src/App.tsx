import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";
import { BASE_URL } from "./lib/utils";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/portfolio" element={<Home />} />
        <Route path={`/${BASE_URL}/about`} element={<About />} />
        <Route path={`/${BASE_URL}/gallery`} element={<Gallery />} />
        <Route path={`/${BASE_URL}/gallery/:id`} element={<ProjectDetail />} />
        <Route path={`/${BASE_URL}/blog`} element={<Blog />} />
        <Route path={`/${BASE_URL}/blog/:id`} element={<BlogPost />} />
        <Route path={`/${BASE_URL}/contact`} element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
