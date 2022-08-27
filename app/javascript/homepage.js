if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()
}

async function purchaseClicked()
  {
	var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
	const sales_data = [];
	var total_amount = 0;
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
	    var priceElement = cartRow.getElementsByClassName('cart-price-input')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      var title = cartRow.getElementsByClassName('cart-item-title')[0].innerText
      var price = parseFloat(priceElement.value)
      var quantity = quantityElement.value
      total_amount += price
      const sale = {title: title, price: price, quantity: quantity};
      sales_data.push(sale);
    }

	const url = "http://127.0.0.1:3000/make_a_sale";
	const response = await fetch(url, {
		method: "POST",
		headers: {         
			"Content-Type": "application/json",
			Accept: "application/json",       
		},
		
		body: JSON.stringify({sales_data: sales_data, total_amount: total_amount, payment_method: "cash", customer_data: []}) ,
		})

	debugger;

	if (response.status == 204) {
	    alert('Hy congratulations, you made new sale..!');
		var cartItems = document.getElementsByClassName('cart-items')[0]
		while (cartItems.hasChildNodes()) {
			cartItems.removeChild(cartItems.firstChild)
		}
		updateCartTotal()
		document.location.reload(true)
    }
	else {
		alert('Error in sale creation..!!!');
	}



	// .then((response) => response.status == "200")
    // .then((result) => {
	// 	console.log(result);
	// 	alert('Hy congratulations, you made new sale..!');
	// 	var cartItems = document.getElementsByClassName('cart-items')[0]
	// 	while (cartItems.hasChildNodes()) {
	// 		cartItems.removeChild(cartItems.firstChild)
	// 	}
	// 	updateCartTotal()
	// 	document.location.reload(true)
    // })
    // .catch((error) => {
	// 	console.log(error);
	// 	alert('Error in sale creation..!!!');
    // });
   
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