function a22(choice){
    const r4=document.querySelector(`#${choice}`);
    const r5=document.querySelector('.a1');


    if (! (r4.classList.contains('a2'))){
        off();
        r4.classList.add('a2');
    }

    else if((r4).classList.contains('a2')){
        r4.classList.remove('a2');
        
    }
}

function off(){
    const r6=document.querySelector('.a2');
    if(r6!==null){

        r6.classList.remove('a2');
    }

}



// (r4.classList.contains('a2'))) && (