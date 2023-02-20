import products from "./products.json" assert {type: "json"};
window.addEventListener(`DOMContentLoaded`, () =>{

    const shopContent = document.querySelector(".shop-content");
    let cartIcon = document.querySelector(`#cart-icon`);
    let cart = document.querySelector(`.cart`);
    let closeCart = document.querySelector(`#close-cart`);
    





//  import products from json file
for(let i = 0; products.length > i; i++) {
    const product = document.createElement("div");
    product.classList.add("product-box");
    
    product.innerHTML = 
    "<img src='img/" + 
    products[i].image + 
    "' class='product-image'>" + 
    "<br>" + 
    `<h2 class="product-title">${products[i].name}</h2>` + 
    "<br>" + 
    `<span class="price">${products[i].price} </span>` + products[i] +
    "<i class='bx bx-game add-cart'></i>";

    shopContent.append(product)
} ;



// Open  cart section

cartIcon.onclick = () =>{
    cart.classList.add(`active`)
};


// close cart section

closeCart.onclick = () =>{
    cart.classList.remove(`active`)
}

// Cart working JS
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

// Making function
function ready(){
    //Remove items from cart
    var removeCartButtons = document.getElementsByClassName(`cart-remove`)
    console.log(removeCartButtons);
    for ( var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    //Quantity changes
    var quantityInputs = document.getElementsByClassName(`cart-quantity`)
    for( var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    //Add to cart

    var addCart = document.getElementsByClassName(`add-cart`)

    for( var i = 0; i < addCart.length; i++ ) {
        var button = addCart[i];
        button.addEventListener(`click`, addCartClicked);
    }

    //Buy button

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

    //Buy button

    function buyButtonClicked(){
        alert('Your order is placed')
        var cartContent = document.getElementsByClassName('cart-content')[0]
        while(cartContent.hasChildNodes()){
            cartContent.removeChild(cartContent.firstChild)
        }
    }


//Remove items from cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}


//Quantity Changed
function quantityChanged (){
    var input = event.target
    if(isNaN(input.value) ||  input.value <= 0){
        input.value = 1;
    }
    updateTotal()
    
}


//Add to cart
//Sardor akamga
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-image')[0].src;
    addProductToCart( title, price, productImg);
    
}

function addProductToCart( title, price, productImg) {
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0] 
    var cartItemsName = cartItems.getElementsByClassName('cart-product-title')
    
     
    
     var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">

                        <div class="detail-box">
                            <div class="cart-product-title"> ${title} </div>
                            <div class="cart-price">${price}</div>
                            <input type="number" class="cart-quantity" value="1">
                        </div>
                        <!-- Remove cart -->
                        <i class="bx bxs-trash-alt cart-remove"></i>
`
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener(`click`, removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener(`change`, quantityChanged);
}







//Update total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for( var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var price = parseFloat(priceElement.innerText.replace("so'm", ""));
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var quantity = quantityElement.value;


        total = total + (price * quantity);

        //If price contain some sents value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "so'm" + total;
    }
}


}
})

