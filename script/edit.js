

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
        currInput = GetCurrInput(id);

    var input = $('<input />', {
        'type': 'text',
        'id': `new-${id}`,
        'value': currInput,
        'style': 'width: 250px; margin: 10px; text-align: center;',
        'class': 'CL-input-field',
        'spellcheck': 'false',
        'original-text': currInput
    });

    $(`#${id}`).replaceWith(input);
    return true;
}

function SaveNewUrl()
{
    $("#page-key-btn").show();
    $("#page-save-btn").hide();
    $("#go-back-btn").text("arrow_back");

    let id = "page-title-label",
        newInput = GetNewInput(id);
        currInput = $(`#new-${id}`).attr('original-text');
        accounts = GetAccounts(currInput);

    var label = $(`<label id="${id}" class="${id}">` + newInput + `</label>`);

    $(`#new-${id}`).replaceWith(label);

    if(newInput == currInput) { return PopulateWebList(); }
    localStorage.setItem(newInput, JSON.stringify(accounts));
    RemoveWeb(currInput);
}

function CheckEditMode()
{
  if (!EditUrl()) { PopulateWebList(); }
  SaveNewUrl();
}

