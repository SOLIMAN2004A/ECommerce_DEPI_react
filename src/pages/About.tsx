import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CartModal from '@/components/CartModal';
import AuthModal from '@/components/AuthModal';
import { Store, Truck, Shield, Heart } from 'lucide-react';

const About = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const features = [
    {
      icon: Store,
      title: 'High Quality Products',
      description: 'We provide you with the best products from trusted brands',
    },
    {
      icon: Truck,
      title: 'Fast Shipping',
      description: 'Quick and secure delivery right to your doorstep',
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'We guarantee product quality with easy returns',
    },
    {
      icon: Heart,
      title: 'Outstanding Customer Service',
      description: 'Support team always available to help you',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navbar onCartClick={() => setCartOpen(true)} onAuthClick={() => setAuthOpen(true)} />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Us
          </h1>

          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 mb-8 md:mb-12 animate-fade-in">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
              We are an online store specialized in providing the best products at competitive prices. We always strive to deliver a unique and exceptional shopping experience to our valued customers.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              With a wide variety of products across different categories, we ensure you'll find what you're looking for with ease and convenience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-card rounded-xl shadow-md p-5 md:p-6 hover:shadow-xl transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 md:mb-4">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

export default About;
