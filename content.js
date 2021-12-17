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

function searchApp() {
    const app = getElementById("searchApp");
    let storedApp = [getElementById("inputApp")]

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

    if (!id.length || !pwd.length) {
        return;
    }

    console.log(`The id is: ${id}`);
    console.log(`The password is: ${pwd}`);


    tmpKey = window.location.href

    data = window.localStorage.getItem(tmpKey) ? JSON.parse(window.localStorage.getItem(tmpKey)): {}
    data[id] = pwd
    window.localStorage.setItem(tmpKey, JSON.stringify(data));
}


$( document ).ready(function() {

    $("#myappShowpwd").click(checkBox);
    $("#save-btn").click(saveData);

});
  






