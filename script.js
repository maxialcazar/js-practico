const navEmail = document.querySelector(".navbar-email");
const desktopMenu = document.querySelector(".desktop-menu");
const mobileMenuBtn = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");
const cartIcon = document.querySelector(".navbar-shopping-cart");
const cartMenu = document.querySelector(".product-detail-cart");
const cardsContainer = document.querySelector(".cards-container");
const productDetails = document.querySelector(".product-detail");
const cartContent = document.querySelector(".products");
const checkOut = document.querySelector(".primary-button");

navEmail.addEventListener("click", toggleDesktopMenu);
mobileMenuBtn.addEventListener("click", toggleMobileMenu);
cartIcon.addEventListener("click", toggleShopCart);
checkOut.addEventListener("click", resetCart);

function toggleDesktopMenu() {
        desktopMenu.classList.toggle("inactive");
        cartMenu.classList.add("inactive");
        mobileMenu.classList.add("inactive");          
        productDetails.classList.add("inactive");
}

function toggleMobileMenu() {
        mobileMenu.classList.toggle("inactive"); 
        desktopMenu.classList.add("inactive");
        cartMenu.classList.add("inactive");
        productDetails.classList.add("inactive");
}

function toggleShopCart(){
        cartMenu.classList.toggle("inactive");
        mobileMenu.classList.add("inactive"); 
        desktopMenu.classList.add("inactive");
        productDetails.classList.add("inactive");

        if(!cartMenu.classList.contains("inactive"))
        {
            renderCart();
        }
}

let cartList = [];
const productList = [];
productList.push({
    name: "Bike",
    price: 120,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    descr: "Una bici es casi lo mismo que un auto porque tienen casi las mismas funciones de transportar a personas y que no se cansen. Pueden ser de distintos colores, y algunas personas le ponen luces para que los autos no los atropellen listo.",
});
productList.push({
    name: "Auto",
    price: 12000000,
    image: "https://www.karvi.com.ar/blog/wp-content/uploads/2020/10/208II3-850x567.jpg",
    descr: "Es un elemento tecnologico que le salen luces por la parte trasera, ponee por el trasero. Yyy bueno emm por ahi pueden ser de diferentes colores, pero no venimos a eso, es un elemento tecnologico para transportar a las personas para satisfacer a las personas de su necesidad de no caminar y no cansarce.",
});
productList.push({
    name: "Computadora",
    price: 120000,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    descr: "Un objeto tecnologico ehhh vas a poner tambien el e a okey emmmm dejame pensar puede o no tener luces sus elementos q lleva por ejemplo el teclado puede o no tener luces q salen de las teclas, otro ejemplo seria el mouse, que si, trae luces, pero hay otros q los compras y tiene luces de colores.",
}); 

function renderProducts() {
    for(let product of productList){
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const img = document.createElement("img");
        img.setAttribute("src", product.image);
        img.classList.add("detail-open");
        img.addEventListener("click", function(){ productDetailsOpen(product.name, product.price, product.image, product.descr)})
    
        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info");
    
        const productInfoDiv = document.createElement("div");
        const price = document.createElement("p");
        price.innerText = "$" + product.price;
        const name = document.createElement("p");
        name.innerText = product.name;
    
        productInfoDiv.appendChild(name);
        productInfoDiv.appendChild(price);
    
        const productInfoFigure = document.createElement("figure");
        const productCartImg = document.createElement("img");
        productCartImg.setAttribute("src", "./icons/bt_add_to_cart.svg");
        productInfoFigure.addEventListener("click", function(){ addProductArray(product.name, product.price, product.image)});
    
        productInfoFigure.appendChild(productCartImg);
    
        productInfo.appendChild(productInfoFigure);
        productInfo.appendChild(productInfoDiv);
    
        productCard.appendChild(img);
        productCard.appendChild(productInfo);
    
        cardsContainer.appendChild(productCard);
    }
}

renderProducts(productList);
let cartListJSON;
let localCartList;

getLocalStorage()

function getLocalStorage(){
    localCartList = localStorage.getItem("cartProducts");

    if (localCartList != null){
        cartList = JSON.parse(localCartList);
    }
}

function saveOnLocalStorage(){
    cartListJSON = JSON.stringify(cartList);

    localStorage.setItem("cartProducts", cartListJSON);
}

function addProductArray(name, price, image){
    cartList.push({
        id: Math.random(15),
        name: name,
        price: price,
        image: image,
    })
    renderCart();

    saveOnLocalStorage()
}

function renderCart(){
    cartContent.innerHTML = "";
    let addProduct = function(product) {
        const cartProduct = document.createElement("div");
        cartProduct.classList.add("shopping-cart");

        const cartProductFigure = document.createElement("figure");
        const cartProductImg = document.createElement("img");
        cartProductImg.setAttribute("src", product.image)

        const cartProductName = document.createElement("p");    
        cartProductName.innerText = product.name;
        const cartProductPrice = document.createElement("p");
        cartProductPrice.innerText = "$" + product.price;

        const removeCartProduct = document.createElement("img");
        removeCartProduct.setAttribute("src", "./icons/icon_close.png")
        removeCartProduct.addEventListener("click", function(){ removeProductCart(product.id)});

        cartProductFigure.appendChild(cartProductImg);  
        cartProduct.appendChild(cartProductFigure);
        cartProduct.appendChild(cartProductName);
        cartProduct.appendChild(cartProductPrice);
        cartProduct.appendChild(removeCartProduct);

        cartContent.appendChild(cartProduct);
    }
    cartList.forEach(addProduct);
}

function removeProductCart(id){
    cartList.forEach(removeProduct)

    function removeProduct(value){
        if(value.id == id)
        {
            let i = cartList.indexOf(value);
            console.log(i);
            cartList.splice(i, 1);
            renderCart();
            saveOnLocalStorage();
        }
    }
}

function resetCart(){
    console.log("Reset");
    window.localStorage.removeItem("cartProducts");
}

/*
    <div class="product-detail-close">
      <img src="./icons/icon_close.png" alt="close" class="close-details">
    </div>
    <img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="bike">
    <div class="product-info-details">
      <p>$35,00</p>
      <p>Bike</p>
      <p>With its practical position, this bike also fulfills a decorative function, add your hall or workspace.</p>
      <button class="primary-button add-to-cart-button">
        <img src="./icons/bt_add_to_cart.svg" alt="add to cart">
        Add to cart
      </button>
    </div>
*/

let isDetailsOpen = false;

function productDetailsOpen(name, price, image, descr){
    if(isDetailsOpen == false){
        const productDetailsCloseDiv = document.createElement("div");
        productDetailsCloseDiv.classList.add("product-detail-close");
        const productDetailsClose = document.createElement("img");
        productDetailsClose.classList.add("close-details");
        productDetailsCloseDiv.addEventListener("click", productDetailsCloseF)
        productDetailsClose.setAttribute("src", "./icons/icon_close.png")
        productDetailsClose.setAttribute("alt", "close");
        productDetailsClose.classList.add("close-details");

        const productImg = document.createElement("img");
        productImg.setAttribute("src", image);
        productImg.setAttribute("alt", name)

        const productDetailsInfo = document.createElement("div");
        productDetailsInfo.classList.add("product-info-details");

        const productDetailsName = document.createElement("p");
        const productDetailsPrice = document.createElement("p");
        const productDetailsDescr = document.createElement("p");
        productDetailsName.innerText = name;
        productDetailsPrice.innerText = price;
        productDetailsDescr.innerText = descr;

        const productDetailsButton = document.createElement("button");
        productDetailsButton.addEventListener("click", addProductArray(name, price, image));
        productDetailsButton.classList.add("primary-button");
        productDetailsButton.classList.add("add-to-cart-button");
        productDetailsButton.innerText = "Add to cart";
        const addToCartImg = document.createElement("img");
        addToCartImg.setAttribute("alt", "Add to cart")
        addToCartImg.setAttribute("src", "./icons/bt_add_to_cart.svg")

        productDetailsCloseDiv.append(productDetailsClose);

        productDetailsButton.appendChild(addToCartImg);

        productDetailsInfo.appendChild(productDetailsName);
        productDetailsInfo.appendChild(productDetailsPrice);
        productDetailsInfo.appendChild(productDetailsDescr);
        productDetailsInfo.appendChild(productDetailsButton);

        productDetails.appendChild(productDetailsCloseDiv)
        productDetails.appendChild(productImg);
        productDetails.appendChild(productDetailsInfo );

        isDetailsOpen = true;
    }
}

function productDetailsCloseF(){
    productDetails.innerHTML = "";
    isDetailsOpen = false;
}