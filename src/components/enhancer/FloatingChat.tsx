import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Message = {
  id: number;
  text: string;
  isBot: boolean;
};

const FAQ_RESPONSES: Record<string, string> = {
  'free': 'Yes! The Archviz Enhancer is completely free for testing. All features are unlocked with no time limits.',
  'gpu': 'We support both NVIDIA CUDA and AMD OpenCL GPUs. If no compatible GPU is found, the app falls back to CPU processing.',
  'format': 'We support all major image formats: PNG, JPG, JPEG, TIFF, BMP, and WebP. Output can be saved in any of these formats.',
  'batch': 'Yes! You can queue hundreds of images for batch processing. The app will process them automatically while you focus on other work.',
  'resolution': 'There\'s no resolution limit! The AI can enhance images of any size, from small thumbnails to massive 8K+ renders.',
  'watermark': 'You can add both text and image watermarks. Control position, opacity, size, and even add your studio logo.',
  'reference': 'Reference Image Matching lets you match the color grading and mood of any reference photo. Just drop a reference image and apply its style to your renders.',
  'windows': 'Currently, the Enhancer is available for Windows 10 and Windows 11. Mac and Linux versions are planned for the future.',
  'install': 'Just download the installer, run it, and follow the setup wizard. No complex configuration needed—it works out of the box.',
  'original': 'Yes! The Enhancer is non-destructive. Your original files are never modified. Enhanced versions are saved as new files.',
};

function findBestResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  for (const [keyword, response] of Object.entries(FAQ_RESPONSES)) {
    if (lowerQuery.includes(keyword)) {
      return response;
    }
  }
  
  // Check for common question patterns
  if (lowerQuery.includes('cost') || lowerQuery.includes('price') || lowerQuery.includes('pay')) {
    return FAQ_RESPONSES['free'];
  }
  if (lowerQuery.includes('mac') || lowerQuery.includes('linux') || lowerQuery.includes('system')) {
    return FAQ_RESPONSES['windows'];
  }
  if (lowerQuery.includes('quality') || lowerQuery.includes('size') || lowerQuery.includes('4k') || lowerQuery.includes('8k')) {
    return FAQ_RESPONSES['resolution'];
  }
  if (lowerQuery.includes('how') && lowerQuery.includes('work')) {
    return 'The Enhancer uses advanced AI neural networks to analyze and improve your renders. It removes noise, enhances details, and can match reference image styles—all while preserving architectural accuracy.';
  }
  
  return 'I\'m not sure about that specific question. Try asking about: pricing, GPU support, file formats, batch processing, resolution limits, watermarks, reference matching, or system requirements. Or drop your feedback below!';
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hi! 👋 I can answer common questions about the AI Render Enhancer. Ask me anything!', isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false
    };

    const botResponse: Message = {
      id: Date.now() + 1,
      text: findBestResponse(input),
      isBot: true
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isOpen 
            ? 'bg-muted-foreground/20 hover:bg-muted-foreground/30' 
            : 'bg-primary hover:bg-primary/90 shadow-primary/30'
        }`}
      >
        {isOpen ? (
          <X size={24} className="text-foreground" />
        ) : (
          <MessageCircle size={24} className="text-primary-foreground" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-neon-cyan/20 p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Enhancer FAQ Bot</h3>
                <p className="text-xs text-muted-foreground">Ask me anything!</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {msg.isBot && (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                    msg.isBot
                      ? 'bg-muted text-foreground rounded-tl-none'
                      : 'bg-primary text-primary-foreground rounded-tr-none'
                  }`}
                >
                  {msg.text}
                </div>
                {!msg.isBot && (
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question..."
                className="flex-1 bg-background/50 border-border/50"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}