import React, { Suspense, lazy } from "react";
import SuspenseLoader from "@/components/ui/SuspenseLoader";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HashRouter, Routes, Route } from "react-router-dom"; // <-- use HashRouter
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "@/components/ScrollToTop";

// Page-level code-splitting (route-based)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const ArchvizProjectDetail = lazy(() => import("./pages/ArchvizProjectDetail"));
const ProductDetailViz = lazy(() => import("./pages/ProductDetailViz"));
const AIRenderEnhancer = lazy(() => import("./pages/AIRenderEnhancer"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <ScrollToTop />
        <Suspense fallback={<SuspenseLoader /> }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:id" element={<ProjectDetail />} />
            <Route path="/productviz/:id" element={<ProductDetailViz />} />
            <Route path="/ai-render-enhancer" element={<AIRenderEnhancer />} />
            <Route path="/archviz/:id" element={<ArchvizProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
