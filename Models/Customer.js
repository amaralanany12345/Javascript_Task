import { Repository } from "../Repositories/RepositoryService.js";

export class Customer extends Repository{
    Id;
    Name;
    Email;
    orders;
    Balance;
    constructor(){
        super("Customers")
    }
}