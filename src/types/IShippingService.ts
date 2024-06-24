
export interface IShippingService <T>{
    getAllShippings():Promise<T[]>;
    getShippingById(shippingId: string): Promise<T | null>;
    createShipping(shippingData: T): Promise<T>;
    updateOneShippingById(shippingId: string, updateData: T): Promise<boolean>;
    updateManyShippingById(shippingId: string, updateData: T): Promise<boolean>;
    deleteShippingById(shippingId: string): Promise<boolean>;
}