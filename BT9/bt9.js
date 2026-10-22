//
let chu = ["Alice", "Bob", "Charlie", "David", "Eve" ];
let newvalue ="Mind_X";
let insert =1;
for(let i = chu.length-1; i>=insert ;i--)
{
    chu[i+1]=chu[i];
}
chu[insert]= newvalue;
chu[chu.insert]="Bye";
console.log(chu);




//Cau 1
const names = ["Alice", "Bob", "Charlie", "David", "Eve"];
console.log(names[0]);
console.log(names[4]);




//Cau 2
const name1 = ["John", "Jane", "Jim", "Jake"];
name1[1]="Mary";
console.log(name1);




//Cau 3
const name2 = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"];

for(let i=0;i<=name2.length;i++)
{
    console.log(name2);
}




//Cau 4
const name3 = ["Alice", "Bob", "Charlie", "David"];
let them = "MindX";
let value = [];

for(let i =name3.length-1; i >=0 ;i--)
{
    value[i]= name3[i];
}

value[value.length]=them;
console.log(value);



//Cau 5
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for(let i = 0;i<=numbers.length;i++)
{
    if(numbers[i]%2 !==0)
        console.log(numbers[i]);
}




//Cau 6
const name4 = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"];
let search = "David"

for(let i =0 ;i <=name4.length;i++)
{
    if(name4[i]===search)
    {
        console.log(`${search}`);
        break;
    }
}



//Cau 7
const number1 = [1, 2, 3, 4, 2, 1, 3, 2, 4, 2];
const targetCounting = 2;
let count =0;
for(i = 0; i<=number1.length;i++)
{
    if(number1[i]===targetCounting)
    {
        count++;
    }
}
console.log(count);



//Cau 8
const number2 = [5, 2, 9, 3, 7, 11, 8];
let max = number2[0];

for (let i = 1; i < numbers.length; i++) {
    max = (number2[i] > max) ? number2[i] : max;
}

console.log(max);



//Cau 9
const array = [1, 2, 3, 4, 5];
array.reverse();
console.log(array);



//Cau 10
const duplicatesArray = [1, 2, 2, 3, 4, 4, 5];
const result = [];

for(let i = 0; i < duplicatesArray.length ; i++)
{
    if(!result.includes(duplicatesArray[i]))
    {
        result.push(duplicatesArray[i]);
    }
}
console.log(result);



//Cau 11
const number3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = 0; 

for (let i = 0; i < numbers.length; i++) 
{
    sum = sum + numbers[i]; 
}
console.log(sum);