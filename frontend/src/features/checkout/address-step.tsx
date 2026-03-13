import { Loader2 } from 'lucide-react';
import { AddressForm } from './address-form';
import type { Address } from '../../types/address';

interface AddressStepProps {
  addresses: Address[];
  loading: boolean;
  selectedAddressId: string | null;
  showForm: boolean;
  onSelectAddress: (id: string) => void;
  onShowForm: () => void;
  onHideForm: () => void;
  onAddressSaved: (address: Address) => void;
  onContinue: () => void;
}

export function AddressStep({
  addresses,
  loading,
  selectedAddressId,
  showForm,
  onSelectAddress,
  onShowForm,
  onHideForm,
  onAddressSaved,
}: AddressStepProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-sm">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Delivery Address</h3>
        {addresses.length > 0 && !showForm && (
          <button
            onClick={onShowForm}
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            + Add New Address
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 size={24} className="animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="px-6 py-4 flex flex-col gap-4">
          {addresses.length > 0 && !showForm && (
            <div className="flex flex-col gap-3">
              {addresses.map((addr) => (
                <label
                  key={addr.id}
                  className={`flex gap-3 p-4 border rounded cursor-pointer transition-colors ${
                    selectedAddressId === addr.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAddressId === addr.id}
                    onChange={() => onSelectAddress(addr.id)}
                    className="mt-1 accent-blue-600 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-800 text-sm">
                        {addr.fullName}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium uppercase tracking-wide">
                        {addr.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {addr.line1}, {addr.line2}
                      {addr.landmark ? `, ${addr.landmark}` : ''}, {addr.city},{' '}
                      {addr.state} {addr.pincode}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">{addr.phone}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          {showForm && (
            <AddressForm
              onSave={onAddressSaved}
              onCancel={addresses.length > 0 ? onHideForm : undefined}
            />
          )}
        </div>
      )}
    </div>
  );
}
