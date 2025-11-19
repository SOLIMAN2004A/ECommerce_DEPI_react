import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CartModal from '@/components/CartModal';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { User, Mail, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Account = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { items, totalPrice } = useCart();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navbar onCartClick={() => setCartOpen(true)} onAuthClick={() => setAuthOpen(true)} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            حسابي
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">معلومات الحساب</h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <User className="w-5 h-5" />
                  <div>
                    <p className="text-xs">الاسم</p>
                    <p className="font-semibold text-foreground">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                  <div>
                    <p className="text-xs">البريد الإلكتروني</p>
                    <p className="font-semibold text-foreground">{user?.email}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">إحصائيات التسوق</h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">عدد المنتجات في السلة</span>
                  <span className="text-2xl font-bold text-primary">{items.length}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">إجمالي السلة</span>
                  <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

export default Account;
