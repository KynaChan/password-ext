

// update list value in dict
function UpdateObject(key, property, value)
{
  var user = JSON.parse(localStorage.getItem(key));
  user[property] = value;
  localStorage.setItem(key, JSON.stringify(user));
}

function GetCurrInput(id)
{
    return $(`#${id}`).text();
}

function GetNewInput(id)
{
    return $(`#new-${id}`).val();
}

function EditUrl()
{
    $("#page-key-btn").hide();
    $("#page-save-btn").show();
    $("#go-back-btn").text("");

    let id = "page-title-label",
        currInputVal = GetCurrInput(id);

    var input = $('<input />', {
        'type': 'text',
        'id': `new-${id}`,
        'value': currInputVal,
        'style': 'width: 280px; margin: 10px 0; text-align: center;',
        'class': 'CL-input-field',
        'spellcheck': 'false',
        'original-text': currInputVal
    });

    $(`#${id}`).replaceWith(input);
    return true;
}

function UpdateUrl()
{
    $("#page-key-btn").show();
    $("#page-save-btn").hide();
    $("#go-back-btn").text("arrow_back");

    let titleId = "page-title-label",
        newInputVal = GetNewInput(titleId),
        currInputVal = $(`#new-${titleId}`).attr('original-text'),
        accounts = GetAccounts(currInputVal);

    var label = $(`<label id="${titleId}" class="${titleId}">` + newInputVal + `</label>`);

    $(`#new-${titleId}`).replaceWith(label);

    if(newInputVal == currInputVal)
    { return PopulateWebList(); }

    localStorage.setItem(newInputVal, JSON.stringify(accounts));
    RemoveWeb(currInputVal);
}


function SaveAccountChanges(buttonIndex, webUrl, originalId)
{
    let userVal = $(`[account-field-${buttonIndex}]`).val();
    let pwdVal = $(`[pwd-field-${buttonIndex}]`).val();

    let page = new Page(webUrl);
    page.SetAccount(userVal, pwdVal);
    page.SaveToStorage();

    RemoveUsername(buttonIndex, webUrl, originalId);
}

function ResetAccountChanges(buttonIndex, userVal, decryptedPwd)
{
    $(`[account-field-${buttonIndex}]`).val(userVal);
    $(`[pwd-field-${buttonIndex}]`).val(decryptedPwd);
}

