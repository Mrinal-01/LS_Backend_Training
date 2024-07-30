const l1=document.getElementById('circle1')
const l2=document.getElementById('circle2')
const l3=document.getElementById('circle3')


currentColor='Red'
let i = 10

function traficControl(){
    if(currentColor==='Red'){
        l3.style.backgroundColor='rgb(11, 28, 11)'
        l1.style.backgroundColor='Red'
        countDown(i)
        setTimeout(() => {
            currentColor='Yellow'
            traficControl();
           
        }, 10000);
    }
    else if(currentColor==='Yellow'){
        l1.style.backgroundColor='rgb(36, 8, 8)'
        l2.style.backgroundColor='Yellow'
        i=3
        countDown(i)
        setTimeout(() => {
            currentColor='Green'
            traficControl()
            l2.style.backgroundColor='rgb(43, 43, 13)'
        }, 3000);
    }
    else{
        l3.style.backgroundColor='Green'
        i = 7
        countDown(i)
        setTimeout(() => {
            currentColor='Red'
             i = 10
            traficControl()
        }, 7000);
    }
    
}
function countDown(i){
        document.getElementById('show').innerHTML=i
        i--
        let temp=setInterval(() => {
            if(i>=0) {
                document.getElementById('show').innerHTML=i
                i--
            } else {
                clearInterval(temp)
            }
        }, 1000);
}















