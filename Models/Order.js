import { Repository } from "../Repositories/RepositoryService.js";

export class Order extends Repository {
    Id;
    CustomerId;
    OrderItems;
    TotalPrice;
    constructor(){
        super("Orders")
    }
    updateOrderPrice(id){
        const json=ReadFromJson()
        json[this.arrName]=this.data
        let item=this.findById(id)
        for(let item of json.OrderItems){
            if(item.OrderId==id){
                this.TotalPrice+=json.Items.findById(item.ItemId).Price
            }
        }
        AddDataToJson(json)
    }
}