

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
    { localStorage.setItem(this.appName, JSON.stringify(this.accounts)); }

    GetAccountsDict()
    { return this.accounts; }
    GetPassword(userName)
    { return this.accounts[userName]; }

    SetAccountsDict(accountsDict)
    { this.accounts = accountsDict; }

    SetAccount(userName, password)
    { this.accounts[userName] = encrypt(password); }

    AccountExists(userName) 
    { return this.GetAccountPassword(userName) != undefined; }


}

