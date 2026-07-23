import {ReadFromJson,AddDataToJson} from "../Services/JsonFileService.js"

export class Repository {
    constructor(arrName)
    {
      this.arrName=arrName
      const jsonData=ReadFromJson();
      this.data=jsonData[arrName]
    }
    getAll()
    {
        return this.data;
    }
    add(item)
    {
        this.data.push(item)
        const jsonData=ReadFromJson();
        jsonData[this.arrName]=this.data;
        AddDataToJson(jsonData)
        return item
    }
    findById(Id)
    {
        return this.data.find(item=>item.Id===Id)
    }            
    find(predicate)
    {

    }      
}