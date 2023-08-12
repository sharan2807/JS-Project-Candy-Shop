function test(event) {
    event.preventDefault();

    const Candy = event.target.candy.value;
    const Description = event.target.description.value;
    const Price = event.target.price.value;
    const Quantity = event.target.quantity.value;

    const Obj = {
        CANDY: Candy,
        DESCRIPTION: Description,
        PRICE: Price,
        QUANTITY: Quantity,
    }

    axios.post("https://crudcrud.com/api/9d42c4cafceb4088b30884ed8f621aa7/CandyShop", Obj)
        .then((response) => {
            showCandyOnScreen(response.data)
            //console.log(response)       // not required on console
        })
        .catch((err) => {
            console.log(err)
        })

    localStorage.setItem(Obj.CANDY, JSON.stringify(Obj))
    // showCandyOnScreen(Obj);
}
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/9d42c4cafceb4088b30884ed8f621aa7/CandyShop")
        .then((response) => {
            console.log(response);
            //On logging the response we see that the data is in the form of an Array of Objects
            for (var i = 0; i < response.data.length; i++) {  //going through the Array of Objects
                showCandyOnScreen(response.data[i]);   //Showing each element of the array[basically each object]
            }
        })
        .catch((err) => {
            console.log(err);
        })
})
function showCandyOnScreen(Obj) {
    let parent = document.getElementById("ListOfItems")
    let child = document.createElement('li')
    child.textContent = Obj.CANDY + ' - ' + Obj.DESCRIPTION + ' - ' + Obj.PRICE + ' - ' + Obj.QUANTITY + ' - ';

    const BuyOneButton = document.createElement('input')
    BuyOneButton.type = "button"
    BuyOneButton.value = "BUY 1"
    BuyOneButton.onclick = () => {
        if (Obj.QUANTITY == 0) {
            window.alert("The required chocolate is out of stock")
        } else {
            let deletedElem = Obj._id;
            axios.put(`https://crudcrud.com/api/9d42c4cafceb4088b30884ed8f621aa7/CandyShop/${deletedElem}`, {

                CANDY: Obj.CANDY,
                DESCRIPTION: Obj.DESCRIPTION,
                PRICE: Obj.PRICE,
                QUANTITY: Obj.QUANTITY -= 1
            })
                .then((res) => {
                    showCandyOnScreen(Obj)
                    parent.removeChild(child)
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const buy2 = document.createElement('input')
    buy2.type = "button"
    buy2.value = "BUY 2"
    buy2.onclick = () => {
        if (Obj.QUANTITY == 0) {
            window.alert("The required chocolate is out of stock")
        } else {
            let deletedElem = Obj._id;
            axios.put(`https://crudcrud.com/api/9d42c4cafceb4088b30884ed8f621aa7/CandyShop/${deletedElem}`, {

                CANDY: Obj.CANDY,
                DESCRIPTION: Obj.DESCRIPTION,
                PRICE: Obj.PRICE,
                QUANTITY: Obj.QUANTITY -= 2
            })
                .then((res) => {
                    showCandyOnScreen(Obj)
                    parent.removeChild(child)
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    console.log(Obj)

    const buy3 = document.createElement('input')
    buy3.type = "button"
    buy3.value = "BUY 3"
    buy3.onclick = () => {
        if(Obj.QUANTITY==0){
            window.alert("The required chocolate is out of stock")
        }else{
            let deletedElem=Obj._id;
            axios.put(`https://crudcrud.com/api/9d42c4cafceb4088b30884ed8f621aa7/CandyShop/${deletedElem}`,{
                CANDY:Obj.CANDY,
                DESCRIPTION:Obj.DESCRIPTION,
                PRICE:Obj.PRICE,
                QUANTITY:Obj.QUANTITY-=3
            })
            .then(()=>{
                showCandyOnScreen(Obj)
                parent.removeChild(child)
            })
        }
    }

    child.appendChild(BuyOneButton)
    child.appendChild(buy2)
    child.appendChild(buy3)

    parent.appendChild(child);

}
// axios.delete("https://crudcrud.com/api/9d42c4cafceb4088b30884ed8f621aa7/CandyShop/64d72e3d448b8e03e877d286");