
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
    if (storeKey.includes("security_pin")) continue;
      
    webList.append(`<div class="inputBox webBox boxBorder"><label class="webRows" id="row-${i}">${storeKey}</label>
      <span class="material-icons-round webRemoveBtn" id="webRemoveBtn-${i}" style="font-size: 30px;">delete_forever</span>
    </div>`);

    $(`#row-${i}`).on("click", () => SelectedWeb(storeKey));
    $(`#webRemoveBtn-${i}`).on("click", () => RemoveWeb(storeKey))
  }
}


// print stored ac in a selected web
function SelectedWeb(key)
{
  let webList = $("#dashboard-list"),
      pageBox = $("#page-title");

  webList.empty();
  $(".currTab").hide();

  pageBox.show();
  $("#page-title-label").text(key);
  $("#url-box").hide();

  let accounts = GetAccounts(key);
  var buttonIndex = 0;

  for(var id in accounts)
  {
    let row =`<div class="boxColumn"><div class="inputBox accountRows" remove-${buttonIndex}>${id}
      <span class="material-icons-round" button-remove-${buttonIndex} style="font-weight:bold; font-size: 30px;">remove</span></div>
    <div class="accountPwd" pwd-${buttonIndex} >Password: ${accounts[id]}</div></div>`;

    // let linkBtn = `<span id="page-url-btn" class="material-icons-round" style="font-size: 30px; font-weight: bold;">link</span>`

    webList.append(row);
    // pageBox.append(linkBtn);

    let t = id;
    $(`[button-remove-${buttonIndex}]`).click(() => { RemoveUsername(buttonIndex, key, t); });

    buttonIndex++;
  }
}

// remove an ac with pwd
function RemoveUsername(buttonIndex, webUrl, id)
{
  let accounts = GetAccounts(webUrl);
  delete accounts[id];
  SetAccounts(webUrl, accounts);
  $(`[remove-${buttonIndex}]`).remove();
  SelectedWeb(webUrl);
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
    if (storeKey.includes("security_pin")) continue;

    let accounts = GetAccounts(storeKey);
    allData[storeKey] = accounts;
  }
  var today = new Date();
  let month = today.getMonth()+1;
  if (month < 10)
  { month ="0" + month; }
  let date = today.getDate();
  SaveFile("CatLocker_backup_"+ month + date + ".json", JSON.stringify(allData) );
}



function hideDash()
{
  $(".registerBox").show();
  $(".note").hide();
  $("#dashboard-list").hide();
}
function showDash()
{
  if (!checkPinExist()) { hideDash(); }
  $(".registerBox").hide();
  $(".note").show();
  $("#dashboard-list").show();
}

function getPin()
{
  var inputPin = $("#dashPIN").val(),
      hashInputPin = CryptoJS.SHA256(inputPin),
      existPin = localStorage.security_pin;

  if ( hashInputPin == existPin )
  {
    ramStorage.setItem('security_pin',hashInputPin);
    showDash();
    setPinTimeout();
  }

  let warning = `<b class="warning"><span class="material-icons-outlined">report_gmailerrorred</span>Wrong PIN. Please try again.</b>`
  $("#dashPIN").val("");

  if ($(".warning").length) return;
  $(".registerBox").append(warning);
}


function checkPinExist()
{
  return(ramStorage.security_pin);
}
function setPinTimeout()
{
  const pinTimeout = setTimeout(clearPin, 10000);
}
function clearPin()
{
  ramStorage.removeItem( 'security_pin' );
}



function OnDashBoardLoaded()
{
  hideDash();

  $("#dashPIN").keypress(function(event) {
    if (event.keyCode === 13) {
        $("#pinSubmit").click();}});

  $("#pinSubmit").click(getPin);


  PopulateWebList();
  $("#page-title-btn").click(PopulateWebList);

  $("#download").click(ExportData);

  chrome.tabs.getSelected(null, function(tab) {
    CurrentTab(tab.url);
  });

  console.log("DASHBOARD LOADED");
}


