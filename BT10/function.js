//Cau 1
const pt1 = (x = 5, a = 3, b = 4) => a * x + b;
console.log(pt1(5, 3, 4));

//Cau 2
const hcn = (width, length) => (width + length) * 2;
console.log(hcn(10, 15));

//Cau 3
const circle = (r) => Math.PI * r ** 2;
console.log(Number(circle(5).toFixed(2)));

//Cau 4
const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
};
console.log(isPrime(17));

//Cau 5
const sumAll = (...args) => {
    let total = 0;
    for (let i = 0; i < args.length; i++) {
        total += args[i];
    }
    return total;
};
console.log(sumAll(1, 2, 3, 4, 5));


//Cau 6
const tongRange = (start, end) => {
    let total = 0;
    for (let i = start; i <= end; i++) {
        total += i;
    }
    return total;
};
console.log(tongRange(5, 10));

//Cau 7
const isPalindrome = (str) => {
    const reversed = str.split('').reverse().join('');
    return str === reversed;
};
console.log(isPalindrome("madam"));


//Cau 8
const checkAllEven = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 !== 0) {
            return false;
        }
    }
    return true;
};
console.log(checkAllEven([2, 4, 6, 8, 10]));

//Cau 9
const sumPositives = (arr) => {
    let t = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            t += arr[i];
        }
    }
    return t;
};
console.log(sumPositives([3, -1, 4, -2, 5]));


//Cau 10
const maxVal = (...numbers) => numbers.reduce((maxSoFar, current) => current > maxSoFar ? current : maxSoFar);
console.log(maxVal(1, 3, 7, 0, -2));


//Cau 11
const sortArray = (arr) => {
    let result = [...arr];
    for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
            if (result[j] > result[j + 1]) {
                let temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] = temp;
            }
        }
    }
    return result;
};
console.log(sortArray([12, 33, 45, 7, 89]));


//Câu 12
const findKthLargest = (arr, k) => {
    const uniqueArr = [...new Set(arr)];
    if (k <= 0 || k > uniqueArr.length) {
        return "k không hợp lệ";
    }
    uniqueArr.sort((a, b) => b - a);
    return uniqueArr[k - 1];
};
console.log(findKthLargest([2, 5, 2, 7, 9, 10], 3));

//Cau 14

const splitWords = (alphabet) => alphabet.split(" ");
console.log(splitWords("This is a test"));

//Cay 15
const data = { a: 1, b: 'hello', c: 3, d: 'world' };

const tong = (obj) => {
    let sum = 0;
    for (let key in obj) {
        if (typeof obj[key] === 'number') 
            {
            sum += obj[key];
        }
    }
    return sum;
};

console.log(tong(data));
