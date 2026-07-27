# 🛒 Online Store Console Application (Node.js)

## Overview

This project is a **console-based Online Store** built with **Node.js** using modern **JavaScript (ES Modules)**.
The application allows customers to browse products, apply filters, place orders, and view their purchase history,


---

## Features

### Authentication

* Login as **Admin** or **Customer**.
* Pre-seeded data including:

  * At least one Admin.
  * At least one Customer.
  * Multiple Categories.
  * Multiple Items distributed across categories.


### Repository Pattern

A reusable `Repository` class manages different entity types.

```javascript
repository.add(item);
repository.findById(id);
repository.getAll();
repository.find(predicate);
```

The same repository implementation is reused for Users, Items, Categories, Orders, and other entities.

---

### Higher-Order Functions

Filtering is implemented using predicates.

Example:

```javascript
itemRepository.find(item => item.Price < 100);
```

This avoids creating a separate repository method for every filter.

---

### Array Methods

The application makes extensive use of:

* `map()`
* `filter()`
* `find()`
* `reduce()`
* `sort()`
* `flatMap()`
* `Object.groupBy()`

These methods are used for filtering, grouping, statistics, and reporting.

---

### Error Handling

a class with constructor error message that you can throw overall the project when error is occurred

---

## Order Processing Flow

When a customer places an order:

1. Verify stock availability.
2. Validate customer balance.
3. Deduct stock.
4. Deduct customer balance.
5. Save the order asynchronously.
6. Display the purchase receipt.

If any step fails, the order is cancelled and the user receives a clear error message.

---

## Filtering Features

Customers can filter products by:

* Category
* Price range
* Product name
* Available stock

Filters can be combined to perform advanced searches.

Example:

* Electronics
* Price below $200
* Name contains "pro"
* In stock only

---

## Grouping Features

The application supports:

### Items grouped by category

Displays all items organized under their categories.

### Stock statistics

Displays:

* Number of items per category.
* Total inventory value for each category.

### Customer order history

Displays purchased items grouped by Item ID with the total quantity purchased.

---

## Technologies Used

* Node.js v24.14.0
* Console Application

No external npm packages were used.

---

## Running the Project

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd OnlineStore
```

Install dependencies (if needed):

```bash
npm install
```

Run the application:

```bash
node index.js
```

---

## Learning Outcomes

This project demonstrates practical use of:

* Modern JavaScript syntax
* Object-Oriented Programming
* Repository Pattern
* Higher-Order Functions
* Functional Array Methods
* Asynchronous Programming
* Error Handling
* Modular Application Design

---

## part B

### snippet 1

// (a)
console.log(x);
var x = 10;

 return undefined


// (b) — run on its own
console.log(y);
let y = 10;

throw error

// (c)
greet();
function greet() { console.log("hello"); }

print hello

// (d) — run on its own
speak();
var speak = function () { console.log("hi"); };

print function proerties

### snippet 2

console.log(1 + "2");
12
console.log("5" - 1);
4
console.log(1 + 2 + "3");
33
console.log([] == false);
true
console.log(null == undefined);
truw
console.log(null === undefined);
false
console.log(NaN === NaN);
true

### snippet 3
const a = [];
for (var i = 0; i < 3; i++) a.push(() => i);
console.log(a.map(f => f()));
0,1,2

const b = [];
for (let j = 0; j < 3; j++) b.push(() => j);
console.log(b.map(f => f()));
0,1,2


### snippet 4
const store = {
  name: "Acme",
  greet() { return `hi from ${this.name}`; },
};
const fn = store.greet;
console.log(store.greet());
console.log(fn());

hi from Acme
method properties

### snippet 5

console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

A
D
B
C









## Author

**Ammar Mostafa**

Full Stack Developer (ASP.NET Core & Angular)
