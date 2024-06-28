"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
const AppErrorHandling_1 = require("../utils/AppErrorHandling");
class UserServices {
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
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserSchema_1.default.find({});
                return users;
            }
            catch (error) {
                throw new AppErrorHandling_1.AppError("User not found", 404);
            }
        });
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
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserSchema_1.default.findById(userId);
                if (!user) {
                    throw new AppErrorHandling_1.AppError("taxi not Found", 404);
                }
                return user;
            }
            catch (error) {
                throw error;
            }
        });
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
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserSchema_1.default.create(userData);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
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
    updateOneUserById(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUpdate = yield UserSchema_1.default.findByIdAndUpdate(userId, userData, { new: true });
                if (!userUpdate) {
                    throw new AppErrorHandling_1.AppError("User not found", 404);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
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
    updateManyUserById(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUpdate = yield UserSchema_1.default.updateOne({ _id: userId }, { $set: updateData });
                if (userUpdate.modifiedCount === 0) {
                    throw new AppErrorHandling_1.AppError("User not found", 404);
                }
                return true;
            }
            catch (error) {
                //Proper Error Handling && Logger ?? winston
                throw error;
            }
        });
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
    deleteUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDelete = yield UserSchema_1.default.findByIdAndDelete(userId);
                if (!userDelete) {
                    throw new AppErrorHandling_1.AppError('Trailer not found', 404);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserServices = UserServices;
