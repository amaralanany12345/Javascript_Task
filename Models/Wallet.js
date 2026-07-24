import { Repository } from "../Repositories/RepositoryService.js";
import { AddDataToJson,ReadFromJson } from "../Services/JsonFileService.js";
export class Wallet extends Repository{
    UserId;
    Balance;
    constructor(){
        super("Wallets","./Payment.json")
    }
    updateWalletBalnce(userId,subtractedBalance){
        const json=ReadFromJson("./Payment.json")
        json[this.arrName]=this.data
        let userWallet=this.getAll().find(a=>a.UserId==userId)
        userWallet.Balance-=subtractedBalance;
        AddDataToJson(json,"./Payment.json")
    }
}

