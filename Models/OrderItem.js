import { Repository } from "../Repositories/RepositoryService.js";

export class OrderItem extends Repository{
        OrderId;
        ItemId;
        Quantity;
        constructor(){
            super("OrderItems","./Data.json")
        }
}