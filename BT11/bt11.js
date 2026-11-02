//Cau 1
let names = ["John", "Alice"];
names.push("Tom");
console.log(names);

//Cau 2
let n = [1, 2, 3, 4];
let newArray = n.map((hehe) => {
    return hehe * hehe;
});
console.log(newArray);

//Cau 3
let so = [5, 10, 15, 20, 25];
let arr = so.filter((v)=>{
    return v % 2 ===0;
});
console.log(arr);

//Cau 4
let sv =[{ name: 'John', score: 7 }, 
    { name: 'Alice', score: 9 }, 
    { name: 'Tom', score: 8 }];
let find = sv.find((m)=>{
    return m.score >8;
})
console.log(find);

//Cau 5
let number = [3, 5, 8, 12, 15];
let tim = number.findIndex((c)=>{
    return c > 10
})
console.log(tim);

//Cau 6
let alphabet = ['a', 'b', 'c', 'd', 'e'];
alphabet.splice(3,0,'f');
console.log(alphabet);


//Cau 7
let obj = {name: 'Tom',
    age: 21,
    major: 'Computer Science'};
console.log(Object.keys(obj));

//Cau 8
let object = { name: 'Tom', 
    age: 21, 
    major: 'Computer Science' };
console.log(Object.values(object));

//Cau 9
let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, d: 4 };
let merge = Object.assign({},obj1 ,obj2);
console.log(merge);


//Cau 10
const numbers = [1,2,3];
const newNumbers = [...number, 4];
console.log(newNumbers);


//Cau 11
let person = { name: 'Alice', age: 25 };
let updated = {...person,
    job : 'Developer'};
console.log(updated);


//Cau 12
let ten = ['john', 'alice', 'tom'];
let newten = ten.map(ten => ten.toUpperCase());
console.log(newten);


//Cau 13
let s = [1, 2, 3, 4, 5, 6];
let news = s.filter((itemn) => {
    return itemn % 2 === 0;
}).reduce((sum, itemn) => {
    return sum + itemn;
}, 0);
console.log(news); 

//Cau 14
let a = [1, 2, 2, 3, 4, 4, 5];
let uniqueArr = a.filter((item, index) => a.indexOf(item) === index);
console.log(uniqueArr);


