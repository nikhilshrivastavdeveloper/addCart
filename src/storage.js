// this function run only when window load
function getItem() {
    let val = localStorage.getItem("cartProducts")

    return val ? JSON.parse(val) : [];
}

function duplicate(allData, newData) {
    let val = allData.find((product) => product.id === newData.id);
    let index = allData.findIndex((product) => product.id === newData.id);

    if (val === undefined && index === -1) {
        return newData;
    }
    else {
        val.quantity = newData.quantity;
        allData.splice(index, 1, val);
        let json = JSON.stringify(allData);
        localStorage.setItem("cartProducts", json);
        return
    }
}

//single product
function setItem(data) {
    if (localStorage.getItem("cartProducts") !== null) {
        let fetchData = localStorage.getItem("cartProducts");
        let convert = JSON.parse(fetchData);
        let isDuplicate = duplicate(convert, data);
        
        if (isDuplicate !== undefined) {
            convert.push(isDuplicate);
            let json = JSON.stringify(convert);
            localStorage.setItem("cartProducts", json);
        }
    }
    else {
        let store = [];
        store.push(data);
        let jsObj = JSON.stringify(store);
        localStorage.setItem("cartProducts", jsObj);
    }
}

//run when user remove any product
function newItemAfterRemove(newSetOfData) {
    localStorage.setItem("cartProducts", JSON.stringify(newSetOfData));
}

// localStorage.removeItem("cartProducts")
export { getItem, setItem, newItemAfterRemove };