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
    async updateOrderPrice(id){
        const json=await ReadFromJson("./Data.json")
        let order=await json.Orders.find(a=>a.Id==id)
        for(let item of json.OrderItems){
            if(item.OrderId==order.Id)
            {
                order.TotalPrice+=(await json.Items.find(a=>a.Id==item.ItemId)).Price * item.Quantity
            }
        }
        let walletService=new Wallet()
        let userWallet=await walletService.find(a=>a.UserId==order.CustomerId)
        if(userWallet.Balance<order.TotalPrice){
                throw new Error("your balance is not enough")
        }
        else{
            await walletService.updateWalletBalnce(order.CustomerId,order.TotalPrice)
            await AddDataToJson(json,"./Data.json")
        }
    }
}
