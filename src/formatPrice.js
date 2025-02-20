//below function format price according to user local region
function formatPrice(num,lang="en-IN",currency="INR"){
    return num.toLocaleString(lang,{style:"currency", currency:`${currency}`,minimumFractionDigits:0});
}

export {formatPrice};