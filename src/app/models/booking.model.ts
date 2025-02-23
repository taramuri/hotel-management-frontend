export interface Booking {
  _id?: string;
  clientId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  client?: {
    firstName: string;
    lastName: string;
  };
  room?: {
    number: string;
    type: string;
  };
}