export type AddressType = 'HOME' | 'WORK';

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  alternatePhone: string | null;
  pincode: string;
  state: string;
  city: string;
  line1: string;
  line2: string;
  landmark: string | null;
  isDefault: boolean;
  type: AddressType;
  createdAt: string;
  updatedAt: string;
}

export interface AddAddressInput {
  fullName: string;
  phone: string;
  alternatePhone?: string;
  pincode: string;
  state: string;
  city: string;
  line1: string;
  line2: string;
  landmark?: string;
  isDefault?: boolean;
  type?: AddressType;
}
