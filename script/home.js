

function checkPwd(pwd)
{
  let strength = 0;


// check length
  if (pwd.length >= 8)
  {
    strength+=20; 
    $("#length").addClass("green");
  }
  else
  {
    $("#length").removeClass("green");
    $("#length").addClass("red");
  }


// check repeat char
  let chFound = 0;
  for (let i = 0; i < pwd.length; i++) 
  {
    if (pwd[i].match(pwd[i+1]) && !pwd[i].match(pwd[i+2]))
    chFound++;
  }
  if(chFound < 2) 
  {
    strength+=20;
    $("#repeat").addClass("green");
  }
  else
  {
    $("#repeat").removeClass("green");
    $("#repeat").addClass("red");
  }



// check capital
  let cap = /[A-Z]+/;

  if (pwd.match(cap)) 
  {
    strength+=20;
    $("#capital").addClass("green");
  }
  else
  {
    $("#capital").removeClass("green");
    $("#capital").addClass("red");
  }


  
// check number
  let num = /[0-9]+/;

  if (pwd.match(num))
  {
    strength+=20;  
    $("#number").addClass("green");
  }
  else
  {
    $("#number").removeClass("green");
    $("#number").addClass("red");
  }



// check symbol
  let sym = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (pwd.match(sym)) 
  {
    strength+=20; 
    $("#symbol").addClass("green");
  }
  else
  {
    $("#symbol").removeClass("green");
    $("#symbol").addClass("red");
  }


  return strength;
}




function UpdateStrength()
{
  let pwd = $("#CL-pwd").val();
  let strength = checkPwd(pwd);

  // console.log(strength);
  $("#meter").attr("value", strength);
}


function updatePwdInput()
{
  UpdateStrength();
}


function saveData() {
  const user = $("#CL-username").val();
  const pwd =  $("#CL-pwd").val();
  const urlInput = $("#url-input").val();

  if (!urlInput.length) return alert("Enter a website.");
  if(!user.length) return alert("Enter an email or username.");

  console.log(`The website is: ${urlInput}`);
  console.log(`The userName is: ${user}`);
  console.log(`The password is: ${pwd}`);

  data = window.localStorage.getItem(urlInput) ? JSON.parse(window.localStorage.getItem(urlInput)): {}
  data[user] = pwd
  window.localStorage.setItem(urlInput, JSON.stringify(data));

  $("#CL-username").val("");
  $("#CL-pwd").val("");
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
      //if(i == 5) break;
      if (value.length && !storeKey.includes(value)) continue;
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
  { localStorage.setItem(url, JSON.stringify(loadFile[url])) }
}



function OnHomeLoaded()
{
  console.log("HOME LOADED");

  $("#eyeShow").click(pwdShow);

  $("#save-btn").click(saveData);
  $("#CL-pwd").keypress(function (e){
    if(e.which == 13){$("#save-btn").click();}
  });

  $(".empty-url").click(() => SelectUrl(''));
  $("#url-input").focus(FocusUrlInput);
  $("#url-input").blur(BlurUrlInput);
  $("#url-input").on('input', updateUrlInput);

  $("#CL-pwd").keyup(UpdateStrength);
  // $("#upload").click(getFile);

  $("#upload").change(function(e) {ImportFile(e);});
  // $("#CL-pwd").on("input",updatePwdInput);
}


