import { Repository } from "../Repositories/RepositoryService.js";

export class User extends Repository {
    Id;
    Name;
    Email;
    Type;
    constructor(){
        super("Users","./Data.json")
    }
}