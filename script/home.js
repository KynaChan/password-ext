

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
function addRed(eleId)
{
  eleId.removeClass("green");
  eleId.addClass("red");
}
function addGreen(eleId)
{
  eleId.addClass("green");
}


function UpdateStrength()
{
  let pwd = $("#CL-pwd").val();
  let strength = checkPwd(pwd);

  $("#meter").attr("value", strength);
}


function saveData()
{
  const urlInput = $("#url-input");
  const user = $("#CL-username");
  const pwd =  $("#CL-pwd");

  const urlInputVal = urlInput.val().trim();
  const userVal = user.val().trim();
  const pwdVal =  pwd.val();

  let page = new Page(urlInputVal);
  page.SetAccount(userVal, pwdVal);
  page.SaveToStorage();
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
  var readFile = new FileReader();
  readFile.onload = SetData;
  readFile.readAsText(event.target.files[0]);
}

function SetData(event){
  var loadFile = JSON.parse(event.target.result);

  for( var url in loadFile)
  { localStorage.setItem(url, JSON.stringify(loadFile[url])) }
}



function OnHomeLoaded()
{
  $(".empty-url").click(() => SelectUrl(''));
  $("#url-input").focus(FocusUrlInput);
  $("#url-input").blur(BlurUrlInput);
  $("#url-input").on('input', PopulateDropDown);

  $("#CL-pwd").keyup(UpdateStrength);
  $("#eyeShow").click(pwdShow);
  $("#save-form").on("submit", () => saveData());

  $("#upload").change(function(e) {ImportFile(e);});
}


