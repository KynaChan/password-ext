// common scripts
DEVELOPMENT = true


function AESEncrypt(message = '', key = ''){
  var message = CryptoJS.AES.encrypt(message, key);
  return message.toString();
}

function AESDecrypt(message = '', key = ''){
  var code = CryptoJS.AES.decrypt(message, key);
  var decryptedMessage = code.toString(CryptoJS.enc.Utf8);

  return decryptedMessage;
}

function log(text) {
  if(!DEVELOPMENT) {
    return;
  }

  console.log(`[Log]: ${text}`);
}

function GetElementById(id) {
  return document.getElementById(id);
}

function GetElementByClass(className) {
  return document.getElementsByClassName(className);
}

function RemoveElement(element) {
  if(!element) {
    log(`Couldn't remove an element, element: ${element};`);
    return false;
  }

  element.remove();
  return true;
}

function DeleteElementByID(id) {
  let targetElement = GetElementById(id);
  return RemoveElement(targetElement);
}

function DeleteElementsByClass(className) {
  let targetElements = GetElementByClass(className);
  targetElements.map((element) => RemoveElement(element));
}

function DeleteElementAttribute(element, attrName) {
  if(!element) {
    log(`Couldn't delete attribute ${attrName}, element ${element};`);
    return false;
  }

  element.removeAttribute(attrName);
  return true;
}

function AppendChild(element, htmlText, position = "afterend") {
  if(!element) {
    log(`Couldn't append child ${htmlText}, parent element ${element};`);
    return;
  }

  element.insertAdjacentHTML(position, htmlText);
}

function HideByID(id) {
  let targetElement = GetElementById(id);
  targetElement.style.display = "none";
}

function ShowByID(id) {
  let targetElement = GetElementById(id);
  targetElement.style.display = "block";
}

