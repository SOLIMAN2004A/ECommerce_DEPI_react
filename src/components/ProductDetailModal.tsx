import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

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

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

const ProductDetailModal = ({ product, open, onClose, onAddToCart }: ProductDetailModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.title}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title}
              className="max-h-80 object-contain"
            />
          </div>

          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm">
              {product.category}
            </Badge>

            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating!.rate)
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating.count} تقييم)
                </span>
              </div>
            )}

            <div className="text-4xl font-bold text-primary">
              ${product.price}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <Button 
              size="lg"
              className="w-full bg-accent hover:bg-accent/90"
              onClick={() => {
                onAddToCart();
                onClose();
              }}
            >
              <ShoppingCart className="w-5 h-5 ml-2" />
              أضف إلى السلة
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
