

class Page {

    constructor(appName)
    {
      this.appName = appName;
      this.accounts = {};
      this.InitAccountsStorage();
    }

    InitAccountsStorage() 
    {
      const accountsStr = localStorage.getItem(this.appName);
      if(!accountsStr) { return; }
      
      this.SetAccountsDict(JSON.parse(accountsStr));
    }

    SaveToStorage()
    {
      localStorage.setItem(this.appName, JSON.stringify(this.accounts));
    }
    
    GetAccountsDict()
    {
      return this.accounts;
    }
    GetPassword(userName)
    {
      return this.accounts[userName];
    }

    SetAccountsDict(accountsDict)
    {
      this.accounts = accountsDict;
    }

    SetAccount(userName, password, key)
    {
      this.accounts[userName] = encrypt(password); 
    }

    AccountExists(userName) 
    {
      return this.GetAccountPassword(userName) != undefined;
    }


    encrypt(message = '', key = ''){
      var message = CryptoJS.AES.encrypt(message, key);
      return message.toString();
    }
    
    decrypt(message = '', key = ''){
      var code = CryptoJS.AES.decrypt(message, key);
      var decryptedMessage = code.toString(CryptoJS.enc.Utf8);
    
      return decryptedMessage;
    }

}

