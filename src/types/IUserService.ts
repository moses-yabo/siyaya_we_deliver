
export interface IUserService <T>{
    getAllUsers():Promise<T[]>;
    getUserById(trailerId: string): Promise<T | null>;
    createUser(trailerData: T): Promise<T>;
    updateOneUserById(trailerId: string, updateData: T): Promise<boolean>;
    updateManyUserById(trailerId: string, updateData: T): Promise<boolean>;
    deleteUserById(trailerId: string): Promise<boolean>;
}