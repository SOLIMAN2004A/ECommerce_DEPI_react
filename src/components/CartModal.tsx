import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

const CartModal = ({ open, onClose }: CartModalProps) => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <ShoppingBag className="w-6 h-6 text-primary" />
            سلة التسوق
          </DialogTitle>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">سلتك فارغة</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-20 h-20 object-contain bg-white rounded"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 line-clamp-1">{item.title}</h4>
                    <p className="text-lg font-bold text-primary">${item.price}</p>
                    
                    <div className="flex items-center gap-3 mt-3">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      
                      <span className="font-semibold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8 mr-auto"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">الإجمالي:</span>
                <span className="text-2xl font-bold text-primary">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={clearCart}
                >
                  إفراغ السلة
                </Button>
                <Button 
                  className="flex-1 bg-accent hover:bg-accent/90"
                >
                  إتمام الشراء
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
