import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import Button from '../components/ui/Button';
import { formatPrice } from '../utils/formatters';

const CheckoutPage: React.FC = () => {
  const { cart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      await placeOrder();
      setStep(3);
      setTimeout(() => navigate('/order-success'), 2000);
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        {['Shipping', 'Payment', 'Confirmation'].map((label, index) => (
          <React.Fragment key={label}>
            <div className={`flex items-center ${index + 1 <= step ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                index + 1 <= step ? 'bg-primary-600 text-white' : 'bg-gray-200'
              }`}>
                {index + 1}
              </div>
              <span className="ml-2 font-medium hidden sm:block">{label}</span>
            </div>
            {index < 2 && <div className="flex-1 h-1 mx-4 bg-gray-200" />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input className="input-field" placeholder="First Name" />
              <input className="input-field" placeholder="Last Name" />
            </div>
            <input className="input-field" placeholder="Address" />
            <div className="grid grid-cols-2 gap-4">
              <input className="input-field" placeholder="City" />
              <input className="input-field" placeholder="ZIP Code" />
            </div>
          </div>
          <Button onClick={() => setStep(2)} className="w-full mt-6">
            Continue to Payment
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method (Simulated)</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              This is a simulated checkout. No real payment will be processed.
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="border rounded-lg p-4 flex items-center gap-3 cursor-pointer bg-primary-50 border-primary-500">
              <div className="w-5 h-5 rounded-full border-2 border-primary-600 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
              </div>
              <span className="font-medium">Simulated Payment</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{formatPrice(cart.total)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(cart.total)}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
            <Button onClick={handlePlaceOrder} isLoading={isProcessing} className="flex-1">
              Place Order
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-4">Redirecting to your orders...</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;