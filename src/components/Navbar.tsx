import { ShoppingCart, User, Store, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface NavbarProps {
  onCartClick: () => void;
  onAuthClick: () => void;
}

const Navbar = ({ onCartClick, onAuthClick }: NavbarProps) => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-md">
              <Store className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold">MyShop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-secondary transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="hover:text-secondary transition-colors font-medium">
              About
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-white/20 transition-all"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-accent to-secondary text-primary font-bold text-xs rounded-full flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
            </Button>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/account">
                  <Button variant="ghost" className="hover:bg-white/20 transition-all">
                    <User className="w-5 h-5 mr-2" />
                    {user.name}
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={logout}
                  className="border-white/40 bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="secondary"
                onClick={onAuthClick}
                className="bg-gradient-to-r from-accent to-secondary text-primary font-bold hover:shadow-lg transition-all"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-white/20"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-accent to-secondary text-primary font-bold text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-white/20"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="py-2 px-3 hover:bg-white/10 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="py-2 px-3 hover:bg-white/10 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start hover:bg-white/10">
                      <User className="w-5 h-5 mr-2" />
                      {user.name}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="border-white/40 bg-white/10 hover:bg-white/20 text-white font-semibold"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  variant="secondary"
                  onClick={() => {
                    onAuthClick();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-accent to-secondary text-primary font-bold hover:shadow-lg"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
