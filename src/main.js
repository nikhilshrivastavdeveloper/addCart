import { mainBox } from "./showproduct.js";

function relocate(ele) {
    if (ele.tagName === "BUTTON") {
        // http://127.0.0.1:3000/index.html
        //https://nikhilshrivastavdeveloper.github.io/addCart/index.html
        
        let origin;
        if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
            origin = window.location.origin;
            window.location.href = `${origin}/productdesc.html?q=${ele.parentNode.id}`;
        }
        else {
            origin = window.location.origin;
            window.location.href = `${origin}/addCart/productdesc.html?q=${ele.parentNode.id}`;
        }
        //above if condition check environment than construct url dynamically
    }
}

mainBox.addEventListener("click", (e) => {
    relocate(e.target);
})
