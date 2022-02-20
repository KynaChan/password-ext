

// print stored web list
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

      webList.append(`<div class="inputBox webRows" id="row-${i}">${storeKey} 
        <span class="material-icons-round forMoreBtn" id='forMoreBtn-${i}'>more_horiz</span>
      </div>`);
      $(`#forMoreBtn-${i}`).on("click", () => SelectedWeb(storeKey));
  } 
}


// print stored ac in a selected web
function SelectedWeb(key)
{
  let webList = $("#dashboard-list");
  webList.empty();
  $(".currTab").hide();

  $("#page-title-label").text(key);
  $("#page-title").show();
  $("#url-box").hide();

  let accounts = GetAccounts(key);

  // not working with symbols in username
  for(var id in accounts)
  {
    let row =`<div class="boxColumn"><div class="inputBox accountRows" remove-${id}>${id}
      <span class="material-icons-round" button-remove-${id} style="font-weight:bold; font-size: 30px;">remove</span></div>
    <div class="accountPwd" pwd-${id} >Password: ${accounts[id]}</div></div>`;

    webList.append(row);
    let t = id;
    $(`[button-remove-${id}]`).click(() => { RemoveUsername(key, t); });
  }
}


// remove an ac with pwd
function RemoveUsername(webUrl, id)
{
  let accounts = GetAccounts(webUrl);
  delete accounts[id];
  SetAccounts(webUrl, accounts);
  $(`[remove-${id}]`).remove();
}

// remove a web with all ac
function RemoveWeb(key)
{
  localStorage.removeItem(key);
  console.log(key)
  PopulateWebList();
}



// get the current opened tab
function CurrentTab(url) 
{
  var splitCurrURL = url.split("/");
  $("#tab").text(splitCurrURL[2]);
  checkMatches(splitCurrURL[2]);
}

// check if current tab equals to stored url
function checkMatches(url)
{
  for (var i = 0; i < localStorage.length; i++)
  {
    let storeKey = localStorage.key(i);
    if (url.includes(storeKey))
    {
      console.log(url);
      console.log(i, storeKey);
      CheckLogin(storeKey);
    }
  }
}


// check if the current tab is match to a chosen url
function CheckLogin (url)
{
  var pwdInput = $( "input:password");
  var userInput = $( "input:email")||$( "input[type='text']");
  var storedUser = (GetAccounts(url));

  console.log("matchhh");
  // userInput.autocomplete({source: storedUser, autoFocus:true});
  pwdInput.val(GetAccounts(url).val);

}



function SaveFile(name, text) {
  var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  saveAs(blob, name);
}

function ExportData(){
  console.log("hi there, wanna download?")

  var allData = {};

  for( i=0; i < localStorage.length; i++ )
  {
    let storeKey = localStorage.key(i);
        accounts = GetAccounts(storeKey);
    allData[storeKey] = accounts;
  }
  var today = new Date();
  let month = today.getMonth()+1;
  if (month < 10)
  { month ="0" + month; }
  let date = today.getDate();
  SaveFile("CatLocker_backup_"+ month + date + ".json", JSON.stringify(allData));
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

  $("#download").click(ExportData);

  chrome.tabs.getSelected(null, function(tab) {
    CurrentTab(tab.url);
  });

  console.log("DASHBOARD LOADED");
}


