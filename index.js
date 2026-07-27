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

Input.question('Enter your id: ', (id) => {
    let user=userService.findById(parseInt(id));
    if(user==null){
        console.log("not found , please signup")
         Input.question("Enter your name: ",(name)=>{
            Input.question("Enter your email: ",(email)=>{
                userService.add({
                    Id:userService.getAll()[userService.getAll().length-1].Id+1,
                    Name:name,
                    Email:email,
                    Type:"customer"
                })
                WalletService.add({
                    UserId:userService.getAll()[userService.getAll().length-1].Id,
                    Balance:2000
                })
                customerMenu(user)
            })
        })
    }
    else{
        if(user.Type=="customer"){
            customerMenu(user)
        }
        else{
            console.log("admin")
            Input.close()
        }
    }

});

function customerMenu(customer){
        console.log("Add order : 1 ");
        console.log("get item within price range : 2 ");
        console.log("get item By name : 3 ");
        console.log("get items in stock only : 4 ");
        console.log("get category items : 5 ");
        console.log("show items grouped by category : 6 ");
        console.log("show total stock value per category : 7 ");
        console.log("Show the customer’s order history grouped by item : 8 ");
        Input.question("Enter number : ",(number)=>{
            switch(number)
            {
                case "1":
                    let newOrder=orderService.add({
                        Id:orderService.getAll().length>0 ? orderService.getAll()[orderService.getAll().length-1].Id+1 : 1 ,
                        CustomerId:customer.Id,
                        TotalPrice:0
                    })
                    AddItemToOrder(newOrder)
                    break;
                case "2":
                    Input.question("enter min price : ",(min)=>{
                        Input.question("enter max price : ",(max)=>{
                            console.log(itemService.getAll().filter(a=>a.Price>=parseInt(min) && a.Price<=parseInt(max)))
                            customerMenu(customer)
                        })
                    })
                    break;
                case "3":
                    Input.question("enter name of item : ",(itemName)=>{
                        console.log(itemService.getAll().filter(a=>a.Name.includes(itemName)))
                        customerMenu()
                    })
                    break;
                case "4":
                        console.log(itemService.getAll().filter(a=>a.Quantity>0))
                        customerMenu()
                    break;
                case"5":
                    Input.question("enter category id : ",(categoryId)=>{
                        console.log(itemService.getAll().filter(a=>a.CategoryId==parseInt(categoryId)))
                        customerMenu(customer)
                    })
                    break;
                case"6":
                    categoryService.getAll().forEach(element => {
                        console.log("category name is : "+element.Name)
                        console.log("category items are : ")
                        console.log(itemService.getAll().filter(a=>a.CategoryId==element.Id))
                    });
                    customerMenu(customer)
                    break;
                case"7":
                    categoryService.getAll().forEach(element => {
                        let categoryItems=itemService.getAll().filter(a=>a.CategoryId==element.Id)
                        let stockValue=categoryItems.reduce((total,value)=>total+value.Price*value.Quantity,0)
                        console.log(`category name is : ${element.Name} , total stock value is ${stockValue} `)
                    });
                    customerMenu(customer)
                    break;
                case"8":
                    let data=Object.groupBy(orderService.getAll(),a=>a.CustomerId)
                    for(let x in data){
                        data[x]=data[x].map(a=>({
                            ...a,OrderItems:orderItemService.getAll().filter(item=>item.OrderId==a.Id)
                        }))                       
                    }
                    for(let x in data){
                            let  allItems = data[x].flatMap(a=>a.OrderItems);
                            let custItems=Object.groupBy(allItems,a=>a.ItemId)
                            for(let y in custItems){
                                let totalQuantity=custItems[y].reduce((total,value)=>total+value.Quantity,0)
                                console.log(`item name is ${itemService.getAll().find(a=>a.Id==y).Name} , total quantity is ${totalQuantity}`)
                            }
                        console.log('----')
                    }

                    Input.close()
                    break;
                case "0":
                    Input.close();
                    break;
                default:
                    console.log("your choise is invalid")
                    customerMenu(customer)
            }
        })
}

function AddItemToOrder(newOrder){
    console.log("add newItem to order : 1 ")
    console.log("Guess the check : 2 ")
    console.log("customer menu : 3 ")
    Input.question("enter option number : ",(number)=>{
        switch(number){
            case "1":
                Input.question("enter item id : ",(itemId)=>{
                    if(itemService.findById(parseInt(itemId))!=null)
                    {
                        Input.question("enter quantity : ",(quantity)=>{
                            if(itemService.findById(parseInt(itemId)).Quantity > parseInt(quantity))
                            {
                                orderItemService.add({
                                    OrderId:newOrder.Id,
                                    ItemId:parseInt(itemId),
                                    Quantity:parseInt(quantity)
                                })
                                itemService.updateItemQuantity(parseInt(itemId),parseInt(quantity))
                                AddItemToOrder(newOrder)
                            }
                            else{
                                throw new Error("quantity out of stock")
                            }
                        })
                    }
                    else{
                                throw new Error("item is not found")
                    }
                })
                break;
            case "2":
                orderService.updateOrderPrice(newOrder.Id)
                AddItemToOrder(newOrder)
                break;
            case "3":
                Input.close();
                break;

            default :
            console.log("your choise is invalid")
            AddItemToOrder(newOrder)
        }
    })
}


