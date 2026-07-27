import {Item} from "./Models/Item.js"
import { Category } from "./Models/Category.js";
import { Order } from "./Models/Order.js";
import { OrderItem } from "./Models/OrderItem.js";
import readline from 'readline';
import { ReadFromJson,AddDataToJson } from "./Services/JsonFileService.js";
import { Error } from "./ErrorHandling/ErrorHandle.js";
import { User } from "./Models/User.js";
import { Wallet } from "./Models/Wallet.js";


let itemService= new Item();
let categoryService=new Category()
let orderService=new Order();
let orderItemService=new OrderItem()
let userService=new User()
let WalletService=new Wallet()

const Input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function enterInput(question) {
    return new Promise(resolve => {
        Input.question(question, answer => {
            resolve(answer);
        });
    });
}

async function StartProject(){
    let id=await enterInput('Enter your id: ')
    let user=await userService.findById(parseInt(id));
    if(user==null){
        console.log("not found , please signup")
        let name=await enterInput("Enter your name: ")
        let email=await enterInput("Enter your email: ")
        user=await userService.add({
            Id:(await userService.getAll())[(await userService.getAll()).length-1].Id+1,
            Name:name,
            Email:email,
            Type:"customer"
        })
        await WalletService.add({
            UserId:(await userService.getAll())[(await userService.getAll()).length-1].Id,
            Balance:2000
        })
        await customerMenu(user)
    }
    else{
        if(user.Type=="customer"){
            await customerMenu(user)
        }
        else{
            console.log("admin")
            Input.close()
        }
    }
}


async function customerMenu(customer){
        console.log("Add order : 1 ");
        console.log("get item within price range : 2 ");
        console.log("get item By name : 3 ");
        console.log("get items in stock only : 4 ");
        console.log("get category items : 5 ");
        console.log("show items grouped by category : 6 ");
        console.log("show total stock value per category : 7 ");
        console.log("Show the customer’s order history grouped by item : 8 ");
            let number=await enterInput("Enter number : ")
            switch(number)
            {
                case "1":
                    let newOrder=await orderService.add({
                        Id:(await orderService.getAll()).length>0 ? (await orderService.getAll())[(await orderService.getAll()).length-1].Id+1 : 1 ,
                        CustomerId:customer.Id,
                        TotalPrice:0
                    })
                    await AddItemToOrder(newOrder)
                    break;
                case "2":
                    let min=await enterInput("enter min price : ")
                    let max=await enterInput("enter max price : ")
                    console.log((await itemService.getAll()).filter(a=>a.Price>=parseInt(min) && a.Price<=parseInt(max)))
                    await customerMenu(customer)
                    break;
                case "3":
                        let itemName=await enterInput("enter name of item : ")
                        console.log((await itemService.getAll()).filter(a=>a.Name.includes(itemName)))
                        customerMenu()
                    break;
                case "4":
                        console.log((await itemService.getAll()).filter(a=>a.Quantity>0))
                        await customerMenu()
                    break;
                case"5":
                        let categoryId=await enterInput("enter category id : ")
                        console.log((await itemService.getAll()).filter(a=>a.CategoryId==parseInt(categoryId)))
                        await customerMenu(customer)
                    break;
                case"6":
                    for(let element of await categoryService.getAll()){
                        console.log("category items are : ")
                        console.log("category name is : "+element.Name)
                        let categoryItems=(await itemService.getAll()).filter(a=>a.CategoryId==element.Id)
                        console.log(categoryItems)
                    }
                    await customerMenu(customer)
                    break;
                case"7":
                    for(let element of await categoryService.getAll()){
                        let categoryItems=(await itemService.getAll()).filter(a=>a.CategoryId==element.Id)
                        let stockValue=categoryItems.reduce((total,value)=>total+value.Price*value.Quantity,0)
                        console.log(`category name is : ${element.Name} , total stock value is ${stockValue} `)
                    }
                    await customerMenu(customer)
                    break;
                case"8":
                let orders=await orderService.getAll()
                let orderItems=await orderItemService.getAll()
                    let data=Object.groupBy(orders,a=>a.CustomerId)
                    for(let x in data){
                        data[x]=data[x].map(a=>({
                            ...a,OrderItems:orderItems.filter(item=>item.OrderId==a.Id)
                        }))                       
                    }
                    for(let x in data){
                            let  allItems = data[x].flatMap(a=>a.OrderItems);
                            let custItems=Object.groupBy(allItems,a=>a.ItemId)
                            for(let y in custItems){
                                let totalQuantity=custItems[y].reduce((total,value)=>total+value.Quantity,0)
                                console.log(`item name is ${(await itemService.findById(y)).Name} , total quantity is ${totalQuantity}`)
                            }
                        console.log('----')
                    }
                    await customerMenu(customer)
                    break;
                case "0":
                    Input.close();
                    break;
                default:
                    console.log("your choise is invalid")
                    await customerMenu(customer)
            }
}

async function AddItemToOrder(newOrder){
    console.log("add newItem to order : 1 ")
    console.log("Guess the check : 2 ")
    console.log("customer menu : 3 ")
        let number=await enterInput("enter option number : ")
        switch(number){
            case "1":
                    let itemId=await enterInput("enter item id : ")
                    if(await itemService.findById(parseInt(itemId))!=null)
                    {
                            let quantity=await enterInput("enter quantity : ")
                            if((await itemService.findById(parseInt(itemId))).Quantity > parseInt(quantity))
                            {
                                await orderItemService.add({
                                    OrderId:newOrder.Id,
                                    ItemId:parseInt(itemId),
                                    Quantity:parseInt(quantity)
                                })
                                await itemService.updateItemQuantity(parseInt(itemId),parseInt(quantity))
                                await AddItemToOrder(newOrder)
                            }
                            else{
                                throw new Error("quantity out of stock")
                            }
                    }
                    else{
                        throw new Error("item is not found")
                    }
                break;
            case "2":
                await orderService.updateOrderPrice(newOrder.Id)
                console.log(`total price of the order is ${(await orderService.findById(newOrder.Id)).TotalPrice} `)
                await customerMenu(await userService.findById(newOrder.CustomerId))
                break;
            case "3":
                await customerMenu(await userService.findById(newOrder.CustomerId))
                break;

            default :
            console.log("your choise is invalid")
            await AddItemToOrder(newOrder)
        }
}
StartProject()

