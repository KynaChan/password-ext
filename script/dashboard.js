


function ShowWebSearch()
{
  let webList = $(".dashboard-list");
  $(".accountRows").remove();
  let value = $("#url-input").val();
  for (var i=0; i < localStorage.length; i++)
  {
      let storeKey = localStorage.key(i);
      if (value.length && !storeKey.includes(value)) continue;
      webList.append(`<div class="inputBox accountRows" id="row-${i}">${storeKey}</div>`);
      $(`#row-${i}`).mousedown(function(storeKey){
        $(".accountRows").append(storeKey);
      });
  } 

  if(!webList.children().length) {
    webList.append(`<div class="inputBox accountRows">No URLs found.</div>`);
  }
}



function PopulateWebList()
{
  $("#page-title").hide();
  $("#url-box").show();
  $(".currTab").show();

  let webList = $("#dashboard-list");
  webList.empty();
 
  for (var i = 0; i < localStorage.length; i++)
  {
      let storeKey = localStorage.key(i);
      webList.append(`<div class="inputBox accountRows" id="row-${i}" style="word-break:break-all;">${storeKey} 
      <span class="material-icons-round forMore" style="font-size: 30px; font-weight: bold;" id='forMore-${i}'>more_horiz</span></div>`);
      $(`#forMore-${i}`).on("click", () => SelectWeb(storeKey));
  } 
}


function SelectWeb(key)
{
  let webList = $("#dashboard-list");
  webList.empty();
  $(".currTab").hide();

  $("#page-title-label").text(key);
  $("#page-title").show();
  $("#url-box").hide();

  $(".webRemoveBtn").click(() => { RemoveWeb(key); });

  let accounts = GetAccounts(key);
  for(var id in accounts)
  {
    let row =`<div class="inputBox" style="word-break:break-all;" remove-${id}>${id}<span class="material-icons-round" button-remove-${id} 
              style="font-weight:bold; font-size: 30px;">remove</span></div>`;

    webList.append(row);
    let t = id;
    $(`[button-remove-${id}]`).click(() => { RemoveUsername(key, t); });
  }
}

function RemoveUsername(webUrl, id)
{
  let accounts = GetAccounts(webUrl);
  delete accounts[id];
  SetAccounts(webUrl, accounts);
  $(`[remove-${id}]`).remove();
}

function RemoveWeb(key)
{
  localStorage.removeItem(key);
  console.log(key)
  PopulateWebList();
}


function getURL()
{
  for (var i = 0; i < localStorage.length; i++)
  {
      let storeKey = localStorage.key(i);
      return storeKey;
  }
  return;
}


//get the current opened tab
function CurrentTab(url) 
{
  var splitCurrURL = url.split("/");
  $(".tab").text(splitCurrURL[2]);
  var storedURL = getURL();
  if (!splitCurrURL[2].includes(storedURL)) { return; }
  CheckAutoLogin(storedURL);

}


function CheckAutoLogin (url)
{
  var pwdInput = $( "input:password");
  var userInput = $( "input:email")||$( "input[type='text']");
  var storedUser = (GetAccounts(url));

  console.log("yayaa");
  userInput.autocomplete({source: storedUser, autoFocus:true});
  pwdInput.val(GetAccounts(url).val);

}






function OnDashBoardLoaded()
{
  PopulateWebList();
  $("#page-title-btn").click(PopulateWebList);

  $(".empty-url").click(() => SelectUrl(''));
  $("#url-input").focus(FocusUrlInput);
  $("#url-input").blur(BlurUrlInput);
  $("#url-input").on('input', PopulateDropDown);
  //$("#url-input").on('input', ShowWebSearch);
  
  chrome.tabs.getSelected(null, function(tab) {
    CurrentTab(tab.url);
  });


    
  console.log("DASHBOARD LOADED");
}


