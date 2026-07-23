import fs from "fs";
export function ReadFromJson(){
    return JSON.parse(fs.readFileSync("./Data.json","utf-8"))
}

export function AddDataToJson(data){
    fs.writeFileSync("./Data.json",JSON.stringify(data,null,4)
    );
}