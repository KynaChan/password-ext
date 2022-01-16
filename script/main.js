
$.ajaxSetup({cache: false});

let DATA = {
  title: "CatLocker",
  page: "home",
  pages: {
    "home": {
      onload: OnHomeLoaded,
      title: "Home",
      label: "space_dashboard",
    },

    "dashboard": {
      onload: OnDashBoardLoaded,
      title: "Dashboard",
      label: "meeting_room",
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
  $("#page-btn").text(pageData.label);

  DATA.page = page;
}

function ToggleTab()
{
  if(DATA.page == "home") {
    load("dashboard")
    return;
  }

  load("home");
}


$(document).ready(function() {
  $("#page-btn").click(ToggleTab);
  load("home"); 
});


function SelectUrl(url) {
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
      //if(i == 5) break;
      if (value.length && !storeKey.startsWith(value)) continue;
      dropDown.append(`<div class="drop-down-row" id="d-row-${i}">${storeKey}</div>`);
      $(`#d-row-${i}`).mousedown(() => SelectUrl(storeKey));
  } 

  if(!dropDown.children().length) {
      dropDown.append(`<div class="drop-down-row">No URLs found.</div>`);
  }
}

function FocusUrlInput() {
  $("#url-box").append(`<div class="drop-down"></div>`);
  PopulateDropDown();
}

function BlurUrlInput() {
  $(".drop-down").remove();
}

function updateUrlInput() { 
  PopulateDropDown();
}







/*
function EXAMPLE() {
  const pwd = document.getElementById($('#myapp-password'));
  const meter = document.getElementById($('#strength-bar'));
  const text = document.getElementById($('#pw-strength-text'));

  this.pwd.addEventListener('input', function(){
      const val = pwd.val;
      const result = "zxcvbn(val);";

      meter.val = result.score;
      if(val) text.innerHTML = "Strength: " + strengthText[result.score] + "<span class='feedback'>" + result.feedback.warning + " " + result.feedback.suggestions + "</span"; 
      else {text.innerHTML = "";}
  });
}
*/