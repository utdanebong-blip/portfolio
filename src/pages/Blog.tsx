import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { posts } from '@/hooks/usePortfolioData';
import { Calendar, Tag, ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export const hashLink = (path: string) => `#${path}`;

export default function Blog() {
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'tutorial':
        return <BookOpen size={14} />;
      case 'tips':
        return <Sparkles size={14} />;
      default:
        return <Tag size={14} />;
    }
  };

  const getReadTime = (content: string) => {
    const words = content.split(' ').length;
    return Math.ceil(words / 200);
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Header */}
        <div className="relative overflow-hidden py-20 bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-4 bg-primary/10 px-4 py-2 rounded-full">
                <BookOpen size={16} /> Knowledge Hub
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <TypewriterWrapper />
                <span className="block text-primary">Master 3D Art</span>
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                Deep dives into techniques, tutorials, and creative insights to elevate your 3D artistry
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-20">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16 -mt-8">
              <Link
                to={`/blog/${featuredPost.id}`}
                className="group block relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent lg:block hidden" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent lg:hidden" />
                  </div>
                  <div className="relative p-8 lg:p-12 flex flex-col justify-center">
                    <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary-foreground bg-primary px-3 py-1.5 rounded-full">
                        <Sparkles size={12} /> Featured
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="inline-flex items-center gap-1.5 text-sm font-mono text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                        {getCategoryIcon(featuredPost.category)}
                        {featuredPost.category}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Clock size={14} />
                        {getReadTime(featuredPost.content)} min read
                      </span>
                    </div>
                    <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="font-body text-muted-foreground text-lg mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap mb-6">
                      {featuredPost.tags.map((tag) => (
                        <span key={tag} className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="font-body text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                        Start Learning <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Section Title */}
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display text-2xl font-bold">All Articles</h2>
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground font-mono">{posts.length} articles</span>
          </div>

          {/* Posts Grid - Magazine Style */}
          <div className="grid md:grid-cols-2 gap-8">
            {otherPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group flex flex-col sm:flex-row gap-5 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/50 hover:bg-card transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-full sm:w-48 aspect-video sm:aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-primary-foreground bg-primary/90 px-2 py-1 rounded">
                      {getCategoryIcon(post.category)}
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {getReadTime(post.content)} min
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-muted-foreground/70">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20">
              <BookOpen size={48} className="mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No articles yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function TypewriterWrapper() {
  const words = ['Learn', 'Read', 'Create', 'Master'];
  return <Typewriter words={words} loop={true} pause={1500} />;
}

function Typewriter({ words, loop = true, pause = 1200, typeSpeed = 80, deleteSpeed = 40 }: { words: string[]; loop?: boolean; pause?: number; typeSpeed?: number; deleteSpeed?: number }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timer: number | undefined;
    const word = words[index % words.length];

    if (typing) {
      if (display.length < word.length) {
        timer = window.setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typeSpeed);
      } else {
        timer = window.setTimeout(() => setTyping(false), pause);
      }
    } else {
      if (display.length > 0) {
        timer = window.setTimeout(() => setDisplay(display.slice(0, display.length - 1)), deleteSpeed);
      } else {
        setTyping(true);
        setIndex((i) => i + 1);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [display, typing, index, words, pause, typeSpeed, deleteSpeed]);

  return (
    <span className="block">
      <span>{display}</span>
      <span className="inline-block w-1 h-7 align-middle bg-primary ml-2 animate-blink" />
      <style>{`.animate-blink{animation:blink 1s steps(2,end) infinite}@keyframes blink{50%{opacity:0}}`}</style>
      <span className="inline">,</span>
    </span>
  );
}
