

function userRegister() {
    var pin = $("#userPIN").val(),
        hashPin = CryptoJS.SHA256(pin);

    localStorage.setItem("security_pin", hashPin);


    alert("\n" + "Your PIN: " + pin + "\n" + "Please remember the PIN for managing your account!");
}


function OnRegisterLoaded()
{
    $("#regForm").on("submit", userRegister);
}

