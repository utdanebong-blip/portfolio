import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { getPost, posts } from '@/hooks/usePortfolioData';
import { Calendar, Tag, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BASE_URL } from '@/lib/utils';

export default function BlogPost() {
  const { id } = useParams();
  const post = getPost(id || '');

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to={`/${BASE_URL}/blog`}>
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

  return (
    <Layout>
      <article className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Back Link */}
        <Link to={`/${BASE_URL}/blog`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span className="font-body">Back to Blog</span>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded">
              {post.category}
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar size={14} />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock size={14} />
              {readingTime} min read
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          <p className="font-body text-xl text-muted-foreground">
            {post.excerpt}
          </p>
        </header>

        {/* Cover Image */}
        <div className="aspect-video rounded-lg overflow-hidden mb-12">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="font-display text-xl font-semibold text-foreground mt-6 mb-3">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
              const items = paragraph.split('\n').filter(Boolean);
              const isOrdered = paragraph.startsWith('1. ');
              const ListTag = isOrdered ? 'ol' : 'ul';
              return (
                <ListTag key={index} className={`${isOrdered ? 'list-decimal' : 'list-disc'} list-inside space-y-2 my-4`}>
                  {items.map((item, i) => (
                    <li key={i} className="font-body text-muted-foreground">
                      {item.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '')}
                    </li>
                  ))}
                </ListTag>
              );
            }
            return (
              <p key={index} className="font-body text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap mb-12 pb-8 border-b border-border">
          <Tag size={16} className="text-muted-foreground" />
          {post.tags.map((tag) => (
            <span key={tag} className="bg-secondary text-muted-foreground px-3 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h3 className="font-display text-2xl font-bold mb-6">Related Posts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-display font-semibold group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}
