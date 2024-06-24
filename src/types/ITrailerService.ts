
export interface ITrailerService <T>{
    getAllTrailers():Promise<T[]>;
    getTrailerById(trailerId: string): Promise<T | null>;
    createTrailer(trailerData: T): Promise<T>;
    updateOneTrailerById(trailerId: string, updateData: T): Promise<boolean>;
    updateManyTrailerById(trailerId: string, updateData: T): Promise<boolean>;
    deleteTrailerById(trailerId: string): Promise<boolean>;
}