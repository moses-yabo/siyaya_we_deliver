
export interface IBookingService <T>{
    getAllBookings():Promise<T[]>;
    getBookingById(bookingId: string): Promise<T | null>;
    createBooking(bookingData: T): Promise<T>;
    updateOneBookingById(bookingId: string, updateData: T): Promise<boolean>;
    updateManyBookingById(bookingId: string, updateData: T): Promise<boolean>;
    deleteBookingById(bookingId: string): Promise<boolean>;

}