import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        toast.success('Login successful!');
        onClose();
      } else {
        toast.error('Incorrect email or password');
      }
    } else {
      const success = await register(email, password, name);
      if (success) {
        toast.success('Account created successfully!');
        onClose();
      } else {
        toast.error('Email already in use');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">
            {isLogin ? 'Login' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all font-semibold"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>

          {isLogin && (
            <div className="p-3 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg text-sm border border-primary/20">
              <p className="font-semibold mb-1 text-primary">For testing:</p>
              <p className="text-muted-foreground">Email: test@example.com</p>
              <p className="text-muted-foreground">Password: anything</p>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
