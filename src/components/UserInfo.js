export default class UserInfo {
    constructor(titleSelector, descriptionSelector, avatarSelector) {
      this._titleElement = document.querySelector(titleSelector);
      this._descriptionElement = document.querySelector(descriptionSelector);
      this._avatarElement = document.querySelector(avatarSelector);
    }
  
    getUserInfo() {
      const userInfo = {
        name: this._titleElement.textContent,
        description: this._descriptionElement.textContent,
      };
      return userInfo;
    }
  
    setUserInfo(name, description) {
      this._titleElement.textContent = name;
      this._descriptionElement.textContent = description;
    }

    setAvatar(avatar) {
      this._avatarElement.src = avatar;
    }

  }
