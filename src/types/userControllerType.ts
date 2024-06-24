
export interface IUserController <TRequest>{
    get_all_available_users:TRequest;
    get_user_by_id:TRequest;
    add_user:TRequest;
    updateOne_user:TRequest;
    updateMany_user:TRequest;
    remove_user:TRequest;

}