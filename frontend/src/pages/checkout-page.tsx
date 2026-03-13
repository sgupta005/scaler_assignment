import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { useAuth } from '../context/auth-context';
import { useCart } from '../context/cart-context';
import { CheckoutStepper } from '../features/checkout/checkout-stepper';
import { CheckoutPriceSidebar } from '../features/checkout/checkout-price-sidebar';
import { AddressStep } from '../features/checkout/address-step';
import { OrderSummaryStep } from '../features/checkout/order-summary-step';
import { fetchAddresses } from '../api/addresses';
import { placeOrder } from '../api/orders';
import type { Address } from '../types/address';

type Step = 1 | 2;

export function CheckoutPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { cart, loading: cartLoading, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(1);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    if (!user) return;
    setAddressesLoading(true);
    fetchAddresses()
      .then((list) => {
        setAddresses(list);
        const defaultAddr = list.find((a) => a.isDefault) ?? list[0];
        if (defaultAddr) setSelectedAddressId(defaultAddr.id);
        if (list.length === 0) setShowAddressForm(true);
      })
      .catch(console.error)
      .finally(() => setAddressesLoading(false));
  }, [user]);

  const originalTotal = cart
    ? cart.items.reduce(
        (sum, i) => sum + (i.product.mrp ?? i.product.price) * i.quantity,
        0,
      )
    : 0;
  const discountedTotal = cart
    ? cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    : 0;
  const discount = originalTotal - discountedTotal;

  function handleAddressSaved(address: Address) {
    setAddresses((prev) =>
      address.isDefault
        ? [address, ...prev.map((a) => ({ ...a, isDefault: false }))]
        : [address, ...prev],
    );
    setSelectedAddressId(address.id);
    setShowAddressForm(false);
  }

  function handleContinueToSummary() {
    if (!selectedAddressId) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handlePlaceOrder() {
    if (!selectedAddressId) return;
    setOrderError('');
    setPlacingOrder(true);
    try {
      const order = await placeOrder(selectedAddressId);
      clearCart();
      navigate(`/order/${order.id}`);
    } catch (err) {
      setOrderError(
        err instanceof Error ? err.message : 'Failed to place order',
      );
    } finally {
      setPlacingOrder(false);
    }
  }

  if (authLoading || cartLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login?redirect=/checkout" replace />;
  }

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) ?? null;

  return (
    <div className="py-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-4 items-start pb-8">
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-t-sm overflow-hidden">
              <CheckoutStepper step={step} />
            </div>

            {step === 1 && (
              <AddressStep
                addresses={addresses}
                loading={addressesLoading}
                selectedAddressId={selectedAddressId}
                showForm={showAddressForm}
                onSelectAddress={setSelectedAddressId}
                onShowForm={() => setShowAddressForm(true)}
                onHideForm={() => setShowAddressForm(false)}
                onAddressSaved={handleAddressSaved}
                onContinue={handleContinueToSummary}
              />
            )}

            {step === 2 && selectedAddress && cart && (
              <OrderSummaryStep
                address={selectedAddress}
                cart={cart}
                orderError={orderError}
                onChangeAddress={() => setStep(1)}
              />
            )}
          </div>

          <div className="w-72 shrink-0">
            <CheckoutPriceSidebar
              originalTotal={originalTotal}
              discount={discount}
              totalAmount={discountedTotal}
              onAction={step === 1 ? handleContinueToSummary : handlePlaceOrder}
              actionLabel={step === 1 ? 'Continue' : 'Place Order'}
              actionLoading={placingOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
