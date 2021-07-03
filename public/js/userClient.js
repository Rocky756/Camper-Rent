document.addEventListener('DOMContentLoaded', (event) => {
  const containerMain = document.querySelector('#containerMain');
  const divContainer = document.querySelector('#divContainer');
  containerMain.addEventListener('click', async(event) => {
    console.log(event.target);
    event.preventDefault();
    if (event.target.parentElement.id == 'toChosenAdd') {
      event.preventDefault();
      const response = await fetch(event.target.parentElement.href, {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      })
      const result = await response.text();
      containerMain.innerHTML = result;
    }
    if (event.target.id == 'allAddSeller') {
      event.preventDefault();
      const response = await fetch(event.target.href, {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      })
      const result = await response.text();
      containerMain.innerHTML = result;
    }
    if (event.target.id == 'allAddSeller') {
      event.preventDefault();
      console.log('я тут');
      const response = await fetch(event.target.href, {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      })
      const result = await response.text();
      containerMain.innerHTML = result;
    }
    if (event.target.id == 'clear' || event.target.id == 'paint' || event.target.id =='paintPath') {
      event.preventDefault();
      console.log('я нажал на избранное');
      console.log(event.target.dataset.url);
      // console.log(event.target.parentElement.id);
      const response = await fetch(event.target.dataset.url, {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      })
      const clearHeart = document.querySelector('#clear');
      const paintHeart = document.querySelector('#paint');
      const result = await response.json();
      console.log(result.count);
      if(result.count == 1) {
        clearHeart.classList.remove('noDisplay');
        paintHeart.classList.add('noDisplay');
      } else if (result.count == 0) {
        clearHeart.classList.add('noDisplay');
        paintHeart.classList.remove('noDisplay');
      }

      // window.location.assign('localhost:3000')
    }
  })

});
