import { IUserService } from "../types/IUserService";
import { IUser } from "../types/userTypes";
import UserModel from "../models/UserSchema";
import { AppError } from "../utils/AppErrorHandling";
export class UserServices implements IUserService<IUser>{
/**
 * Retrieves all users from the database.
 * 
 * This method fetches all user documents from the UserModel collection. 
 * If an error occurs during the retrieval process, a AppError is thrown.
 * 
 * @async
 * @function getAllUsers
 * @returns {Promise<IUser[]>} A promise that resolves to an array of IUser objects.
 * @throws {AppError} Throws an error if users are not found or if there is an issue with the database query.
 * 
 * @example
 * // Example usage in an async function
 * try {
 *   const users = await userService.getAllUsers();
 *   console.log(users);
 * } catch (error) {
 *   console.error(error.message); // User not found
 * }
 */
    public async getAllUsers(): Promise<IUser[]> {
    try {
        const users:IUser[] = await UserModel.find({});
        return users;
    } catch (error) {

        throw new AppError("User not found",404);
    }
}
/**
 * Retrieves a user by their ID from the database.
 * 
 * This method fetches a user document from the UserModel collection by the given userId.
 * If the user is not found, it throws a AppError.
 * 
 * @async
 * @function getUserById
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<IUser>} A promise that resolves to an IUser object.
 * @throws {AppError} Throws an error if the user is not found.
 * 
 * @example
 * // Example usage in an async function
 * try {
 *   const user = await userService.getUserById('someUserId');
 *   console.log(user);
 * } catch (error) {
 *   console.error(error.message); // taxi not Found
 * }
 */

public async getUserById(userId: string): Promise<IUser>{
   try {
    const user:IUser | null = await UserModel.findById(userId);
        if (!user) {
            throw new AppError("taxi not Found",404);
        }
        return user;
   } catch (error) {

    throw error
   }
    }
   /**
 * Creates a new user in the database.
 * 
 * This method creates a new user document in the UserModel collection with the given userData.
 * 
 * @async
 * @function createUser
 * @param {IUser} userData - The data of the user to create.
 * @returns {Promise<IUser>} A promise that resolves to the created IUser object.
 * @throws {Error} Throws an error if there is an issue with creating the user.
 * 
 * @example
 * // Example usage in an async function
 * try {
 *   const newUser = await userService.createUser({
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     user_name: 'johndoe123',
 *     email: 'john.doe@example.com',
 *     password: 'securePassword123',
 *     role: 'USER'
 *   });
 *   console.log(newUser);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
   public async createUser(userData: IUser): Promise<IUser> {
    try {
        const user:IUser = await UserModel.create(userData);
        return user;
    } catch (error) {
        throw error;
    }
    }
/**
 * Updates a user by their ID.
 * 
 * This method updates a user document in the UserModel collection with the given userData.
 * 
 * @async
 * @function updateOneUserById
 * @param {string} userId - The ID of the user to update.
 * @param {IUser} userData - The data to update the user with.
 * @returns {Promise<boolean>} A promise that resolves to true if the user was updated successfully.
 * @throws {AppError} Throws a AppError if the user is not found.
 * @throws {Error} Throws a generic error if there is an issue with updating the user.
 * 
 * @example
 * // Example usage in an async function
 * try {
 *   const updated = await userService.updateOneUserById('60d21b4667d0d8992e610c85', {
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     user_name: 'johndoe456',
 *     email: 'john.doe456@example.com'
 *   });
 *   if (updated) {
 *     console.log('User updated successfully');
 *   }
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
    public async updateOneUserById(userId: string, userData:IUser): Promise<boolean> {
        try {
            const userUpdate = await UserModel.findByIdAndUpdate(userId, userData, { new: true });
            if (!userUpdate) {
                throw new AppError("User not found",404);
            }
                return true;
           } catch (error) {
            throw error
           }
    }
/**
 * Updates multiple fields of a user by their ID.
 * 
 * This method updates a user document in the UserModel collection with the given updateData.
 * 
 * @async
 * @function updateManyUserById
 * @param {string} userId - The ID of the user to update.
 * @param {IUser} updateData - The data to update the user with.
 * @returns {Promise<boolean>} A promise that resolves to true if the user was updated successfully.
 * @throws {AppError} Throws a AppError if the user is not found.
 * @throws {Error} Throws a generic error if there is an issue with updating the user.
 * 
 * @example
 * // Example usage in an async function
 * try {
 *   const updated = await userService.updateManyUserById('60d21b4667d0d8992e610c85', {
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     user_name: 'johndoe456',
 *     email: 'john.doe456@example.com'
 *   });
 *   if (updated) {
 *     console.log('User updated successfully');
 *   }
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
    public async updateManyUserById(userId: string, updateData:IUser): Promise<boolean> {
        try {
            const userUpdate = await UserModel.updateOne({ _id: userId }, { $set:updateData});
            if (userUpdate.modifiedCount === 0) {
                throw new AppError("User not found",404);
            }
            return true;
        } catch (error) {
            //Proper Error Handling && Logger ?? winston
            throw error;
        }
    }
/**
 * Deletes a user by their ID.
 * 
 * This method deletes a user document from the UserModel collection based on the provided userId.
 * 
 * @async
 * @function deleteUserById
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the user was deleted successfully.
 * @throws {AppError} Throws a AppError if the user is not found.
 * @throws {Error} Throws a generic error if there is an issue with deleting the user.
 * 
 * @example
 * // Example usage in an async function
 * try {
 *   const deleted = await userService.deleteUserById('60d21b4667d0d8992e610c85');
 *   if (deleted) {
 *     console.log('User deleted successfully');
 *   }
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
    public async  deleteUserById(userId: string): Promise<boolean> {
        try {
            const userDelete = await UserModel.findByIdAndDelete(userId);
            if (!userDelete) {
              throw new AppError('Trailer not found',404);
            }
            return true
        } catch (error) {
            throw error;
        }
    }

}