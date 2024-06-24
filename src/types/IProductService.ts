
export interface IProductService <T>{
    getAllProducts():Promise<T[]>;
    getProductById(productId: string): Promise<T | null>;
    createProduct(productData: T): Promise<T>;
    updateOneProductById(productId: string, updateData: T): Promise<boolean>;
    updateManyProductById(productId: string, updateData: T): Promise<boolean>;
    deleteProductById(productId: string): Promise<boolean>;
}