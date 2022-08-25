// import  FetchRequest from 'application.js'
// import { get, post } from "@rails/request.js";

if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()
}

async function makeSale()
  {
    // console.log("sending request")
    // const url = 'localhost:3000/test_rote'
	// debugger;
	// const response = await post(url, { body: JSON.stringify({ "name": 'Request.JS' }) })
	// console.log("response")
	// console.log(response)


	// console.log("sending request")
	// const url = 'localhost:3000/test_rote'
	// console.log("sending request 11")
	// debugger;
	// console.log("passed debugger")
	// let request = new FetchRequest('post', url, { body: JSON.stringify({ name: 'Request.JS' }) })
	// console.log("sending request 22")
	// let response = await request.perform()
	// console.log("response")
	// console.log(response)
	// if (response.ok) {
	// 	const body = await response.text
	// 	// Do whatever do you want with the response body
	// 	// You also are able to call `response.html` or `response.json`, be aware that if you call `response.json` and the response contentType isn't `application/json` there will be raised an error.
	// }
	





    // fetch(url, {
    //   method: "POST",
    // //   headers: {
    // //     // "X-CSRF-Token": csrfToken,          // 👈👈👈 you need to set token
    // //     "Content-Type": "application/json", // 👈👈👈 To send json in body, specify this
    // //      Accept: "application/json",         // 👈👈👈 Specify the response to be returned as json. For api only mode, this may not be needed
    // //   },
    //   body: JSON.stringify({abc: "fff" }),
    // })
	// console.log(response);
	// debugger;
	// console.log("passed debugger")


    // console.log("sending request")
    // const url = 'http://127.0.0.1:3000/test_rote'
    // const user = {name: "qasim"}
    // axios({
    //   method: 'post',
    //   url: url,
    //   data: {
    //     user
    //   }
    // }).then(date=> console.log(date)).catch(err=>console.log(err))


	// Create an XMLHttpRequest object
	const xhttp = new XMLHttpRequest();

	// Define a callback function
	xhttp.onload = function() {
		console.log("in fun")
	}

	// Send a request
	const url = 'http://127.0.0.1:3000/test_rote'
	xhttp.open("POST", url);
	console.log("sending xhttp")
	xhttp.send();


	// console.log("sending xhttp")
    // const xhttp = new XMLHttpRequest();
	// const url = 'http://127.0.0.1:3000/test_rote'
    // xhttp.open("get", url, false);

    // // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // console.log("sending xhttp")
    // xhttp.send();
    // console.log(xhttp);
	// debugger;
	// console.log("passed debugger")
   

    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var title = cartRow.getElementsByClassName('cart-item-title')[0].innerText
      var priceElement = cartRow.getElementsByClassName('cart-price-input')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      var price = parseFloat(priceElement.value)
      var quantity = quantityElement.value
 
      console.log(i)
      console.log(title)
      console.log(price)
      console.log(quantity)
    }
  }


function ready() {
	var removeCartItemButtons = document.getElementsByClassName('btn-danger')
	for (var i = 0; i < removeCartItemButtons.length; i++) {
		var button = removeCartItemButtons[i]
		button.addEventListener('click', removeCartItem)
	}

	var quantityInputs = document.getElementsByClassName('cart-quantity-input')
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i]
		input.addEventListener('change', quantityChanged)
	}

	var priceInputs = document.getElementsByClassName('cart-price-input')
	for (var i = 0; i < priceInputs.length; i++) {
		var input = priceInputs[i]
		input.addEventListener('change', priceChanged)
	}

	var addToCartButtons = document.getElementsByClassName('shop-item-button')
	for (var i = 0; i < addToCartButtons.length; i++) {
		var button = addToCartButtons[i]
		button.addEventListener('click', addToCartClicked)
	}

	document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
	makeSale()
	// alert('Thank you for your purchase')
	// var cartItems = document.getElementsByClassName('cart-items')[0]
	// while (cartItems.hasChildNodes()) {
	// 	cartItems.removeChild(cartItems.firstChild)
	// }
	// updateCartTotal()
	// document.location.reload(true)
}

function removeCartItem(event) {
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove()
	// add element back
	updateCartTotal()
}

function quantityChanged(event) {
	var input = event.target
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1
	}
	updateCartTotal()
}

function priceChanged(event) {
	var input = event.target
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1
	}
	updateCartTotal()
}

function addToCartClicked(event) {
	var button = event.target
	var shopItem = button.parentElement.parentElement.parentElement
   
	var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
	var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText.replace("Price: ","")
	var imageSrc = shopItem.getElementsByClassName('shop-item-image-link')[0].src
	addItemToCart(title, price, imageSrc)
	updateCartTotal()
	shopItem.remove()
}

function addItemToCart(title, price, imageSrc) {
	var cartRow = document.createElement('div')
	cartRow.classList.add('cart-row')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	var cartRowContents = `
		<div class="cart-item cart-column">
			<img class="cart-item-image" src="${imageSrc}" width="100" height="100">
			<span class="cart-item-title">${title}</span>
		</div>
		<div class="cart-price cart-column">
			<input class="cart-price-input" type="number" value="${price}">
		</div>
		<div class="cart-quantity cart-column">
			<input class="cart-quantity-input" type="number" value="1">
			<button class="btn btn-danger" type="button">REMOVE</button>
		</div>`
	cartRow.innerHTML = cartRowContents
	cartItems.append(cartRow)
	cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
	cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
	cartRow.getElementsByClassName('cart-price-input')[0].addEventListener('change', priceChanged)
}

function updateCartTotal() {
	var cartItemContainer = document.getElementsByClassName('cart-items')[0]
	var cartRows = cartItemContainer.getElementsByClassName('cart-row')
	var total = 0
	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName('cart-price-input')[0]
		var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
		var price = parseFloat(priceElement.value)
		var quantity = quantityElement.value
		total = total + (price * quantity)
	}
	total = Math.round(total * 100) / 100
	document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}