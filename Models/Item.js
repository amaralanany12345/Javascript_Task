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
    updateItemQuantity(id,subtractedQuantity){
        const json=ReadFromJson("./Data.json")
        json[this.arrName]=this.data
        let item=this.findById(id)
        item.Quantity-=subtractedQuantity
        AddDataToJson(json,"./Data.json")
    }
}
