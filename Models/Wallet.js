import { Repository } from "../Repositories/RepositoryService.js";
import { AddDataToJson,ReadFromJson } from "../Services/JsonFileService.js";
import { setTimeout } from "node:timers/promises";

export class Wallet extends Repository{
    UserId;
    Balance;
    constructor(){
        super("Wallets","./Payment.json")
    }
    async updateWalletBalnce(userId,subtractedBalance){
        console.log("processing payment ...");
        await setTimeout(1000);
        const json=await ReadFromJson("./Payment.json")
        let userWallet=await json.Wallets.find(a=>a.UserId==userId)
        userWallet.Balance-=subtractedBalance;
        await AddDataToJson(json,"./Payment.json")
    }
}

