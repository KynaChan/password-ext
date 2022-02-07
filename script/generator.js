
//document.body.style.backgroundColor = "yellow";
//const newContent = "Hi there and greetings!";


// var btn = "<button style='height:300px;width:300px;color:black;z-index:100;'>oerigwirngowirngowr</button>";
// $("*:password").append(btn);
//document.body.insertBefore(newDiv, currentDiv);



function copyPwd() 
{
    var pwdInput = $("#generatePwd").val();
    $.trim(pwdInput);
    navigator.clipboard.writeText(pwdInput);
    console.log("COPIED!!");
}

function slider()
{    
    var value = $(".slider").val();
    var result = $("#numb");
    result.text(value);
}






function OnGeneratorLoaded()
{

    $("#copyPwd").click(copyPwd);
    $(".slider").on('input', slider);

    
    $("#myappShowpwd").mousedown(function(){
        $("#generatePwd").attr('type', "text");
      });
      $("#myappShowpwd").mouseup(function(){
          $("#generatePwd").attr('type', "password");
      });

    console.log("generator LOADED");
}
