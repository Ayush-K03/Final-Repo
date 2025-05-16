export function isWeekend(date){

  if (date.format('dddd')==='Saturday' ||date.format('dddd')==='Sunday'){
    console.log('True');
  }
  else{
    console.log('False');
  }
}