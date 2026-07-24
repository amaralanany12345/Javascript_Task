import { Repository } from "../Repositories/RepositoryService.js";
import { ReadFromJson,AddDataToJson } from "../Services/JsonFileService.js";
import { Wallet } from "./Wallet.js";
import { Error } from "../ErrorHandling/ErrorHandle.js";
export class Order extends Repository {
    Id;
    CustomerId;
    OrderItems;
    TotalPrice;
    constructor(){
        super("Orders","./Data.json")
    }
    updateOrderPrice(id){
        const json=ReadFromJson("./Data.json")
        json[this.arrName]=this.data
        let order=this.findById(id)
        for(let item of json.OrderItems){
            if(item.OrderId==order.Id)
            {
                order.TotalPrice+=json.Items.find(a=>a.Id==item.ItemId).Price * item.Quantity
            }
        }
        let walletService=new Wallet()
        let userWallet=walletService.getAll().find(a=>a.UserId==order.CustomerId)
        if(userWallet.Balance<order.TotalPrice){
                throw new Error("your balance is not enough")
        }
        else{
            walletService.updateWalletBalnce(order.CustomerId,order.TotalPrice)
            AddDataToJson(json,"./Data.json")
        }
    }
}
