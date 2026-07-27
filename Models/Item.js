import { Repository } from "../Repositories/RepositoryService.js";
import {AddDataToJson,ReadFromJson} from "../Services/JsonFileService.js"
export class Item extends Repository{
    Id;
    Name;
    Price;
    CategoryId;
    Quantity;
    constructor(){
        super("Items","./Data.json")
    }
    async updateItemQuantity(id,subtractedQuantity){
        const json=await ReadFromJson("./Data.json")
        // json[this.arrName]=this.data
        let item=await json.Items.find(a=>a.Id==id)
        item.Quantity-=subtractedQuantity
        await AddDataToJson(json,"./Data.json")
    }
}
