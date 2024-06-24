
export interface IRentalService <T>{
    getAllRentals():Promise<T[]>;
    getRentalById(rentalId: string): Promise<T | null>;
    createRental(rentalData: T): Promise<T>;
    updateOneRentalById(rentalId: string, updateData: T): Promise<boolean>;
    updateManyRentalById(rentalId: string, updateData: T): Promise<boolean>;
    deleteRentalById(rentalId: string): Promise<boolean>;
}