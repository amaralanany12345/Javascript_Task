import { Repository } from "../Repositories/RepositoryService.js";
import {AddDataToJson,ReadFromJson} from "../Services/JsonFileService.js"
export class Item extends Repository{
    Id;
    Name;
    Price;
    CategoryId;
    Quantity;
    constructor(){
        super("Items")
    }
    // updateItem(id){
    //     const json=ReadFromJson()
    //     json[this.arrName]=this.data
    //     let item=this.findById(id)
    //     console.log(json.Customers);
    //     item.Price=200
    //     AddDataToJson(json)
    // }
}
