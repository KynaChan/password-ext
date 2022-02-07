
$.ajaxSetup({cache: false});

let DATA = {
  title: "CatLocker",
  page: "home",
  pages: {
    "home": {
      onload: OnHomeLoaded,
      title: "Home",
      label: ["enhanced_encryption","space_dashboard"],
    },

    "dashboard": {
      onload: OnDashBoardLoaded,
      title: "Dashboard",
      label: "meeting_room"
    },

    "generator": {
      onload: OnGeneratorLoaded,
      title: "Generator",
      label: "meeting_room"
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
    load("generator")
    //load("dashboard")
    return;
  }

  load("home");
}


$(document).ready(function() {
  $("#page-btn").click(ToggleTab);
  load("home"); 
});

