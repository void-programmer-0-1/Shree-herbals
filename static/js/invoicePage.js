
let addition = document.getElementById("addition");
let productTypesAvaliable;

let i_indexCounter = 0;
let d_indexCounter = 0;
let q_indexCounter = 0;
let dis_indexCounter = 0;

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url : "/productTypes/",
    }).done((response) => {
       productTypesAvaliable = response.productTypes;
    })
});

//  generates csrf token
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

let csrftoken = getCookie('csrftoken');

function createDiv(){

    let div = document.createElement("div");
    div.className = "product-container"
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.marginBottom = "10px"

    return div;
}

function createSelect(opts){

    let productType = document.createElement("select");
    productType.name = "productType";
    productType.className = "productType";
    productType.style.outline = "none";
    productType.style.marginRight = "5px";

    productType.onchange = function({ target }){
        $.ajax({
            type: "POST",
            url : "/getProduct/",
            headers: {'X-CSRFToken': csrftoken},
            data:{
                value : this.value,
            },
        }).done((response) => {
            
           let products = response.product; // this contains datalist option
           let index = $(this).index("select");
           
           let query = `#autocompelete-${index} option`;
           $(query).remove();

           let datalist = document.getElementById(`autocompelete-${index}`);
           let inputTag = document.getElementById(`input-${index}`);
    
           for (const name of products){
                let option = document.createElement("option");
                option.value = name;
                option.text =name.charAt(0).toUpperCase() + name.slice(1);
                datalist.appendChild(option);
            }

            inputTag.list = datalist.id;

        })
    }

    productTypeList = opts;

    let option = document.createElement("option");
    option.value = "none";
    productType.appendChild(option);

    for (const type of productTypeList){
        let option = document.createElement("option");
        option.value = type;
        option.text = type.charAt(0).toUpperCase() + type.slice(1);
        productType.appendChild(option);
    }

    return productType;
}

function createInput(){

    let inputTag = document.createElement("input");
    inputTag.style.borderRadius = "10px";
    inputTag.style.padding = "5px";
    inputTag.style.borderStyle = "none";
    inputTag.style.boxShadow = "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset";
    inputTag.className = "productName";
    inputTag.id = `input-${i_indexCounter++}`;
    inputTag.style.marginRight = "5px";
    inputTag.placeholder = "enter the product";

    return inputTag;
}

function createQuantityInput(){
    let inputTag = document.createElement("input");
    inputTag.type = "number";
    inputTag.style.borderRadius = "10px";
    inputTag.style.marginRight = "5px";
    inputTag.style.padding = "5px";
    inputTag.style.borderStyle = "none";
    inputTag.style.boxShadow = "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset";
    inputTag.style.width = "100px"
    inputTag.className = "productName";
    inputTag.id = `q-input-${q_indexCounter++}`;
    inputTag.placeholder = "quantity";

    return inputTag;
}

function createDataList(opts){

    dataList = document.createElement("datalist");
    dataList.id = `autocompelete-${d_indexCounter++}`;

    let productTypeList = opts;
    
    for (const type of productTypeList){
        let option = document.createElement("option");
        option.value = type;
        option.text = type.charAt(0).toUpperCase() + type.slice(1);
        dataList.appendChild(option);
    }
    
    return dataList;
}

function createDiscountInput(){
    let inputTag = document.createElement("input");
    inputTag.type = "number";
    inputTag.style.borderRadius = "10px";
    inputTag.style.padding = "5px";
    inputTag.style.borderStyle = "none";
    inputTag.style.boxShadow = "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset";
    inputTag.style.width = "100px"
    inputTag.className = "DiscountAmount";
    inputTag.id = `dis-input-${dis_indexCounter++}`;
    inputTag.placeholder = "discount";
    inputTag.value = 0;

    return inputTag;
}

document.getElementById("add-product").addEventListener("click",() => {

    // creates the div tag
    let div = createDiv();

    // creates the select tag
    let select = createSelect(productTypesAvaliable);
    div.appendChild(select);

    // creates the input tag
    let inputTag = createInput();

    // creates the datalist tag
    let dataList = createDataList(productTypesAvaliable);
    div.appendChild(dataList);

    // linking the datalist to the input tag
    inputTag.setAttribute("list",dataList.id);
    div.appendChild(inputTag);

    // creates the quantity input tag
    let quantityInputTag = createQuantityInput();
    div.appendChild(quantityInputTag);

    // creates the discount input tag
    let discountInputTag = createDiscountInput();
    div.appendChild(discountInputTag);

    // adds the div to the addition div
    addition.appendChild(div);

});

document.getElementById("gen-product").addEventListener("click",() => {

    if(document.getElementById("customer-name").value == '' ){
        alert("Enter Customer Name");
        return;
    }

    if(document.getElementById("customer-address").value == ''){
        alert("Enter Customer Address")
        return;
    }

    if(document.getElementById("shipping").value == ""){
        alert("Enter Shipping amount");
        return;
    }

    if(document.getElementById("input-0") == null){
        alert("Add Products");
        return;
    }

   let parentElement = [...(document.getElementById("addition").children)];

    dataset = [];

    for(let i=0;i<parentElement.length;i++){
       
        let instance = {};
        
        let select_data = parentElement[i].querySelector(".productType").value;
        let product_data = parentElement[i].querySelector(`#input-${i}`).value;
        let quantity_data = parentElement[i].querySelector(`#q-input-${i}`).value;
        let discount_data = parentElement[i].querySelector(`#dis-input-${i}`).value;

        document.getElementById

        instance["productType"] = select_data;
        instance["productName"] = product_data;
        instance["quantity"] = quantity_data;
        instance["discount"] = discount_data;

        dataset.push(instance);

    }

    console.log(dataset);

    $.ajax({
        type: "POST",
        url : "/generateInvoiceData/",
        headers: {'X-CSRFToken': csrftoken},
        data:{
            name : document.getElementById("customer-name").value,
            address : document.getElementById("customer-address").value,
            shipping : document.getElementById("shipping").value,
            value : JSON.stringify(dataset),
        },
    }).done((response) => {
        window.location.href = '/generateInvoice/'
    });

});

/*

111/11 vinayaga nagar,
Gundhu Pillaiyar Kovil,
ammapet,
salem - 636003.

*/