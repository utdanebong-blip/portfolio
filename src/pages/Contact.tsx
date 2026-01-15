import { Layout } from '@/components/layout';
import { contactInfo } from '@/hooks/usePortfolioData';
import {
  Mail,
  MapPin,
  ExternalLink,
  Linkedin,
  Twitter,
  MessageCircle,
  Instagram,
  Facebook,
  ArrowUpRight,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    url: 'https://wa.me/+2347071486994',
    color: 'from-green-500 to-green-600',
    hoverBg: 'hover:bg-green-500/10',
    description: 'Quick chat'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/official_utibe_ebong?igsh=MXU0Zzh4bnNocGNqeA%3D%3D&utm_source=qr',
    color: 'from-pink-500 via-purple-500 to-orange-500',
    hoverBg: 'hover:bg-pink-500/10',
    description: 'Behind the scenes'
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://www.facebook.com/share/17iyhi3vcF/?mibextid=wwXIfr',
    color: 'from-blue-500 to-blue-600',
    hoverBg: 'hover:bg-blue-500/10',
    description: 'Follow updates'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/utibe-ebong-3d-artist?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    color: 'from-sky-500 to-sky-600',
    hoverBg: 'hover:bg-sky-500/10',
    description: 'Professional network'
  },
];

export default function Contact() {
  // use the imported `contactInfo` from the data hook
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Booking state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [useGoogleMeet, setUseGoogleMeet] = useState(true);

  const demoTimeSlots = [
    { time: '09:00', available: true },
    { time: '10:00', available: false },
    { time: '11:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: false },
    { time: '16:00', available: true },
  ];

  const isPast = (date: Date) => { const t = new Date(); t.setHours(0,0,0,0); return date < t; };
  const isToday = (d: Date) => new Date().toDateString() === d.toDateString();

  const generateCalendarDays = () => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);
    const pad = first.getDay();
    const days: (Date | null)[] = [];
    for (let i = 0; i < pad; i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++) days.push(new Date(y, m, d));
    return days;
  };

  const fmtUTC = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  };

  const handleBookMeeting = async () => {
    if (!selectedDate || !selectedTime) { toast.error('Select a date and time'); return; }
    const [hh, mm] = selectedTime.split(':');
    const start = new Date(selectedDate); start.setHours(parseInt(hh,10), parseInt(mm||'0',10),0,0);
    const end = new Date(start.getTime() + 30*60*1000);
    const title = `30-min call with ${name || 'Client'}`;
    const details = `Booked via website by ${name || 'Client'} (${email || 'no-email-provided'}).`;
    const owner = contactInfo.email || 'ebongutibe@gmail.com';
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const gcal = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${fmtUTC(start)}/${fmtUTC(end)}&details=${encodeURIComponent(details)}${useGoogleMeet ? `&location=${encodeURIComponent('Google Meet')}` : ''}&ctz=${encodeURIComponent(timeZone)}&add=${encodeURIComponent(owner)}`;

    try {
      const g = window.open(gcal, '_blank', 'noopener');
      const ownerMailto = `mailto:${owner}?subject=${encodeURIComponent(`New booking: ${selectedDate.toLocaleDateString()} ${selectedTime}`)}&body=${encodeURIComponent(`A booking was made on ${selectedDate.toLocaleDateString()} at ${selectedTime} by ${name || 'Guest'} (${email || 'no-email-provided'}).`)}`;
      const m = window.open(ownerMailto, '_blank', 'noopener');
      if (!g) {
        const fallback = `Event: ${title}\nWhen: ${selectedDate.toDateString()} ${selectedTime}\nDuration: 30 min\nDetails: ${details}`;
        try { await navigator.clipboard.writeText(fallback); toast.error('Popup blocked — event copied to clipboard. Paste into Google Calendar.'); } catch { toast.error('Popup blocked and clipboard unavailable.'); }
      } else toast.success('Google Calendar opened.');
      if (!m) try { window.location.href = ownerMailto; } catch {}
      setSelectedDate(null); setSelectedTime(null);
    } catch { toast.error('Unable to open booking links'); }
  };

  const isMobile = (): boolean => /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      toast.error('Please fill in all fields');
      return;
    }

    const to = contactInfo.email || '';
    const subjectEncoded = encodeURIComponent(trimmedSubject);
    const body = encodeURIComponent(`Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`);
    const mailto = `mailto:${to}?subject=${subjectEncoded}&body=${body}`;

    try {
      if (isMobile()) {
        // on mobile, navigate to mailto to open native mail app
        window.location.href = mailto;
      } else {
        // on desktop, open in a new tab
        window.open(mailto, '_blank', 'noopener');
      }
      toast.success('Opening your mail client');
      // optional: clear form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      toast.error('Unable to open mail client');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 relative">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 mb-6">
              <Send size={14} className="text-primary" />
              <span className="font-mono text-xs text-primary tracking-widest uppercase">Get In Touch</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Let's <TypewriterContact />
            </h1>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              Have a project in mind? I'd love to hear about it. Let's create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Contact Info & Socials */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Cards */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="group p-5 bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl hover:border-primary/30 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Email</p>
                      <p className="font-body text-foreground group-hover:text-primary transition-colors">{contactInfo.email}</p>
                    </div>
                  </div>
                </div>

                <div className="group p-5 bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl hover:border-primary/30 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Location</p>
                      <p className="font-body text-foreground group-hover:text-accent transition-colors">{contactInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links - Beautiful animated cards */}
              <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Connect Directly</h3>
                
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-border/50 ${social.hoverBg} animate-fade-in`}
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    {/* Icon with gradient background */}
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg`}>
                      <social.icon className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{social.name}</p>
                      <p className="text-xs text-muted-foreground">{social.description}</p>
                    </div>
                    
                    {/* Arrow */}
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                ))}
                
                {/* ArtStation link */}
                {contactInfo.social.artstation && (
                  <a
                    href={contactInfo.social.artstation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-border/50 hover:bg-primary/5 animate-fade-in"
                    style={{ animationDelay: '0.7s' }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">ArtStation</p>
                      <p className="text-xs text-muted-foreground">View portfolio</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                )}
              </div>

              <div className="mt-8 bg-card/50 backdrop-blur-sm border border-border/30 rounded-3xl p-6 md:p-8">
                <h2 className="font-display text-2xl font-bold mb-2">Book a Meeting</h2>
                <p className="text-muted-foreground mb-4">Schedule a 30-minute Google Meet call.</p>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="w-8 h-8 rounded-lg bg-muted/20 flex items-center justify-center">‹</button>
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="w-8 h-8 rounded-lg bg-muted/20 flex items-center justify-center">›</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-muted-foreground">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=> <div key={d} className="text-center py-2">{d}</div>)}</div>

                  <div className="grid grid-cols-7 gap-1">{generateCalendarDays().map((d,i)=> (
                    <button key={i} disabled={!d || isPast(d as Date)} onClick={()=> d && !isPast(d as Date) && setSelectedDate(d)} className={`aspect-square rounded-lg text-sm ${!d ? 'invisible' : isPast(d as Date) ? 'text-muted-foreground/40 cursor-not-allowed' : (selectedDate && d && selectedDate.toDateString()===d.toDateString()) ? 'bg-primary text-primary-foreground' : isToday(d as Date) ? 'bg-accent/20 text-accent' : 'hover:bg-muted/50'}`}>{d?.getDate()}</button>
                  ))}</div>
                </div>

                {selectedDate && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Available Times for {selectedDate.toLocaleDateString()}</h4>
                    <div className="grid grid-cols-3 gap-2">{demoTimeSlots.map(slot=> (
                      <button key={slot.time} disabled={!slot.available} onClick={()=> slot.available && setSelectedTime(slot.time)} className={`py-2 rounded-xl ${!slot.available ? 'bg-muted/20 text-muted-foreground/50 line-through' : selectedTime===slot.time ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}>{slot.time}</button>
                    ))}</div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <input id="meetToggle" type="checkbox" checked={useGoogleMeet} onChange={(e)=>setUseGoogleMeet(e.target.checked)} className="w-4 h-4" />
                  <label htmlFor="meetToggle" className="text-sm text-muted-foreground">Open as Google Meet event</label>
                </div>

                <Button onClick={handleBookMeeting} disabled={!selectedDate || !selectedTime} size="lg" className="w-full">{selectedDate && selectedTime ? `Book ${selectedTime} on ${selectedDate.toLocaleDateString()}` : 'Select a date & time'}</Button>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-3xl p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">Send a Message</h2>
                  <p className="text-muted-foreground text-sm">Fill out the form below and I'll get back to you as soon as possible.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Your Name</label>
                      <Input 
                          placeholder="Captionstudio" 
                          required 
                          value={name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                          className="bg-background/50 border-border/50 focus:border-primary/50 rounded-xl h-12 transition-all duration-300" 
                        />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Email Address</label>
                      <Input 
                        type="email" 
                        placeholder="caption@example.com" 
                        required 
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        className="bg-background/50 border-border/50 focus:border-primary/50 rounded-xl h-12 transition-all duration-300" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Subject</label>
                    <Input 
                      placeholder="Project Inquiry" 
                      required 
                      value={subject}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
                      className="bg-background/50 border-border/50 focus:border-primary/50 rounded-xl h-12 transition-all duration-300" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Your Message</label>
                    <Textarea 
                      placeholder="Tell me about your awesome project..." 
                      rows={6} 
                      required 
                      value={message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                      className="bg-background/50 border-border/50 focus:border-primary/50 rounded-xl resize-none transition-all duration-300" 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full font-display gap-3 h-14 text-base rounded-xl glow-green group"
                  >
                    <span>Send Message</span>
                    <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function TypewriterContact() {
  const words = ['Connect', 'Work', 'Team up', 'Design', 'Create', 'Grow', 'Collaborate', 'Innovate'];
  return <Typewriter words={words} loop={true} pause={1400} />;
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
    <span className="inline-block">
      <span className="text-primary text-glow-green">{display}</span>
      <span className="inline-block w-1 h-7 bg-primary ml-2 align-middle animate-blink" />
      <style>{`.animate-blink{animation:blink 1s steps(2,end) infinite}@keyframes blink{50%{opacity:0}}`}</style>
    </span>
  );
}
