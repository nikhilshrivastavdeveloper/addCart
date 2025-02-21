import { getProductById } from "./product.js";
import { formatPrice } from "./formatPrice.js";

let imageBox = document.querySelector("#image");
let productInfo = document.getElementById("product-information");
let heading = document.querySelector("#heading");
let price = document.querySelector("#price");
let desc = document.querySelector("#desc");
let other = document.querySelector("#other-element");
let decrease = document.querySelector("#decrease")
let increase = document.querySelector("#increase")
let span = document.querySelector("#quantity");


function updateUI(data, id) {

    let img = document.createElement("img");
    img.src = data.image;
    imageBox.appendChild(img);

    let h1 = document.createElement("h1");
    h1.innerText = data.name;
    heading.appendChild(h1);

    let h3 = document.createElement("h3");
    h3.innerText = `${formatPrice(data.price)}`; //here i convert price according to user local region
    price.appendChild(h3);

    let p = document.createElement("p");
    p.innerText = data.desc;
    desc.appendChild(p);

    let addCart = document.createElement("button");
    addCart.style.display = "block";
    addCart.innerText = "Add To Cart";
    addCart.classList.add("add-cart")
    addCart.setAttribute("id", id);
    other.appendChild(addCart);
}

function getValueFromURL() {
    let url = new URL(window.location.href);
    let id = Number(url.searchParams.get('q'));
    let quantity = Number(url.searchParams.get("quantity")) || 1;

    //dynamically update quantity of product
    span.innerText = quantity;

    //disable decrease button dynamically
    if(span.innerText === "1"){
        decrease.disabled = true;
    }

    return isNaN(id) ? null : id;
}

function showProductDetailsById() {
    let URLid = getValueFromURL();

    if(!URLid){
        alert("Invalid Product Id")
        return
    }

    let product = getProductById(URLid);

    if(product){
        updateUI(product, URLid);
    }else{
        alert("Product Not Found")
    }
}

document.addEventListener("DOMContentLoaded",showProductDetailsById)

//below code run only when user click on add to cart button;
function addCart(ele) {
    if (ele.tagName === "BUTTON" && ele.innerText === "Add To Cart") {
        let origin;
        if(window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"){
            origin = window.location.origin;
            window.location.href = `${origin}/card.html?q=${ele.id}&quantity=${span.innerText}`;
        }
        else{
            origin = window.location.origin;
            window.location.href = `${origin}/addCart/card.html?q=${ele.id}&quantity=${span.innerText}`; 
        }
    }
}

productInfo.addEventListener("click", (e) => {
    addCart(e.target);
})

//increase and decrease quantity
increase.addEventListener("click",() => {
    span.innerText++
    if(Number(span.innerText) > 1){
        decrease.disabled = false
    }
})

decrease.addEventListener("click",() => {
    span.innerText--;
    if(Number(span.innerText) === 1){
        decrease.disabled = true
    }
})
