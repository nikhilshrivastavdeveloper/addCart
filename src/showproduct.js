import { products } from "./product.js";

//below code run only for index.html when window load  
let mainBox = document.querySelector("#main-box");

products.forEach((product) => {
    let card = document.createElement("div");
    card.classList.add("product-card");
    card.setAttribute("id", product.id);

    let cardImg = document.createElement("img");
    cardImg.src = product.image;
    card.appendChild(cardImg);

    let cardHeading = document.createElement("h2");
    cardHeading.innerText = product.name;
    card.appendChild(cardHeading);

    let cardButton = document.createElement("button");
    cardButton.innerHTML = "View Details";
    card.appendChild(cardButton);

    mainBox.appendChild(card);
})

export {mainBox};