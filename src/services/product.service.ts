import { IProductService  } from "../types/IProductService";
import { Products } from "../types/productsTypes";
import ProductModel from "../models/ProductsSchema";
import { AppError } from "../utils/AppErrorHandling";
export class ProductServices implements IProductService<Products>{
    /**
     * Retrieves all products from the database.
     * 
     * @async
     * @function getAllProducts
     * @returns {Promise<Products[]>} A promise that resolves to an array of product objects.
     * @throws {AppError} If no products are found.
     */
    public async getAllProducts(): Promise<Products[]> {
        try {
            const products: Products[] = await ProductModel.find({});
            return products;
        } catch (error) {
            throw new AppError("product not found", 404);
        }
    }

    /**
     * Retrieves a specific product by its ID.
     * 
     * @async
     * @function getProductById
     * @param {string} productId - The ID of the product to retrieve.
     * @returns {Promise<Products>} A promise that resolves to the product object.
     * @throws {AppError} If the product is not found.
     */
    public async getProductById(productId: string): Promise<Products> {
        try {
            const product: Products | null = await ProductModel.findById(productId);
            if (!product) {
                throw new AppError("product not Found", 404);
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates a new product in the database.
     * 
     * @async
     * @function createProduct
     * @param {Products} productData - The data of the product to create.
     * @returns {Promise<Products>} A promise that resolves to the created product object.
     * @throws {Error} If any error occurs during the creation process.
     */
    public async createProduct(productData: Products): Promise<Products> {
        try {
            const product: Products = await ProductModel.create(productData);
            return product;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates a specific product by its ID.
     * 
     * @async
     * @function updateOneProductById
     * @param {string} productId - The ID of the product to update.
     * @param {Products} updateData - The data to update the product with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {AppError} If the product is not found.
     * @throws {Error} If any error occurs during the update process.
     */
    public async updateOneProductById(productId: string, updateData: Products): Promise<boolean> {
        try {
            const product: Products | null = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
            if (!product) {
                throw new AppError("product not Found", 404);
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates multiple products by their ID.
     * 
     * @async
     * @function updateManyProductById
     * @param {string} productId - The ID of the products to update.
     * @param {Products} updateData - The data to update the products with.
     * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
     * @throws {AppError} If the product is not found or no changes are made.
     * @throws {Error} If any error occurs during the update process.
     */
    public async updateManyProductById(productId: string, updateData: Products): Promise<boolean> {
        try {
            const productUpdate = await ProductModel.updateOne({ _id: productId }, { $set: updateData });
            if (productUpdate.modifiedCount === 0) {
                throw new AppError("Product has no changes made | Product not found", 404);
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a specific product by its ID.
     * 
     * @async
     * @function deleteProductById
     * @param {string} productId - The ID of the product to delete.
     * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful.
     * @throws {AppError} If the product is not found.
     * @throws {Error} If any error occurs during the deletion process.
     */
    public async deleteProductById(productId: string): Promise<boolean> {
        try {
            const productDelete = await ProductModel.findByIdAndDelete(productId);
            if (!productDelete) {
                throw new AppError('product not found', 404);
            }
            return true;
        } catch (error) {
            throw error;
        }
    }
}