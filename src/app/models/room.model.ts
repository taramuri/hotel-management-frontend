export interface Room {
    _id?: string;
    number: string;
    capacity: number;
    type: 'luxury' | 'semi-luxury' | 'standard';
    price: number;
    isAvailable?: boolean;
  }