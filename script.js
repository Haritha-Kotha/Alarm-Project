const selectTag=document.querySelectorAll("select")
 let timeInDom=document.querySelector("h1")
 let setAlarmBtn=document.querySelector("button")
let alarmTime,isAlarmSet=false,ringtone=new Audio("ringtone.mp3");//new is used to allocate memory dynamically
let content=document.querySelector(".time-zone")
let image=document.querySelector("img")


for(let i=12;i>0;i--)
{
    i=i<10 ? "0"+i : i//to display single dits with 0
    let option=`<option value="${i}">${i}</option>`
    selectTag[0].firstElementChild.insertAdjacentHTML("afterend",option)
    
}

for(let i=59;i>=0;i--)
{
    i=i<10 ? "0"+i : i
    let option=`<option value="${i}">${i}</option>`
    selectTag[1].firstElementChild.insertAdjacentHTML("afterend",option)
    
}
for(let i=2;i>0;i--)
{
    let ampm=i==1 ? "AM" : "PM"
    let option=`<option value="${ampm}">${ampm}</option>`
    selectTag[2].firstElementChild.insertAdjacentHTML("afterend",option)
    
}
setInterval(()=>{
    let date=new Date(),
    h=date.getHours(),
    m=date.getMinutes(),
    s=date.getSeconds(),
    ampm="AM"
    ampm=h>=12 ? "PM" :"AM"

    if(h>12)
    {
        h=h-12
    }

    h=h<10 ? "0"+h : h
    m=m<10 ? "0"+m : m
    s=s<10 ? "0"+s : s

    timeInDom.innerText = `${h} : ${m} : ${s} ${ampm}`
    //console.log(alarmTime)
    //console.log(`${h} : ${m} ${ampm}`)
    if(alarmTime==`${h} : ${m} ${ampm}`)
    {
       // console.log("OK")
       ringtone.play()
       ringtone.loop=true
       image.classList.add("vibrate")
    }
   
},1000)

function setAlarm(){
    if(isAlarmSet){
        setAlarmBtn.innerText="Set Alarm"
        content.classList.remove("disable")
        ringtone.pause()
        alarmTime=""
        selectTag[0].value="Hour"
        selectTag[1].value="Minute"
        selectTag[2].value="AM/PM"
        image.classList.remove("vibrate")

        return isAlarmSet=false
    }
    let time=`${selectTag[0].value} : ${selectTag[1].value} ${selectTag[2].value}`
    alarmTime=time
    
   // console.log(alarmTime)
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM"))
    {
        return alert("Plz set alarm properly")
    }
    setAlarmBtn.innerText="Clear Alarm"
    content.classList.add("disable")
    isAlarmSet=true
}
setAlarmBtn.addEventListener("click",setAlarm)
