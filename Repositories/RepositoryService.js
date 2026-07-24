import {ReadFromJson,AddDataToJson} from "../Services/JsonFileService.js"

export class Repository {
    constructor(arrName,pathFile)
    {
        this.arrName=arrName
        this.pathFile=pathFile
        const jsonData=ReadFromJson(pathFile);
        this.data=jsonData[arrName]
    }
    getAll()
    {
        return this.data;
    }
    add(item)
    {
        this.data.push(item)
        const jsonData=ReadFromJson(this.pathFile);
        jsonData[this.arrName]=this.data;
        AddDataToJson(jsonData,this.pathFile)
        return item
    }
    findById(Id)
    {
        return this.data.find(item=>item.Id===Id)
    }            
    find(predicate){
       return this.data.find(predicate)
    }
          
}