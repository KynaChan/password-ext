
$.ajaxSetup({cache: false});

let DATA = {
  title: "CatLocker",
  page: "home",
  pages: {
    
    "register": {
      onload: OnRegisterLoaded,
      title: "Welcome!"
    },

    "home": {
      onload: OnHomeLoaded,
      title: "Home",
    },

    "dashboard": {
      onload: OnDashBoardLoaded,
      title: "Dashboard",
      label: "meeting_room",
      id:"dash"
    },

    "generator": {
      onload: OnGeneratorLoaded,
      title: "Generator",
      label: "meeting_room",
      id:"genPwd"
     }

  }
} 



function GetAccounts(url)
{
  return JSON.parse(decrypt(localStorage.getItem(url)));
}

function SetAccounts(url, dict)
{
  localStorage.setItem(url, encrypt(JSON.stringify(dict)));
}



function load(page) {
  let pageData = DATA.pages[page];
  if (!pageData) return;

  $("main").load(`${page}.html`, pageData.onload)
  $("#title").text(`${DATA.title} - ${pageData.title}`);
  $(`#${pageData.id}`).text(pageData.label);

  DATA.page = page;
}


function ToggleReg() 
{
  if(localStorage.getItem("security_pin"))
  { 
    load("home")
    $("#dash").show();
    $("#genPwd").show();
  }
  else
  {
    load ("register");
    $("#dash").hide();
    $("#genPwd").hide();
  }
}


// hide button
function ToggleGen()
{
  if(DATA.page != "generator") {
    load("generator");
    $("#dash").hide();
    return;
  } else { 
    load("home"); 
    $("#dash").show();
    //$(`#${pageData.id}`).text(pageData.selfIcon);
    $("#genPwd").text("enhanced_encryption");
  }
}


// hide button
function ToggleDash()
{
  if(DATA.page != "dashboard") {
    load("dashboard");
    $("#genPwd").hide();
    return;
  } else {
    load("home"); 
    $("#genPwd").show();
    $("#dash").text("space_dashboard");
  }
}


// show password
function pwdShow(){
  TogglePwdShow("CL-pwd");
  TogglePwdShow("newPwd");
}

function TogglePwdShow(id=""){
  let passwordInput = $(`#${id}`);
  let typeAttrVal = passwordInput.attr("type");
  let newType = typeAttrVal == "text" ? "password": "text";

  passwordInput.attr("type", newType);
}



function SaveFile(name, text) {
  var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  saveAs(blob, name);
}


function encrypt(message = '', key = ''){
  var message = CryptoJS.AES.encrypt(message, key);
  return message.toString();
}

function decrypt(message = '', key = ''){
  var code = CryptoJS.AES.decrypt(message, key);
  var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

  return decryptedMessage;
}



$(document).ready(function() {
  ToggleReg();
  $("#genPwd").click(ToggleGen);
  $("#dash").click(ToggleDash);
});

