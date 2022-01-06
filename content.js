// let aImages = [
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpcW3nJ45ZbicwN7GQ4i6cI_zMJC8z8GvpYA&usqp=CAU",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQweWtu7Gk6-Q-vTW_k-jdphcekOi0aXKfkbQ&usqp=CAU"
// ];

// const img = document.getElementsByTagName("img");
// for(let i = 0; i<img.length;i++){
//     const random = Math.floor(Math.random()*aImages.length);
//     img[i].src = aImages[random];
// }

function saveIn(){
    let text;
    let userName = window.prompt("User name: ");
    if (userName != null || userName != "") 
        text = "Hello " + userName + "! Is that your name?";
    let userPassword = window.prompt("Password: ");
    if (userPassword != null || userPassword != "") 
        text = "Hello " + userPassword + "! Is that your password?";
    document.getElementById("output").innerHTML = text; 
}


function enterInfo() {

}

function SelectUrl(url)
{
    $("#url-input").val(url);
}

function PopulateDropDown()
{
    $(".drop-down-row").remove();
    let value = $("#url-input").val();
    let dropDown = $(".drop-down");
    for (var i=0; i < localStorage.length; i++)
    {
        let storeKey = localStorage.key(i);
        if(i == 5) break;
        if (value.length && !storeKey.startsWith(value)) continue;
        dropDown.append(`<div class="drop-down-row" onmousedown="SelectUrl('${storeKey}')">${storeKey}</div>`);
    } 

    if(!dropDown.children().length) {
        dropDown.append(`<div class="drop-down-row">No URLs found.</div>`);
    }
}

function FocusUrlInput()
{
    $("#url-box").append(`<div class="drop-down"></div>`);
    PopulateDropDown();
}

function BlurUrlInput()
{
    $(".drop-down").remove();
}

function updateUrlInput() { 
    PopulateDropDown();
}

function checkBox() {
    if (this.checked) {
        $("#myapp-password").attr('type', "text");
    } else {
        $("#myapp-password").attr('type', "password");
    }

}

function saveData() {
    const id = $("#myapp-userName").val();
    const pwd =  $("#myapp-password").val();
    const tmpKey = $("#url-input").val();

    if (!id.length || !pwd.length || !tmpKey) {
        return;
    }

    console.log(`The id is: ${id}`);
    console.log(`The password is: ${pwd}`);


    

    data = window.localStorage.getItem(tmpKey) ? JSON.parse(window.localStorage.getItem(tmpKey)): {}
    data[id] = pwd
    window.localStorage.setItem(tmpKey, JSON.stringify(data));
}


$( document ).ready(function() {

    $("#myappShowpwd").click(checkBox);
    $("#save-btn").click(saveData);

});
  






