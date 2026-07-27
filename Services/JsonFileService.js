import fs, { read } from "fs";
import {readFile,writeFile} from "fs/promises"
export async function ReadFromJson(path){
        return JSON.parse(await readFile(path,"utf-8"))
}

export async function AddDataToJson(data,path){
        await writeFile(path,JSON.stringify(data,null,4)
    );
}

