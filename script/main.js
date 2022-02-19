
$.ajaxSetup({cache: false});

let DATA = {
  title: "CatLocker",
  page: "home",
  pages: {
    "home": {
      onload: OnHomeLoaded,
      title: "Home",
    },

    "dashboard": {
      onload: OnDashBoardLoaded,
      title: "Dashboard",
      selfIcon: "space_dashboard",
      label: "meeting_room",
      id:"dash"
    },

    "generator": {
      onload: OnGeneratorLoaded,
      title: "Generator",
      selfIcon: "enhanced_encryption",
      label: "meeting_room",
      id:"genPwd"
    }
  }
} 

function GetAccounts(url)
{
  return JSON.parse(localStorage.getItem(url));
}

function SetAccounts(url, dict)
{
  localStorage.setItem(url, JSON.stringify(dict));
}

function load(page) {
  let pageData = DATA.pages[page];
  if (!pageData) return;

  $("main").load(`${page}.html`, pageData.onload)
  $("#title").text(`${DATA.title} - ${pageData.title}`);
  $(`#${pageData.id}`).text(pageData.label);

  DATA.page = page;
}

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


function pwdShow(){
  if( $("#CL-pwd").attr('type') == "password" || $("#newPwd").attr('type') == "password" )
  { 
    $("#CL-pwd").attr('type', "text"); 
    $("#newPwd").attr('type', "text"); 
  } else { 
    $("#CL-pwd").attr('type', "password"); 
    $("#newPwd").attr('type', "password"); 
  }
}



$(document).ready(function() {
  $("#genPwd").click(ToggleGen);
  $("#dash").click(ToggleDash);
  load("home"); 
});

