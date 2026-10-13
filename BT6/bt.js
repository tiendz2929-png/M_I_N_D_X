//Cau 1
let length = 4;
let width = 5;
let area = length * width;
let perimeter = (length + width) *2;
console.log(`Dien tich hinh chu nhat la : ${area} `);
console.log(`Chu vi hinh chu nhat :${perimeter}`);


//Cau 2
let S =12345;
let gio = (S -S%3600)/3600;
let phut = ((S % 3600)-(S%3600)%60)/60;
let giay = S - phut*60-gio*3600;

console.log(S);
console.log(`${gio}h ${phut}phut ${giay}giay `);

//Cau 3
let luyThua =2;
let coSo =5;
let ketqua = Math.pow(coSo,luyThua);
console.log(ketqua);

//Cau 4

let a =3;
let b =4;
let c =5;
let tbc =(a+b+c)/3;
console.log(`a= ${a}\t b=${b}\t c=${c}`);
console.log(`Trung binh cong cua 3 so : ${tbc} `);

//Cau 5
let x1 = 4;
let x2 = 5;
let y1 = 6;
let y2 = 7;

let bphuongX = Math.pow(x1,x2);
let bphuongY = Math.pow(y1,y2);
let kcach = Math.sqrt(bphuongX + bphuongY)

console.log(`Khoang cach cac diem toa do: ${kcach}`);


//Cau 6
let z = 6;
let x = 12;
let v = 4;
let result1 = z >=x && x === v;
let result2 = z >=x || x === v;
console.log(`${result1}
    , ${result2}`);

//Cau 7

let chu1 ="Toi la ai ?"
let chu2 = "Toi la la?";
let so1 = 5;
let so2 = "5"

let kq = chu1 == chu2 && so1 ==so2;
console.log(kq);


//Cau 8
let input = 5;
console.log(`Input = ${input}`);
let duong = input > 0;
console.log(`Test : ${input} la so duong  ${duong}`);

//Cau 9
let nhap =2024;
let tinh = nhap % 400 === 0 || nhap % 4 === 0 && nhap % 100 != 0;
console.log(`Nam ${nhap} la nam nhuan : ${nhap} ${tinh} `);


//Cau 10
let h1 =23;
let m1 = 30;

let h2 =19;
let m2 =50;

let kt = (h1>h2) || (h1=== h2 && m1>m2);
console.log(`Thoi gian 1 lon hon thoi gian 2 : ${kt}`);

if(kt)
        {
          console.log(`${h1}h${m1} lon hon ${h2}${m2}`);  
        }
    else
        {
         console.log(`${h1}h${m1} nho hon ${h2}${m2}`);  
        }