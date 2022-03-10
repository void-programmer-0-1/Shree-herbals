
window.onload = function(){
    let currentDT = new Date();

    let date = `${currentDT.getDate()}/${currentDT.getMonth()}/${currentDT.getFullYear()}`
    document.getElementById("date").innerHTML = date;
        
    let time = `${currentDT.getHours()}:${currentDT.getMinutes()}:${currentDT.getSeconds()}`
    document.getElementById("time").innerHTML  = time;
}


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

document.getElementById("printbtn").addEventListener("click",() => {
    $.ajax({
        type: "POST",
        url : "/incrementSalesNumber/",
        headers: {'X-CSRFToken': csrftoken},
        data:{
            code : "200"
        },
    })
});