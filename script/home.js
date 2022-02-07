


let strengthText = {
  1: "Bad",
  2: "Weak",
  3: "Good",
  4: "Strong",
  5: "Everything is great, good to go!"
}

let textList = [ "Use 8 or more characters with a mix of letters, numbers & symbols.",
                  "Try not to using repeating characters.",
                  "Maybe with CAPITAL letters.",
                  "Maybe with numbers.",
                  "Maybe with symbols."
                  ];

function getPasswordScore(pwd)
{
  let strength = 0;
  
  if (pwd.length < 8) return strength = 1;
  else{   strength++;
      delete(textList[1]);
  }
  
  
  let chFound = 0;
  for (let i = 0; i < pwd.length; i++) 
  {
      if (pwd[i].match(pwd[i+1]) && 
          !pwd[i].match(pwd[i+2]))
      {chFound++;}
  }
  if(chFound < 2) 
  { textList.remove(textList[1]);
  strength++;}
  
  if (pwd.match(/[A-Z]+/)) 
  strength++;

  if (pwd.match(/[0-9]+/))
  strength++;

  if (pwd.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)) 
  strength++;

  $("#pwd-feedback").text(textList);
  return strength;
}

function UpdateStrengthFeedback()
{
  let pwd = $("#myapp-password").val();
  let strength = getPasswordScore(pwd);

  console.log(strength);
  $("#strength-bar").attr("value", strength);
  //$("#pwd-feedback").text(strengthText[strength]);

}




function updatePwdInput()
{
  UpdateStrengthFeedback();
}

function saveData() {
  const user = $("#myapp-userName").val();
  const pwd =  $("#myapp-password").val();
  const urlInput = $("#url-input").val();

  if (!urlInput.length) return alert("Enter a website.");
  if(!user.length) return alert("Enter an email or username.");


  console.log(`The website is: ${urlInput}`);
  console.log(`The userName is: ${user}`);
  console.log(`The password is: ${pwd}`);


  data = window.localStorage.getItem(urlInput) ? JSON.parse(window.localStorage.getItem(urlInput)): {}
  data[user] = pwd
  window.localStorage.setItem(urlInput, JSON.stringify(data));
  $("#myapp-userName").val("");
  $("#myapp-password").val("");
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



/*
setItem and getItem from the localStorage
*/





function OnHomeLoaded()
{
  console.log("HOME LOADED");
  
  $("#myappShowpwd").mousedown(function(){
    $("#myapp-password").attr('type', "text");
  });
  $("#myappShowpwd").mouseup(function(){
      $("#myapp-password").attr('type', "password");
  });

  $("#save-btn").click(saveData);
  $("#myapp-password").keypress(function (e){
    if(e.which == 13){$("#save-btn").click();}
  });

  $(".empty-url").click(() => SelectUrl(''));
  $("#url-input").focus(FocusUrlInput);
  $("#url-input").blur(BlurUrlInput);
  $("#url-input").on('input', updateUrlInput);
  $("#myapp-password").on('input', updatePwdInput);
}


