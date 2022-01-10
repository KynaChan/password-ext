


function SelectUrl(url)
{
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
        if (value.length && !storeKey.startsWith(value)) continue;
        dropDown.append(`<div class="drop-down-row" id="d-row-${i}">${storeKey}</div>`);
        $(`#d-row-${i}`).mousedown(() => SelectUrl(storeKey));
    } 

    if(!dropDown.children().length) {
        dropDown.append(`<div class="drop-down-row">No URLs found.</div>`);
    }
}

function FocusUrlInput()
{
    $("#url-box").append(`<div class="drop-down"></div>`);
    PopulateDropDown();
}

function BlurUrlInput()
{
    $(".drop-down").remove();
}

function updateUrlInput() { 
    PopulateDropDown();
}

function pwdToggle() {
    $("#myappShowpwd").mousedown(function(){
        $("#myapp-password").attr('type', "text");
    });    
    $("#myappShowpwd").mouseup(function(){
        $("#myapp-password").attr('type', "password");
    });
        
}

let strengthText = {
    0: "Worst",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
}

function saveData() {
    const user = $("#myapp-userName").val();
    const pwd =  $("#myapp-password").val();
    const urlInput = $("#url-input").val();

    if (!urlInput.length) return alert("Enter a website.");
    if(!user.length) return alert("Enter an email or username.");
    if(pwd.length<8) return alert("Use 8 or more characters with a mix of letters, numbers & symbols.");
    else if(!/[0-9]+/.test(pwd)) return $("#pw-feedback").text("Strength: " + strengthText)
    else if(! /[A-Z]+/.test(pwd)) return console.log("NEED CAPs");
    else if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pwd)) return console.log("nee& $ymbo!");


    //if (!id.length || !pwd.length || !urlInput) return;

    console.log(`The website is: ${urlInput}`);
    console.log(`The userName is: ${user}`);
    console.log(`The password is: ${pwd}`);


    data = window.localStorage.getItem(urlInput) ? JSON.parse(window.localStorage.getItem(urlInput)): {}
    data[user] = pwd
    window.localStorage.setItem(urlInput, JSON.stringify(data));
    $("#myapp-userName").val("");
    $("#myapp-password").val("");
}

$( document ).ready(function() {

    $("#myappShowpwd").click(pwdToggle);
    $("#save-btn").click(saveData);
    $(".empty-url").click(() => SelectUrl(''));
    $("#url-input").focus(FocusUrlInput);
    $("#url-input").blur(BlurUrlInput);
    $("#url-input").on('input', updateUrlInput);
});
  
















function example() {
    const pwd = document.getElementById($('#myapp-password'));
    const meter = document.getElementById($('#strength-bar'));
    const text = document.getElementById($('#pw-strength-text'));

    this.pwd.addEventListener('input', function(){
        const val = pwd.val;
        const result = "zxcvbn(val);";

        meter.val = result.score;
        if(val) text.innerHTML = "Strength: " + strengthText[result.score] + "<span class='feedback'>" + result.feedback.warning + " " + result.feedback.suggestions + "</span"; 
        else {text.innerHTML = "";}
    });
}