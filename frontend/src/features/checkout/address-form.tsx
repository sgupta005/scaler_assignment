import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { addAddress } from '../../api/addresses';
import type { Address, AddAddressInput, AddressType } from '../../types/address';

interface AddressFormProps {
  onSave: (address: Address) => void;
  onCancel?: () => void;
}

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Chandigarh', 'Puducherry',
];

export function AddressForm({ onSave, onCancel }: AddressFormProps) {
  const [form, setForm] = useState<AddAddressInput>({
    fullName: '',
    phone: '',
    alternatePhone: '',
    pincode: '',
    state: '',
    city: '',
    line1: '',
    line2: '',
    landmark: '',
    isDefault: false,
    type: 'HOME',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function setType(type: AddressType) {
    setForm((prev) => ({ ...prev, type }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const saved = await addAddress(form);
      onSave(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save address');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-3 py-2">
          {error}
        </div>
      )}

      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            10-Digit Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
            maxLength={10}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Pincode + State + City */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="6 digits [0-9]"
            required
            maxLength={6}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            State <span className="text-red-500">*</span>
          </label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors bg-white"
          >
            <option value="">--Select State--</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            City/District/Town <span className="text-red-500">*</span>
          </label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City / District / Town"
            required
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Address lines */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          Address (Area and Street) <span className="text-red-500">*</span>
        </label>
        <input
          name="line1"
          value={form.line1}
          onChange={handleChange}
          placeholder="Address line 1"
          required
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors mb-2"
        />
        <input
          name="line2"
          value={form.line2}
          onChange={handleChange}
          placeholder="Address line 2"
          required
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Landmark + Alternate Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Landmark (Optional)
          </label>
          <input
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            placeholder="E.g. near Apollo Hospital"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Alternate Phone (Optional)
          </label>
          <input
            name="alternatePhone"
            value={form.alternatePhone}
            onChange={handleChange}
            placeholder="Alternate Mobile Number"
            maxLength={10}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Address type */}
      <div>
        <label className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-2">
          Type of Address
        </label>
        <div className="flex gap-3">
          {(['HOME', 'WORK'] as AddressType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                form.type === t
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Default checkbox */}
      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          name="isDefault"
          checked={form.isDefault}
          onChange={handleChange}
          className="w-4 h-4 accent-blue-500"
        />
        Make this my default address
      </label>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#fb641b] hover:bg-[#e85d18] text-white font-semibold px-8 py-2.5 rounded-sm transition-colors flex items-center gap-2 disabled:opacity-70"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          Save and Deliver Here
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-blue-600 font-medium hover:underline px-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
