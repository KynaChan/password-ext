




function UpdateHeader()
{
  
}


function PopulateWebList()
{
  $("#page-title").hide();
  $("#url-box").show();
  let webList = $("#dashboard-list");
  webList.empty();
 
  for (var i = 0; i < localStorage.length; i++)
  {
      let storeKey = localStorage.key(i);
      webList.append(`<div class="inputBox" id="row-${i}">${storeKey} 
      <span class="material-icons-round">more_horiz</span></div>`);
      $(`#row-${i}`).on("click", () => SelectWeb(storeKey));
  } 
}


function SelectWeb(key)
{
  let webList = $("#dashboard-list");
  webList.empty();

  $("#page-title-label").text(key);
  $("#page-title").show();
  $("#url-box").hide();

  let accounts = GetAccounts(key);
  for(var id in accounts)
  {
    let row = `<div class="inputBox" remove-${id}>${id}<span class="material-icons-round" button-remove-${id}>delete</span></div>`;

    webList.append(row);
    let t = id;
    $(`[button-remove-${id}]`).click(() => { RemoveUser(key, t); });
  }

  // $(".sub-header").append(`<div class="inputBox" web=${key}>${key}<span class="material-icons-round" >
  // reply</span></div>`);
}

function RemoveUser(webUrl, id)
{
  let accounts = GetAccounts(webUrl);
  delete accounts[id];
  SetAccounts(webUrl, accounts);
  $(`[remove-${id}]`).remove();
}





function OnDashBoardLoaded()
{
  PopulateWebList();
  $(".empty-url").click(() => SelectUrl(''));
  $("#url-input").focus(FocusUrlInput);
  $("#url-input").blur(BlurUrlInput);
  $("#url-input").on('input', updateUrlInput);
  $("#page-title-btn").click(PopulateWebList);
  console.log("DASHBOARD LOADED");
}




