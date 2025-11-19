import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onClick: () => void;
}

const ProductCard = ({ product, onAddToCart, onClick }: ProductCardProps) => {
  return (
    <Card 
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-hover)] animate-fade-in bg-gradient-to-br from-card to-muted/20"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-white">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          
          <Button 
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
