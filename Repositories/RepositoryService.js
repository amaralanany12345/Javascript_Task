import {ReadFromJson,AddDataToJson} from "../Services/JsonFileService.js"

export class Repository {
    constructor(arrName,pathFile)
    {
        this.arrName=arrName
        this.pathFile=pathFile
        
    }
    async getAll()
    {
        const jsonData=await ReadFromJson(this.pathFile);
        let data=jsonData[this.arrName]
        return data;
    }
    async add(item)
    {
        let data=await this.getAll()
        data.push(item)
        const jsonData=await ReadFromJson(this.pathFile);
        jsonData[this.arrName]=data;
        await AddDataToJson(jsonData,this.pathFile)
        return item
    }
    async findById(Id)
    {
        let data=await this.getAll()
        return data.find(item=>item.Id==Id)
    }            
    async find(predicate){
        let data=await this.getAll()
       return data.find(predicate)
    }
}