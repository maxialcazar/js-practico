const navEmail = document.querySelector(".navbar-email");
const desktopMenu = document.querySelector(".desktop-menu");
const mobileMenuBtn = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");
const cartIcon = document.querySelector(".navbar-shopping-cart");
const cartMenu = document.querySelector(".product-detail-cart");
const cardsContainer = document.querySelector(".cards-container");
const productDetails = document.querySelector(".product-detail");
const closeProductDetails = document.querySelector(".product-detail-close");
const addToCart = document.querySelector(".add-to-cart-button");
const cartContent = document.querySelector(".products");

navEmail.addEventListener("click", toggleDesktopMenu);
mobileMenuBtn.addEventListener("click", toggleMobileMenu);
cartIcon.addEventListener("click", toggleShopCart);
closeProductDetails.addEventListener("click", closeDetails);
addToCart.addEventListener("click", renderCart);

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
}

function openDetails(){
    productDetails.classList.remove("inactive");
        cartMenu.classList.add("inactive");
        mobileMenu.classList.add("inactive"); 
        desktopMenu.classList.add("inactive");
}

function closeDetails(){
    productDetails.classList.add("inactive");
}

let cartList = [];
const productList = [];
productList.push({
    name: "Bike",
    price: 120,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
});
productList.push({
    name: "Auto",
    price: 12000000,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
});
productList.push({
    name: "Computadora",
    price: 120000,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
}); 


function renderProducts(arr) {
    for(product of productList){
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
    
        const img = document.createElement("img");
        img.setAttribute("src", product.image);
        img.classList.add("detail-open");
        img.addEventListener("click", openDetails)
    
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
        productCartImg.addEventListener("click", renderCart(product.name, product.price, product.image));
    
        productInfoFigure.appendChild(productCartImg);
    
        productInfo.appendChild(productInfoFigure);
        productInfo.appendChild(productInfoDiv);
    
        productCard.appendChild(img);
        productCard.appendChild(productInfo);
    
        cardsContainer.appendChild(productCard);
    }
}

renderProducts(productList);

function renderCart(name, price, image){

    cartList.push({
        name: name,
        price: price,
        image: image,
    })

    let x = function addProduct() {
            const cartProduct = document.createElement("div");
            cartProduct.classList.add("shopping-cart");

            const cartProductFigure = document.createElement("figure");
            const cartProductImg = document.createElement("img");
            cartProductImg.setAttribute("src", image)

            const cartProductName = document.createElement("p");
            cartProductName.innerText = name;
            const cartProductPrice = document.createElement("p");
            cartProductPrice.innerText = "$" + price;

            const removeCartProduct = document.createElement("img");
            removeCartProduct.setAttribute("src", "./icons/icon_close.png")

            cartProductFigure.appendChild(cartProductImg);
            cartProduct.appendChild(cartProductFigure);
            cartProduct.appendChild(cartProductName);
            cartProduct.appendChild(cartProductPrice);
            cartProduct.appendChild(removeCartProduct);

            cartContent.appendChild(cartProduct);
    }
    return x;   
}