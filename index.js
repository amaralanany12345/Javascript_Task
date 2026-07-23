import {Item} from "./Models/Item.js"
import { Category } from "./Models/Category.js";
import { Customer } from "./Models/Customer.js";
import { Order } from "./Models/Order.js";
import { OrderItem } from "./Models/OrderItem.js";
import readline from 'readline';



var item= new Item();
var category=new Category()
var order=new Order();
var orderItem=new OrderItem()
var customer=new Customer()

const IRead = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

IRead.question('Enter your id: ', (id) => {
    var user=customer.findById(parseInt(id));
    if(user==null){
        console.log("not found , please signup")
        IRead.question("Enter your name: ",(name)=>{
            IRead.question("Enter your email: ",(email)=>{
                customer.add({
                    Id:customer.getAll()[customer.getAll().length-1].Id+1,
                    Name:name,
                    Email:email,
                    Balanace:2000
                })
            })
        })
    }
    customerMenu(user)

});

function customerMenu(customer){
        console.log("Add order: 1 ");
        console.log("get Items: 2 ");
        console.log("get item by id: 3 ");
        console.log("get categories: 4 ");
        console.log("get category: 5 ");
        console.log("get category items: 6 ");
        IRead.question("Enter number: ",(number)=>{
            switch(number)
            {
                case "1":
                    var newOrder=order.add({
                        Id:order.getAll().length>0 ? order.getAll()[order.getAll().length-1].Id+1 : 1 ,
                        CustomerId:customer.Id,
                        TotalPrice:0
                    })
                    AddItemToOrder(newOrder)
                    break;
                case "2":
                    console.log(item.getAll())
                    customerMenu(customer)
                    break;
                case "3":
                    IRead.question("enter item id : ",(itemId)=>{
                        console.log(item.findById(parseInt(itemId)))
                        customerMenu(customer)
                    })
                    break;
                case "4":
                    console.log(category.getAll())
                    customerMenu(customer)
                    break;
                case "5":
                    IRead.question("enter category id : ",(categoryId)=>{
                        console.log(category.findById(parseInt(categoryId)))
                        customerMenu(customer)
                    })
                    break;
                case"6":
                    console.log(6);
                    // IRead.question("enter category id",(categoryId)=>{
                    //     console.log(category.findById(parseInt(categoryId)))
                    // })
                    customerMenu(customer)
                    break;
                case "0":
                    IRead.close();
                    break;
                default:
                    console.log("your choise is invalid")
                    customerMenu(customer)
            }
        })
}

function AddItemToOrder(newOrder){
    console.log("add newItem to order : 1 ")
    console.log("finish : 2 ")
    IRead.question("enter option number : ",(number)=>{
        switch(number){
            case "1":
                IRead.question("enter item id : ",(itemId)=>{
                    if(item.findById(parseInt(itemId)))
                    {
                        IRead.question("enter quantity : ",(quantity)=>{
                            if(item.findById(parseInt(itemId)).Quantity > parseInt(quantity))
                            {
                                orderItem.add({
                                    OrderId:newOrder.Id,
                                    ItemId:parseInt(itemId),
                                    Quantity:parseInt(quantity)
                                })
                            }
                            AddItemToOrder(newOrder)
                        })
                    }
                })
               newOrder.updateOrderPrice(newOrder.Id)
                break;
            case "2":
                IRead.close();
                break;

            default :
            console.log("your choise is invalid")
            AddItemToOrder(newOrder)
        }
    })
}
// let x=item.findById(5)
// item.updateItem(5)
// console.log(x);