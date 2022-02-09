
//document.body.style.backgroundColor = "yellow";
//const newContent = "Hi there and greetings!";

//const { stringify } = require("querystring");


// var btn = "<button style='height:300px;width:300px;color:black;z-index:100;'>oerigwirngowirngowr</button>";
// $("*:password").append(btn);
//document.body.insertBefore(newDiv, currentDiv);



function copyPwd() 
{
    var pwdInput = $("#newPwd").val();
    $.trim(pwdInput);
    navigator.clipboard.writeText(pwdInput);
    //console.log("COPIED!!");
}


function checkSelection()
{
    let length = $(".slider").val();
    let newPwd = "";
    let lengthDivisor = 1;

    let upperChars = $("#upper").is(":checked");
        numberChars = $("#number").is(":checked"); 
        symbolChars = $("#symbol").is(":checked");

    if (upperChars) lengthDivisor++;
    if (numberChars) lengthDivisor++;
    if (symbolChars) lengthDivisor++;


    for(i = 0; i < length; i++)
    {
        if (upperChars) { 
            newPwd += getUpper();
            upperChars--;
        }
        else if (numberChars) { 
            newPwd += getNumbers(); 
        }
        else if (symbolChars) { 
            newPwd += getSymbols(); 
        } 
        else { 
            newPwd += getLower(); 
        } 
    }

    //var fin = newPwd.slice(0,length);
    return newPwd;
    //console.log(newPwd);
}

function generator()
{
    var newPwd = checkSelection();
        shufflePwd = shuffle(newPwd);
    $("#newPwd").val(shufflePwd);
}


function getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getLower()
{
    return String.fromCharCode(getRandomRange(97,122));
}
function getUpper()
{
    return String.fromCharCode(getRandomRange(65,90));
}
function getNumbers()
{
    return String.fromCharCode(getRandomRange(48,57));
}
function getSymbols()
{
    const symb = "!@#$%^&*()_+-=[]{};':\"|,.<>\/\\?"
    //console.log(symb);
    return symb[Math.floor(Math.random()*symb.length) | 0];
}


function shuffle(pwd)
{
    var pwdSplit = pwd.split("");
        length = pwdSplit.length;
    
    for (i = length - 1; i > 0; i--)
    {
        var j = Math.floor(Math.random() * (i + 1));
        var char = pwdSplit[i];
        pwdSplit[i] = pwdSplit[j];
        pwdSplit[j] = char;
    }
    return pwdSplit.join("");
}







function OnGeneratorLoaded()
{

    $('.slider').on('input',function () {
        var numb = $(this).val();
      
        $("#numbInput").val(numb);
        $("#numb").text(numb);
      });
      $('#numbInput').on('input', function(){
        var numb = $(this).val();

        if (numb > 32) { $(this).val(32); }
        else if (numb < 6) { $(this).val(6); } 

        $('.slider').val($(this).val());
        $("#numb").text($(this).val());
      });
    
    $(".slider").mousemove(function(event){ 
        $("#numb").css("margin-left",event.pageX)
    })

    // $(".slider").on('input', slider);
     $("#generate").click(generator);
    
    $("#myappShowpwd").mousedown(function(){
        $("#newPwd").attr('type', "text");
      });
      $("#myappShowpwd").mouseup(function(){
          $("#newPwd").attr('type', "password");
      });

      $("#copyPwd").click(copyPwd);

    console.log("generator LOADED");
}
