import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import CartModal from '@/components/CartModal';
import AuthModal from '@/components/AuthModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setDisplayedProducts(data.slice(0, 8));
        setCurrentIndex(8);
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const loadMore = () => {
    const nextProducts = [];
    let index = currentIndex;
    
    for (let i = 0; i < 8; i++) {
      nextProducts.push(products[index % products.length]);
      index++;
    }
    
    setDisplayedProducts(prev => [...prev, ...nextProducts]);
    setCurrentIndex(index);
  };

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      setAuthOpen(true);
      return;
    }

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    toast.success('✓ Added to cart');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary/10 to-white">
      <Navbar onCartClick={() => setCartOpen(true)} onAuthClick={() => setAuthOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary to-accent py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
            Discover Our Premium Products
          </h1>
          <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90">
            High Quality • Great Prices • Fast Delivery
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>

            {products.length > 0 && (
              <div className="text-center mt-12">
                <Button 
                  size="lg"
                  onClick={loadMore}
                  className="bg-primary hover:bg-primary/90"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <ProductDetailModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={() => selectedProduct && handleAddToCart(selectedProduct)}
      />
    </div>
  );
};

export default Index;
