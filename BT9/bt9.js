//Cau 1
let student = {
   name : "John",
   age : 20 
};
student.major = "Computer Science" ;
console.log(student);


//Cau 2
const person = {
    name : "Alice",
    age : 25,
    job : "Designer"
};

delete person.job;
console.log(person);


//Cau 3
const car = {
    brand: "Toyota", 
    model: "Camry", 
    year: 2020
};
let count = 0;

for (let i in car) 
{
    count++;
}
console.log(count);


//Cau 4
const product = { name: "Laptop", price: 1000 };

const keyValueArray = Object.entries(product);

console.log(keyValueArray);


//Cau 5
const product1 = [ { name: "Phone", price: 500 }, 
    { name: "Camera", price: 300 }, 
    { name: "Tablet", price: 700 } ] ;
const foundProduct = product1.find(product1 => product1.name === "Camera");
console.log(foundProduct);


//Cau 6
const products = [ { name: "Phone", price: 500 }, { name: "Camera", price: 300 }, { name: "Tablet", price: 700 } ];
for(let i = 0; i <= products.length;i++)
{
    if(products[i] > 100)
        console.log(products.name.price);
}


//Cau 7
const person1 = {
     name: "Bob", age: 25, job: "Developer" 
};
person1.age = 30;
console.log(person1);

//Cau 8
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

const gom = { ...obj1, ...obj2 };
console.log(gom);


//Cau 9
const animal = { type: "Dog", 
    name: "Buddy", 
    age: 3 };
for (let key in animal) {
    console.log(`"${key}: ${animal[key]}"`);
}



//Cau 10
const car1 = { brand : "BMW", 
    model : "X5" };
const check = "color" in car1;
console.log(check);