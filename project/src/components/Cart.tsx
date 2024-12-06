import React from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_publishable_key');

export function Cart() {
  const { items, removeFromCart, total } = useCart();
  const { isAuthenticated } = useAuth();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Here you would typically make a call to your backend to create a checkout session
      // For demo purposes, we'll just show a success message
      toast.success('Checkout process would start here!');
    } catch (error) {
      toast.error('Failed to initiate checkout');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-center text-gray-600">Please login to view your cart</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 mb-4 border-b pb-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <div className="mt-4 space-y-4">
            <div className="text-xl font-bold">
              Total: ${total.toFixed(2)}
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}