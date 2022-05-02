

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

    let withoutPin = `<div class="inputBox webBox boxBorder"><label class="webRows" id="row-${i}">${storeKey}</label></div>`;
    let withPin = `<div class="inputBox webBox boxBorder"><label class="webRows" id="row-${i}">${storeKey}</label>
      <span class="material-icons-round webRemoveBtn" id="webRemoveBtn-${i}" style="font-size: 30px; border-left: 4px solid white;">
      delete_forever</span>
    </div>`;

    if(getWithExpiry('expiry_security_pin'))
    { 
      webList.append(withPin);
    } else {
      webList.append(withoutPin);
    }

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
  let buttonIndex = 0;

  for(var id in accounts)
  {
    let row =`<div class="boxColumn">

      <div class="inputBox accountRows" remove-${buttonIndex}>
        <div id="accountRow">${buttonIndex+1}. ${id}</div>
      </div>
    
      <div class="inputBox pwdBox">
        <input pwd-field-${buttonIndex} id="pwdRow" class="pwdBox dash-input" 
          type="password" value=${accounts[id]} readonly
        >
      </div>

    </div>`;

    let decryptedPwd = decrypt(accounts[id]);

    let decryptedRow =`<div class="boxColumn">

    <div class="inputBox accountRows" account-${buttonIndex}>
      <div class="fa fa-user"></div>
      <input account-field-${buttonIndex} id="accountRow-${buttonIndex}" class="dash-input" spellcheck=false 
        type="text" value=${id}
      >
      <span class="material-icons-round" button-remove-${buttonIndex} 
        style="font-weight:bold; font-size: 30px;">remove
      </span>
    </div>

    <div pwd-${buttonIndex} class="inputBox pwdBox">
      <div class="fa fa-lock"></div>
      <input pwd-field-${buttonIndex} id="pwdRow" spellcheck=false class="dash-input" 
        type="text" value=${decryptedPwd}
      >
      <div class="material-icons-round" button-copy-${buttonIndex} 
        style="font-weight:bold; font-size: 25px; transform:scaleX(-1);">copy
      </div>
    </div>

    <div class="btnDiv">
      <button button-reset-${buttonIndex} class="saveButton" id="db-reset-btn" >RESET</button>
      <button button-save-${buttonIndex} class="saveButton" id="db-save-btn" >SAVE</button>
    </div>

    </div>`;

    let userVal = id;
    let index = buttonIndex;

    if (getWithExpiry('expiry_security_pin'))
    {
      webList.append(decryptedRow);
      EditUrl();
    } else {
      webList.append(row);
    }

    $(`[button-save-${buttonIndex}]`).click(() => SaveAccountChanges(index, key, userVal));
    $(`[button-reset-${buttonIndex}]`).click(() => ResetAccountChanges(index, userVal, decryptedPwd));

    $(`[button-remove-${buttonIndex}]`).click(() => { RemoveUsername(buttonIndex, key, userVal); });
    $(`[button-copy-${buttonIndex}]`).click(() => { copyStoredPwd(decryptedPwd); });
    buttonIndex++;
  }

  $("#page-key-btn").click( showPinForm );
  $("#page-save-btn").click(() => UpdateUrl());
  $("#dash-Form").on("submit", function(event) { getPin(event) });
}


function copyStoredPwd(decryptedPwd) 
{
  var pwdInput = `${decryptedPwd}`;
  navigator.clipboard.writeText(pwdInput);
}


// remove an ac with pwd
function RemoveUsername(buttonIndex, webUrl, id)
{
  let accounts = GetAccounts(webUrl);
  delete accounts[id];
  SetAccounts(webUrl, accounts);
  $(`[account-${buttonIndex}]`).remove();
  ViewWeb(webUrl);
}

// remove a web with all ac
function RemoveWeb(key)
{
  localStorage.removeItem(key);
  PopulateWebList();
}



function ExportData(){

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
  $("#dashboard-list").show();
}

function showPinForm(){
  $("#dash-Form").show();
  $("#dashboard-list").hide();
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
    setWithExpiry('expiry_security_pin', hashInputPin, 180000);
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
  // if (getWithExpiry('expiry_security_pin')) 
  // {
  //   $("#go-back-btn").click(SaveNewUrl); 
  //   PopulateWebList();
  // }

  $("#dash-Form").on("submit", function(event) { getPin(event) });

  $("#download").click(ExportData);
}


