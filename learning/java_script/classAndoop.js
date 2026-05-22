async function postGreeting() {
  try {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status >= 400) {
      throw response;
    }

    const text = await response.text();
    console.log(text);

  } catch (error) {
    if (error.status === 400) {
      const errorMessage = await error.json();
      console.log(errorMessage);
    } else {
      console.log('Network error. Please try again later.');
    }
  }
}
postGreeting();



// fetch ('https://supersimplebackend.dev/greeting').then((response)=>{
//   return (response.text());
// }).then((value)=>{
//   console.log(value);
// })

