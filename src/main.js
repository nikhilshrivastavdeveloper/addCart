import { mainBox } from "./showproduct.js";

function relocate(ele) {
    if (ele.tagName === "BUTTON") {
        // http://127.0.0.1:3000/index.html
        //https://nikhilshrivastavdeveloper.github.io//addCart//index.html
        let origin = window.location.origin;
        let pathname = window.location.pathname;
        // window.location.href = `${origin}/productdesc.html?q=${ele.parentNode.id}`;
        window.location.href = `${origin}/../../productdesc.html?q=${ele.parentNode.id}`
    }
}

mainBox.addEventListener("click", (e) => {
    relocate(e.target);
})
