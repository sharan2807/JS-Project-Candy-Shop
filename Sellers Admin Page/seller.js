function test(event) {
    event.preventDefault();

    const Price = event.target.sellingPrice.value;
    const Name = event.target.productName.value;
    const Category = event.target.category.value;
    // console.log(Price,Name,Category)
    const Obj = {
        PRICE: Price,
        NAME: Name,
        CATEGORY: Category
    }
    // console.log(Obj)

    axios.post("https://crudcrud.com/api/bda24dfab84e4846bc33165fff465d0c/SellersAdminPage", Obj)
        .then((res) => {
            showOnScreen(res.data)
            // console.log(res)
        })
        .catch((err) => console.log(err))

    // window.addEventListener("DOMContentLoaded", () => {
    //     axios.get("https://crudcrud.com/api/bda24dfab84e4846bc33165fff465d0c/SellersAdminPage")
    //         .then((res) => {
    //             // console.log(res);
    //             for(var i=0;i<res.data.length;i++){
    //                 showOnScreen(res.data[i]);
    //             }
    //         })
    //         .catch((err) => console.log(err))
    // })

    window.addEventListener("DOMContentLoaded", () => {
        axios.get("https://crudcrud.com/api/bda24dfab84e4846bc33165fff465d0c/SellersAdminPage")
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


    function showOnScreen(Obj) {
        // console.log(Obj.CATEGORY)
        if (Obj.CATEGORY == "Food") {
            let parent = document.getElementById("foodItems");
            let child = document.createElement('li')
            child.textContent = Obj.PRICE + ' - ' + Obj.NAME + ' - ' + Obj.CATEGORY + ' - ';

            const deleteButton = document.createElement('input')
            deleteButton.type = "button"
            deleteButton.value = "Delete Product"
            deleteButton.onclick = () => {
                let deletedElem = Obj._id;
                axios.delete(`https://crudcrud.com/api/bda24dfab84e4846bc33165fff465d0c/SellersAdminPage/${deletedElem}`)
                parent.removeChild(child)
            }
            child.appendChild(deleteButton)
            parent.appendChild(child);
        }
        else if (Obj.CATEGORY == "Electronic") {
            let parent = document.getElementById("electronicItems");
            let child = document.createElement('li')
            child.textContent = Obj.PRICE + ' - ' + Obj.NAME + ' - ' + Obj.CATEGORY + ' - ';
            parent.appendChild(child);
        } else {
            let parent = document.getElementById("skincareItems");
            let child = document.createElement('li')
            child.textContent = Obj.PRICE + ' - ' + Obj.NAME + ' - ' + Obj.CATEGORY + ' - ';
            parent.appendChild(child);
        }

    }
    // showOnScreen(Obj)

}
// axios.delete("https://crudcrud.com/api/bda24dfab84e4846bc33165fff465d0c/SellersAdminPage/64d75023448b8e03e877d312")
// axios.delete("https://crudcrud.com/api/bda24dfab84e4846bc33165fff465d0c/SellersAdminPage/64d7508d448b8e03e877d317")
