
export interface ITaxiService <T>{
    getAllTaxis():Promise<T[]>;
    getTaxiById(taxiId: string): Promise<T | null>;
    createTaxi(taxiData: T): Promise<T>;
    updateOneTaxiById(taxiId: string, updateData: T): Promise<boolean>;
    updateManyTaxiById(taxiId: string, updateData: T): Promise<boolean>;
    deleteTaxiById(taxiId: string): Promise<boolean>;
}