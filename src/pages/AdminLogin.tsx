import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { useAuth } from '@/hooks/usePortfolioData';
import { ADMIN_PASSCODE } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [passcode, setPasscode] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect when authentication state changes (avoid navigation during render)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(passcode);
    if (ok) {
      toast.success('Access granted');
      // small delay to ensure auth state (localStorage) propagates before navigation
      await new Promise((r) => setTimeout(r, 50));
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid passcode');
    }
  };

  // auto-navigate when the correct passcode is typed
  useEffect(() => {
    if (passcode && passcode === ADMIN_PASSCODE) {
      const ok = login(passcode);
      if (ok) {
        toast.success('Access granted');
        // allow a tick for state propagation
        const t = setTimeout(() => navigate('/admin/dashboard'), 50);
        return () => clearTimeout(t);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passcode]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-sm p-8 bg-card border border-border rounded-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Lock className="text-primary" size={28} />
            </div>
            <h1 className="font-display text-2xl font-bold">Admin Access</h1>
            <p className="text-muted-foreground font-body text-sm mt-2">Enter passcode to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="text-center font-mono text-lg tracking-widest"
            />
            <Button type="submit" className="w-full font-display">Access Dashboard</Button>
          </form>

          {/* Demo passcode removed from UI for security */}
        </div>
      </div>
    </Layout>
  );
}
