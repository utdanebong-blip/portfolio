import { useState } from 'react';
import { Send, Star, CheckCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type FeedbackType = 'bug' | 'feature' | 'general';

export function FeedbackSection() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Please enter your feedback",
        variant: "destructive"
      });
      return;
    }

    // Store feedback in localStorage
    const feedback = {
      id: Date.now(),
      rating,
      type: feedbackType,
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };

    const existingFeedback = JSON.parse(localStorage.getItem('enhancer-feedback') || '[]');
    localStorage.setItem('enhancer-feedback', JSON.stringify([...existingFeedback, feedback]));

    // Prepare mailto link to open user's email client pre-filled
    const to = 'captionstudioz@gmail.com';
    const subject = `Enhancer Feedback - ${feedback.type.toUpperCase()} - ${feedback.rating}★`;
    const bodyLines = [
      `Name: ${feedback.name || '(anonymous)'}`,
      `Email: ${feedback.email || '(not provided)'}`,
      `Type: ${feedback.type}`,
      `Rating: ${feedback.rating}`,
      `Timestamp: ${feedback.timestamp}`,
      '',
      'Message:',
      feedback.message,
    ];
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    // Open default mail client
    try {
      window.open(mailto);
    } catch (err) {
      // Fallback to location.href
      window.location.href = mailto;
    }

    setSubmitted(true);
    toast({
      title: "Email composer opened",
      description: "Your feedback was saved locally and the email app was opened to send it to us."
    });
  };

  if (submitted) {
    return (
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="bg-card/50 border border-border/50 rounded-3xl p-12 backdrop-blur-sm">
            <div className="w-20 h-20 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-neon-green" />
            </div>
            <h3 className="font-display text-3xl font-bold mb-4">Thank You!</h3>
            <p className="text-muted-foreground text-lg mb-6">
              Your feedback has been received. We truly appreciate you taking the time to help us improve!
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSubmitted(false);
                setRating(0);
                setMessage('');
                setName('');
                setEmail('');
              }}
            >
              Submit Another
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6">
            <MessageSquare size={16} />
            <span className="font-mono text-sm">YOUR VOICE MATTERS</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Drop Your Feedback
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Help us make the Enhancer even better. Report bugs, suggest features, or just let us know what you think!
          </p>
        </div>

        <div className="bg-card/50 border border-border/50 rounded-3xl p-8 md:p-10 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Star Rating */}
            <div className="text-center">
              <label className="block text-sm font-medium text-muted-foreground mb-3">
                How would you rate the Enhancer?
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={`transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Type */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-3">
                What type of feedback?
              </label>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { type: 'bug' as const, label: '🐛 Bug Report' },
                  { type: 'feature' as const, label: '✨ Feature Request' },
                  { type: 'general' as const, label: '💬 General Feedback' }
                ].map(({ type, label }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFeedbackType(type)}
                    className={`px-4 py-2 rounded-xl border transition-all ${
                      feedbackType === type
                        ? 'bg-primary/20 border-primary text-foreground'
                        : 'bg-card border-border hover:border-primary/50 text-muted-foreground'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Name (optional)
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Email (optional)
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-background/50 border-border/50"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Your Feedback *
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  feedbackType === 'bug'
                    ? "Describe the bug you encountered..."
                    : feedbackType === 'feature'
                    ? "What feature would you like to see?"
                    : "Share your thoughts about the Enhancer..."
                }
                className="bg-background/50 border-border/50 min-h-[120px]"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full py-6 text-lg rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
            >
              <Send className="mr-2" size={20} />
              Submit Feedback
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}