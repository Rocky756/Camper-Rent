document.addEventListener('DOMContentLoaded', (event) => {
  const mainContainer = document.querySelector('#mainContainer');
  const addContainer = document.querySelector('#addContainer');
  const topSelector = document.querySelector('#topSelector');
  // const toActive = document.querySelector('#toActive');
  // const toArchive = document.querySelector('#toArchive');
  // const toNew = document.querySelector('#toNew');

  mainContainer.addEventListener('click', async (event) => {
    console.log(event.target);
    if (event.target.id == 'toActive') {
      event.preventDefault();
      toActive.classList.add("btn-primary");
      toArchive.classList.remove("btn-primary");
      toNew.classList.remove("btn-primary");
      const response = await fetch('/seller/active', {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      })
      const result = await response.text();
      // console.log(result);
      mainContainer.innerHTML = result;
    }
    if (event.target.id == 'toArchive') {
      event.preventDefault();
      const response = await fetch('/seller/archive', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.text();
      mainContainer.innerHTML = result;
      const toActive = document.querySelector('#toActive');
      const toArchive = document.querySelector('#toArchive');
      const toNew = document.querySelector('#toNew');
      toActive.classList.remove("btn-primary");
      toActive.classList.add("btn-secondary");
      toArchive.classList.add("btn-primary");
      toArchive.classList.remove("btn-secondary");
      toNew.classList.remove("btn-primary");
      toNew.classList.add("btn-secondary");
    }
    if (event.target.id == 'toNew') {
      event.preventDefault();
      const response = await fetch('/seller/new', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.text();
      // console.log(result);
      mainContainer.innerHTML = result;
      const toActive = document.querySelector('#toActive');
      const toArchive = document.querySelector('#toArchive');
      const toNew = document.querySelector('#toNew');
      toActive.classList.remove("btn-primary");
      toActive.classList.add("btn-secondary");
      toArchive.classList.remove("btn-primary");
      toArchive.classList.add("btn-secondary");
      toNew.classList.add("btn-primary");
      toNew.classList.remove("btn-secondary");
    }
    if (event.target.parentElement.id == 'toAdd') {
      event.preventDefault();
      console.log('Успешно на объявление');
      console.log(event.target.parentElement.href);
      const response = await fetch(event.target.parentElement.href, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.text();
      mainContainer.innerHTML = result;
    }
    if (event.target.parentElement.id == 'toEdit') {
      event.preventDefault();
      console.log('Успешно на редактирование объявления');
      console.log(event.target.parentElement.href);
      const response = await fetch(event.target.parentElement.href, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.text();
      mainContainer.innerHTML = result;
    }
    if (event.target.parentElement.id == 'addArchive') {
      event.preventDefault();
      console.log('Успешно на редактирование объявления');
      console.log(event.target.parentElement.href);
      const response = await fetch(event.target.parentElement.href, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.text();
      mainContainer.innerHTML = result;
    }
    if (event.target.parentElement.id == 'addRecovery') {
      event.preventDefault();
      console.log('Успешно на редактирование объявления');
      console.log(event.target.parentElement.href);
      const response = await fetch(event.target.parentElement.href, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.text();
      mainContainer.innerHTML = result;
      const toActive = document.querySelector('#toActive');
      const toArchive = document.querySelector('#toArchive');
      const toNew = document.querySelector('#toNew');
      toActive.classList.remove("btn-primary");
      toActive.classList.add("btn-secondary");
      toArchive.classList.add("btn-primary");
      toArchive.classList.remove("btn-secondary");
      toNew.classList.remove("btn-primary");
      toNew.classList.add("btn-secondary");
    }
    if (event.target.parentElement.id == 'addDelete') {
      event.preventDefault();
      console.log('Успешно на редактирование объявления');
      console.log(event.target.parentElement.href);
      const response = await fetch(event.target.parentElement.href, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.text();
      mainContainer.innerHTML = result;
      toActive.classList.remove("btn-primary");
      toActive.classList.add("btn-secondary");
      toArchive.classList.add("btn-primary");
      toArchive.classList.remove("btn-secondary");
      toNew.classList.remove("btn-primary");
      toNew.classList.add("btn-secondary");
    }
  })
})
