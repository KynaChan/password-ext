

class PageTemplate {
  constructor(pageName)
  {
    this.pageName = pageName;
    this.accounts = {};
    this.InitAccountsStorage();
  }

  InitAccountsStorage() 
  {
    const accountsStr = localStorage.getItem(this.pageName);
    if(!accountsStr) {
      return;
    }
    
    this.SetAccountsDict(JSON.parse(accountsStr));
  }

  SaveToStorage()
  {
    localStorage.setItem(this.pageName, JSON.stringify(this.accounts));
  }

  GetAccountsDict()
  {
    return this.accounts;
  }

  SetAccountsDict(accountsDict)
  {
    this.accounts = accountsDict;
  }

  SetAccount(userName, password)
  {
    this.accounts[userName] = AESEncrypt(password);
  }

  GetAccountPassword(userName)
  {
    return this.accounts[userName];
  }

  AccountExists(userName) 
  {
    return this.GetAccountPassword(userName) != undefined;
  }


}




