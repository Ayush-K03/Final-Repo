previousValue();
function previousValue(){
    let a4=localStorage.getItem('ayush');
    if (a4 !==null){
        a4=JSON.parse(a4);
        document.querySelector('.msg').innerHTML=`${a4}`;
    }
}



let myArray=[];
function addTask(task,date){
    let a6=[task,date];
    myArray.push(a6);
    displayArr();
    console.log(myArray);

}
function deleteTask(task){}

function displayArr(){
    let a10='';
    if ((myArray.length)!==0){
        for (let i=0; i<myArray.length; i++){
            a10=a10+(`<div class='u1'><div class='u01'>${myArray[i][0]}</div><div>${myArray[i][1]}</div><div><button class='removebtn' onclick="myArray.splice(${i},1); displayArr();">Delete</button></div></div>`);
            console.log(myArray);

            // console.log(`${myArray[i][0]}-${myArray[i][1]}`);
            document.querySelector('.msg').innerHTML=`${a10}`;
        }
    }
    else{
        document.querySelector('.msg').innerHTML=`${a10}`;
    }

    let d8=JSON.stringify(a10);
    localStorage.setItem('ayush',d8);
}



