//Cau 1

let so=0;
for(let i = 0;i<=100 ; i++)
{
    so=so+ i ;
}
    console.log(`Tổng từ 1 đến 100: ${so}`);
//Cau 2

for(let i = 0;i<=100 ; i++)
{
    if (i % 3 === 0 && i % 5 ===0) {
        console.log(`Cac so chia het cho 3 va 5 : ${i}`)
    } else {
        console.log(`Cac số không chia hết cho 3 và 5: ${i}`);
    }
}

//Cau 3
let n=5;
console.log(`N = ${n}`);
if(n<0)
{
    console.log(`Loi ! Bat buoc la so nguyen`);
}
let giaithua = 1;
for(let i = 1 ; i <= n;i++ )
{
    giaithua = giaithua * i ;

}

console.log(`Giai thua cua ${n}: ${giaithua}`);

//Cau 4
for(let i = 2; i<=9 ; i++)
{
    for(let j = i+1; j<=10 ; j++){
        console.log(`${i} x ${j} = ${i * j}`);
    }
}

//Cau 5
let input = 35;
console.log(`\n Input = ${input}`);

if (input === 0) {
    console.log(`Output nhị phân : 0`);
} else {
    let kq = ""; 
    
    while(input > 0) 
        { 
        kq = (input % 2) + kq;
        input = Math.floor(input / 2); 
    }
    console.log(`Output nhị phân : ${kq}`);
}

//Cau 6
let S = 0;
let duong =10;
console.log(`N = ${duong}`);
for(let i = duong; i >= 1;i--)
{
    S = Math.sqrt(i + S);
}
console.log(`Ket qua S = ${S}`);


//Cau 7
let S1 = 0;
let d1 = 20;
console.log(`N = ${d1}`);
for(let i = d1; i >= 1;i--)
{
    S = Math.sqrt(i + S1);
}
console.log(`Ket qua S = ${S}`);