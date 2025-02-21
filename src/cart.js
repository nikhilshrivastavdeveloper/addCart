import { getProductById } from "./product.js";
import { getItem, setItem, newItemAfterRemove } from "./storage.js";
import { formatPrice } from "./formatPrice.js";

let totalPrice = document.getElementById("price");
let cardBox = document.getElementById("card-container");
let product;
let price = 0;

function updateTotalPrice() {
    totalPrice.innerText = formatPrice(price);
    price = 0 // reset price variable after use
}

function saveProduct(data, productQuantity) {
    let obj = {
        id: data.id,
        image: data.image,
        name: data.name,
        price: data.price,
        quantity: productQuantity
    }

    setItem(obj); // this function save value into localstorage so that we  will retreive after page reload
}

//get id from url
function getValueFromURL1() {
    let url = new URL(window.location.href);
    let id = Number(url.searchParams.get('q'));
    let quantity = Number(url.searchParams.get("quantity")) || 1;
    url.search = "";
    history.replaceState(null, "", url.href);
    return { id, quantity };
}

function showProductDetailsById1() {
    let { id, quantity } = getValueFromURL1();
    product = getProductById(id);
    if (product !== undefined) {
        saveProduct(product, quantity);
    }
};

//this function run when window reload so that add to product data will be retain

function showLocalStorageData(val) {
    if (val.length > 0) {
        cardBox.innerHTML = "";
        val.forEach((singalData) => {
            let card = document.createElement("div");
            card.classList.add("card-box");
            card.setAttribute("id", singalData.id);

            let cardImg = document.createElement("img")
            cardImg.src = singalData.image;
            cardImg.classList.add("card-image");
            card.appendChild(cardImg);

            let itemName = document.createElement("h1");
            itemName.innerHTML = singalData.name;
            card.appendChild(itemName);

            let itemPrice = document.createElement("h3");
            price += (singalData.price * singalData.quantity) //HERE I CALCULATE TOTAL PRICE OF CART AND STORE IT IN PRICE VARIABLE
            itemPrice.innerHTML = `${formatPrice(singalData.price)}`;
            card.appendChild(itemPrice);

            let quantity = document.createElement("p");
            let SubTotal = singalData.price * singalData.quantity;
            quantity.innerHTML = `Subtotal (<span>${singalData.quantity}</span> items): ${formatPrice(SubTotal)}`
            card.appendChild(quantity);

            let removeBtn = document.createElement("button");
            removeBtn.classList.add("remove-btn")
            removeBtn.innerText = "Remove";
            card.appendChild(removeBtn);

            cardBox.appendChild(card);
        })
    }
    else {
        cardBox.innerHTML = "<h1>No Product is Add To Cart</h1>";
    }
}

function updateUI() {
    let fetchDataFromLocalStorage = getItem();

    showLocalStorageData(fetchDataFromLocalStorage);
}

function removeProduct(ID) {
    let listProduct = getItem();
    let find = listProduct.findIndex((val) => val.id === Number(ID));
    listProduct.splice(find, 1);
    newItemAfterRemove(listProduct);
    showLocalStorageData(listProduct);
    updateTotalPrice()
}


cardBox.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.className === "remove-btn") {
        removeProduct(e.target.parentNode.id);
    }

    //redirect to user on productdesc.html so that user can see description of product again
    if (e.target.tagName === "IMG") {

        let id = e.target.parentNode.id;
        let quantity = e.target.parentElement.children[3].children[0].innerText

        let origin;
        if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
            origin = window.location.origin;
            window.location.href = `${origin}/productdesc.html?q=${id}&quantity=${quantity}`;
        }
        else {
            origin = window.location.origin;
            window.location.href = `${origin}/productdesc.html?q=${id}&quantity=${quantity}`;
        }
    }
})

document.addEventListener("DOMContentLoaded", () => {
    showProductDetailsById1();
    updateUI()
    updateTotalPrice()
})