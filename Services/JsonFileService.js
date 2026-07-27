import fs from "fs";
export function ReadFromJson(path){
        return JSON.parse(fs.readFileSync(path,"utf-8"))
}

export function AddDataToJson(data,path){
        fs.writeFileSync(path,JSON.stringify(data,null,4)
    );
}

