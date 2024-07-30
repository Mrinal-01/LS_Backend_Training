


const d1=document.getElementById('div1')
const d2=document.getElementById('div2')
const d3=document.getElementById('div3')
const d4=document.getElementById('div4')

const colorArr=[ 'Aqua','Red','Green','Blue']
const divs=[d1,d2,d3,d4]

// console.log(x);
    
function switchColor(){
    console.log(colorArr);
    divs[0].style.backgroundColor=colorArr[0]
    divs[1].style.backgroundColor=colorArr[1]
    divs[2].style.backgroundColor=colorArr[2]
    divs[3].style.backgroundColor=colorArr[3]
    let x=colorArr.pop()
    colorArr.unshift(x)    
}
let myColor;

function startColor(){
    myColor=setInterval(switchColor,2000)
}

function stopColor(){
    clearInterval(myColor)
}










 








// function colorChange(){
//     document.getElementById('div1').style.backgroundColor='black'
// }

