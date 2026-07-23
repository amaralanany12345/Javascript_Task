import { Repository } from "../Repositories/RepositoryService.js";
import {ReadFromJson,AddDataToJson} from "../Services/JsonFileService.js"
const data=ReadFromJson();
export class Category extends Repository{
    Id;
    Name;
    Items;
    constructor(){
        super("Categories")
    }

}