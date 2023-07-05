const add_btn = document.querySelector('.add_btn');
var basket = new Array();

function getProduct(){
  var value = localStorage.getItem('login');
  var logins = JSON.parse(value) || []; 
  
  if (logins.length > 0) {
    var product = logins[0].product; 
    return product;
  }
}

function getUsername(){
  var value = localStorage.getItem('login');
  var logins = JSON.parse(value) || []; 
  
  if (logins.length > 0) {
    var username = logins[0].username;
    return username;
  }
}

function addCharacter(email, name) {
  if(email == getUsername()){
    var value = localStorage.getItem('login');
    var logins = JSON.parse(value) || []; 

    if (logins.length > 0) {
      var product = logins[0].product; 
      product.push(name)
      console.log("OK")

      logins[0].product = product;
      localStorage.setItem('login', JSON.stringify(logins)); 
    }
  }
}

function getRandom(min,max){
  return Math.floor(Math.random()*(max-min)) + min;
}

const bas = document.querySelector('.cards-basket');
const buy = document.querySelector('.price-button');

fetch(`https://rickandmortyapi.com/api/character?page=1`, {
    headers: {
        "characters": "https://rickandmortyapi.com/api/character",
        "locations": "https://rickandmortyapi.com/api/location",
        "episodes": "https://rickandmortyapi.com/api/episode"
    }
  })
    .then(res => res.json())
    .then(data => {
      bas.innerHTML = '';
      let character = data.results;
      let price = 0;
      character.forEach(element => {
        if(getProduct().includes(element.name)){
        let num = getRandom(200, 4000);
        bas.innerHTML += `
        <div class="card-buy">
            <div class="img-card"><img src="${element.image}"/></div>
            <div class="text-card">
                <h3>${element.name}</h3>
                <p>${element.status} - ${element.species} <br> Gender: ${element.gender}</p>
                <h4>Price: ${num}$</h4>
            </div>
        </div>
        `

        price += num;
        buy.innerHTML = `
        <h4>${price}$</h4> 
        <button  onclick="BuyShop()">Закзать</button>
        `
        }
      })
    });


function BuyShop(){
  alert("Ваш заказ успешно подтвержден")
  var value = localStorage.getItem('login');
  var logins = JSON.parse(value) || []; 
  var product = []; 
  logins[0].product = product;
  localStorage.setItem('login', JSON.stringify(logins)); 
  window.location.href = "index.html";
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
}


const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const card = document.querySelector('.cards-shop');
const filter = document.querySelector('.filter');

btn.addEventListener('click', searchCharecter);

function searchCharecter() {
  fetch(`https://rickandmortyapi.com/api/character?name=${search.value}`, {
    headers: {
        "characters": "https://rickandmortyapi.com/api/character",
        "locations": "https://rickandmortyapi.com/api/location",
        "episodes": "https://rickandmortyapi.com/api/episode"
    }
  })
    .then(res => res.json())
    .then(data => {
      card.innerHTML = '';
      let character = data.results;
      character.forEach(element => {
        const status = element.status;
        const species = element.species;
        const gender = element.gender;

        if((gender.includes(filter.value)) || 
        (status.includes(filter.value)) || 
        (species.includes(filter.value)) ||
        ("all" == filter.value) )
        {
        card.innerHTML += `
        <div class="card">
            <div class="img-card"><img src="${element.image}"/></div>
            <div class="text-card" onclick="addCharacter()">
                <h3>${element.name}</h3>
                <p>${element.status} - ${element.species} <br> Gender: ${element.gender}</p>
                <h4>Price: ${getRandom(200, 4000)}$</h4>
                <button class="add_btn" onclick="addCharacter('${getUsername()}','${element.name}')"><img src="shop.png"></button>
            </div>
        </div>
        `
        }
      })
    });
  }

//--------------------------------------------------------------
function Sign(){
    if(localStorage.length == 1){
        window.location.href = "regis.html"
    }
    else{
      let isExit = confirm("Выйти с аккаунта");
      if(isExit == true){
        localStorage.removeItem('login');
      }
    }
}


