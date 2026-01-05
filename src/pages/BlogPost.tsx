import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { getPost, posts } from '@/hooks/usePortfolioData';
import { Calendar, Tag, ArrowLeft, Clock, Share2, Bookmark, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function BlogPost() {
  const { id } = useParams();
  const post = getPost(id || '');

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Estimate reading time
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Get related posts
  const relatedPosts = posts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 2);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    toast.success('Post bookmarked! (Demo)');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent" />
        </div>

        {/* Back Button */}
        <Link 
          to="/blog" 
          className="absolute top-4 left-4 md:top-8 md:left-8 inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors backdrop-blur-sm bg-background/20 px-3 py-2 rounded-full border border-border/30"
        >
          <ArrowLeft size={14} /> <span className="hidden sm:inline">Blog</span>
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-2">
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary/30 transition-colors"
          >
            <Share2 size={16} />
          </button>
          <button 
            onClick={handleBookmark}
            className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary/30 transition-colors"
          >
            <Bookmark size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 -mt-20 md:-mt-32 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header Card */}
          <div className="bg-card/80 backdrop-blur-xl border border-border/30 rounded-2xl md:rounded-3xl p-5 md:p-8 mb-6 md:mb-8 shadow-xl animate-fade-in">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6">
              <span className="text-xs md:text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
                <Calendar size={12} />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
                <Clock size={12} />
                {readingTime} min
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Article Content */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl md:rounded-3xl p-5 md:p-8 mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="prose prose-invert prose-sm md:prose-base max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="font-display text-xl md:text-2xl font-bold text-foreground mt-6 md:mt-8 mb-3 md:mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="font-display text-lg md:text-xl font-semibold text-foreground mt-4 md:mt-6 mb-2 md:mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(Boolean);
                  const isOrdered = paragraph.startsWith('1. ');
                  if (isOrdered) {
                    return (
                      <ol key={index} className={`list-decimal list-inside space-y-2 my-4 ml-2 md:ml-4`}>
                        {items.map((item, i) => (
                          <li key={i} className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                            {item.replace(/^\d+\.\s*/, '')}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <ul key={index} className={`list-disc list-inside space-y-2 my-4 ml-2 md:ml-4`}>
                      {items.map((item, i) => (
                        <li key={i} className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                          {item.replace(/^-\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-start gap-3 flex-wrap mb-8 md:mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Tag size={16} className="text-muted-foreground mt-1" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="bg-card/50 border border-border/30 text-muted-foreground px-3 py-1.5 rounded-full text-xs md:text-sm hover:border-primary/30 hover:text-primary transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="font-display text-lg md:text-xl font-bold text-foreground">Related Posts</h3>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                  All posts <ChevronRight size={14} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group bg-card/50 border border-border/30 rounded-xl md:rounded-2xl overflow-hidden hover:border-primary/30 transition-all"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] md:text-xs font-mono text-primary mb-2 block">{relatedPost.category}</span>
                      <h4 className="font-display text-sm md:text-base font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="text-center py-8 md:py-12 border-t border-border/30 mt-8 md:mt-12">
            <p className="text-muted-foreground mb-4 text-sm md:text-base">Enjoyed this article?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/blog">
                <Button variant="outline" className="w-full sm:w-auto font-display gap-2 border-border/50 hover:border-primary/50">
                  <ArrowLeft size={16} /> More Articles
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="w-full sm:w-auto font-display gap-2 glow-green">
                  Get in Touch <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}