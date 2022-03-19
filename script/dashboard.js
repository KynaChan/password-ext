

// print stored web list
function PopulateWebList()
{
  $("#page-title").hide();
  // $(".currTab").show();

  let webList = $("#dashboard-list");
  webList.empty();
 
  for (var i = 0; i < localStorage.length; i++)
  {
    let storeKey = localStorage.key(i);
    if (storeKey.includes("security_pin") || storeKey.includes("expiry_security_pin")) continue;

    webList.append(`<div class="inputBox webBox boxBorder"><label class="webRows" id="row-${i}">${storeKey}</label>
      <span class="material-icons-round webRemoveBtn" id="webRemoveBtn-${i}" style="font-size: 30px;">delete_forever</span>
    </div>`);

    $(`#row-${i}`).on("click", () => ViewWeb(storeKey));
    $(`#webRemoveBtn-${i}`).on("click", () => RemoveWeb(storeKey))
  }
}


// print stored ac in a selected web
function ViewWeb(key)
{
  let webList = $("#dashboard-list");
  webList.empty();
  $("#page-title").show();
  $("#page-title-label").text(key);
  $("#page-save-btn").hide();

  let page = new Page(key);
  let accounts = page.GetAccountsDict();
  var buttonIndex = 0;

  for(var id in accounts)
  {
    let row =`<div class="boxColumn">

      <div class="inputBox accountRows" remove-${buttonIndex}>
        <div id="accountRow">${id}</div>
        <span class="material-icons-round" button-remove-${buttonIndex} style="font-weight:bold; font-size: 30px;">remove</span>
      </div>

      <div pwd-${buttonIndex}>
        <input pwd-field-${buttonIndex} id="pwdRow" class="pwd-input-field" type="password" value=${accounts[id]}/>
      </div>

    </div>`;

    let decryptedRow =`<div class="boxColumn">

    <div class="inputBox accountRows" remove-${buttonIndex}>
      <div id="accountRow">${id}</div>
      <span class="material-icons-round" button-remove-${buttonIndex} style="font-weight:bold; font-size: 30px;">remove</span>
    </div>

    <div pwd-${buttonIndex}>
      <input pwd-field-${buttonIndex} id="pwdRow" class="pwd-input-field" type="text" value=${accounts[id]}/>
    </div>

    </div>`;

    if (getWithExpiry('expiry_security_pin'))
    {
      decrypt(accounts[id]);
      webList.append(decryptedRow);
    } else {webList.append(row);}

    let t = id;
    $(`[button-remove-${buttonIndex}]`).click(() => { RemoveUsername(buttonIndex, key, t); });
    buttonIndex++;
  }

  $("#page-title-label").click(() => { EditUrl() });

  $("#page-key-btn").click( showPinForm );
  $("#page-save-btn").click(() => SaveNewUrl());
  $("#dash-Form").on("submit", function(event) { getPin(event) });
}


// remove an ac with pwd
function RemoveUsername(buttonIndex, webUrl, id)
{
  let accounts = GetAccounts(webUrl);
  delete accounts[id];
  SetAccounts(webUrl, accounts);
  $(`[remove-${buttonIndex}]`).remove();
  ViewWeb(webUrl);
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
  var userInput = $( "input:email") || $( "input[type='text']");
  var storedUser = (GetAccounts(url));

  console.log("matchhh");
  // userInput.autocomplete({source: storedUser, autoFocus:true});
  pwdInput.val(GetAccounts(url).val);
}



function ExportData(){
  console.log("hi there, wanna download?")

  var allData = {};

  for( i=0; i < localStorage.length; i++ )
  {
    let storeKey = localStorage.key(i);
    if (storeKey.includes("security_pin") || storeKey.includes("expiry_security_pin")) continue;

    let page = new Page(storeKey);
    let accounts = page.GetAccountsDict();
    allData[storeKey] = accounts;
  }

  var today = new Date();
  let month = today.getMonth()+1;
  if (month < 10)
  { month ="0" + month; }
  let date = today.getDate();
  SaveFile("CatLocker_backup_"+ month + date + ".json", JSON.stringify(allData) );
}



function hidePinForm()
{
  $("#dash-Form").hide();
  $("#page-title").show();
  // PopulateWebList();
}

function showPinForm(){
  $("#dash-Form").show();
  $("#dashboard-list").empty();
  $("#page-title").hide();
}


function getPin(event)
{
  event.preventDefault();

  var inputPin = $("#dashPIN").val(),
      hashInputPin = CryptoJS.SHA256(inputPin),
      existPin = localStorage.security_pin;

  if ( hashInputPin == existPin )
  {
    setWithExpiry('expiry_security_pin', hashInputPin, 20000);
    hidePinForm();
    PopulateWebList();
  }

  let warning = `<b class="warning"><span class="material-icons-outlined" style="font-size: 20px;" >
    report_gmailerrorred</span>Wrong PIN. Please try again.</b>`

  if ($(".warning").length) return;
  if ( hashInputPin != existPin ) { $(".registerBox").append(warning); }

  $("#dashPIN").val("");
}


function setWithExpiry(key, value, ttl) {
  const currTime = new Date()
  const item = {
    value: value,
    expiry: currTime.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) { return null; }

  const item = JSON.parse(itemStr),
    currTime = new Date();

  if (currTime.getTime() > item.expiry)
  {
    localStorage.removeItem(key);
    return false;
  }
  return true;
}


function OnDashBoardLoaded()
{
  $("#dash-Form").hide();

  PopulateWebList();
  $("#go-back-btn").click(PopulateWebList);
  $("#dash-Form").on("submit", function(event) { getPin(event) });

  $("#download").click(ExportData);

  chrome.tabs.getSelected(null, function(tab) {
    CurrentTab(tab.url);
  });

  console.log("DASHBOARD LOADED");
}


