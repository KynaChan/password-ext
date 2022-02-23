

function checkPwd(pwd)
{
  let strength = 0;
  strength += checkLength(pwd);
  strength += checkRepeatChar(pwd);
  strength += checkCapital(pwd);
  strength += checkNumber(pwd);
  strength += checkSymbol(pwd);
  return strength;
}

function checkLength(pwd)
{
  if (pwd.length >= 8)
  {
    addGreen($("#length"));
    return 20;
  } else { 
    addRed($("#length"));
    return 0;
  }
}

function checkRepeatChar(pwd)
{
  let chFound = 0;
  for (let i = 0; i < pwd.length; i++) 
  {
    if (pwd[i].match(pwd[i+1]) && !pwd[i].match(pwd[i+2]))
    chFound++;
  }
  if(chFound < 2) 
  {
    addGreen($("#repeat"));
    return 20;
  } else { 
    addRed($("#repeat"));
    return 0;
  }
}

function checkCapital(pwd)
{
  let cap = /[A-Z]+/;

  if (pwd.match(cap)) 
  {
    addGreen($("#capital"));
    return 20;
  } else { 
    addRed($("#capital"));
    return 0;
  }
}

function checkNumber(pwd)
{
  let num = /[0-9]+/;

  if (pwd.match(num))
  {
    addGreen($("#number"));
    return 20;
  } else { 
    addRed($("#number"));
    return 0;
  }
}

function checkSymbol(pwd)
{
  let sym = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (pwd.match(sym)) 
  {
    addGreen($("#symbol"));
    return 20;
  } else { 
    addRed($("#symbol"));
    return 0;
  }
}

// change color
function addRed(id)
{
  id.removeClass("green");
  id.addClass("red");
}
function addGreen(id)
{
  id.addClass("green");
}


function UpdateStrength()
{
  let pwd = $("#CL-pwd").val();
  let strength = checkPwd(pwd);

  $("#meter").attr("value", strength);
}


function saveData() {
  const urlInput = $("#url-input").val().trim();
  const user = $("#CL-username").val().trim();
  const pwd =  $("#CL-pwd").val();

  console.log(`The website is: ${urlInput}`);
  console.log(`The userName is: ${user}`);
  console.log(`The password is: ${pwd}`);

  data = window.localStorage.getItem(urlInput) ? JSON.parse(decrypt(window.localStorage.getItem(urlInput))): {}
  data[user] = pwd
  window.localStorage.setItem(urlInput, encrypt(JSON.stringify(data)));
}


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

      if (value.length && !storeKey.includes(value) || storeKey.includes("security_pin")) continue;
      dropDown.append(`<div class="drop-down-row" id="d-row-${i}">${storeKey}</div>`);
      $(`#d-row-${i}`).mousedown(() => SelectUrl(storeKey));
  }

  if(!dropDown.children().length) {
      dropDown.append(`<div class="drop-down-row">${value}</div>`);
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


function ImportFile(event) {
  console.log("hi there, wanna upload?")
  var readFile = new FileReader();
  readFile.onload = SetData;
  readFile.readAsText(event.target.files[0]);
}

function SetData(event){
  // alert(event.target.result);
  var loadFile = JSON.parse(event.target.result);

  for( var url in loadFile)
  { localStorage.setItem(url, encrypt( JSON.stringify(loadFile[url])) ) }
}



function OnHomeLoaded()
{
  console.log("HOME LOADED");

  $(".empty-url").click(() => SelectUrl(''));
  $("#url-input").focus(FocusUrlInput);
  $("#url-input").blur(BlurUrlInput);
  $("#url-input").on('input', updateUrlInput);

  $("#CL-pwd").keyup(UpdateStrength);
  $("#eyeShow").click(pwdShow);
  $("#save-btn").click(saveData);

  $("#upload").change(function(e) {ImportFile(e);});
}


