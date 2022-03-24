

// print stored web list
function PopulateWebList()
{
  $("#page-title").hide();

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
        <div id="accountRow">${buttonIndex+1}. ${id}</div>
      </div>
    
      <div class="inputBox pwdBox">

        <input pwd-field-${buttonIndex} id="pwdRow" class="pwdBox dash-input" 
          type="password" value=${accounts[id]} maxlength="0" minlength="0"
        />

      </div>

    </div>`;

    let decryptedPwd = decrypt(accounts[id]);

    let decryptedRow =`<div class="boxColumn">

    <div class="inputBox accountRows" remove-${buttonIndex}>
      <div class="fa fa-user"></div>
      <input id="accountRow" class="dash-input" spellcheck=false type="text" value=${id} />
      <span class="material-icons-round" button-remove-${buttonIndex} style="font-weight:bold; font-size: 30px;">remove</span>
    </div>

    <div pwd-${buttonIndex} class="inputBox pwdBox">
      <div class="fa fa-lock"></div>
      <input pwd-field-${buttonIndex} id="pwdRow" spellcheck=false class="dash-input"
        type="text" value=${decryptedPwd}
      />
      <div class="material-icons-round"></div>
    </div>

    </div>`;

    if (getWithExpiry('expiry_security_pin'))
    {
      webList.append(decryptedRow);
    } else {
      webList.append(row);
    }

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
    setWithExpiry('expiry_security_pin', hashInputPin, 60000);
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


