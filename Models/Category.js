import { Repository } from "../Repositories/RepositoryService.js";
import {ReadFromJson,AddDataToJson} from "../Services/JsonFileService.js"
import { Item } from "./Item.js";
export class Category extends Repository{
    Id;
    Name;
    Items;
    constructor(){
        super("Categories","./Data.json")
    }
}