import { Repository } from "../Repositories/RepositoryService.js";

export class Admin extends Repository{
    Id;
    Name;
    Email;
    constructor(){
        super("Admins")
    }
}