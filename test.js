'use strict';

// This class is used for logins
class Login {
  constructor(hash) {
    /*** NEW CODE ***/
    // better manage your passwords in one place and use push for add new object to array.
    this.sessions = [];
    this.users = [];
    Object.keys(hash).map(k => ({k, v: hash[k]})).map(e => {
      this.users.push({user: e.k, password: e.v})
    });

    /*** OLD CODE ***/
    /*
    this.sessions = [];
    this.users = [];
    this.passwords = [];
    Object.keys(hash).map(k => ({k, v: hash[k]})).map(e => {
      this.users = this.users.concat([e.k]);
      this.passwords = this.passwords.concat([e.v]);
    });
    */
  }

  logout(user) {
    /*** NEW CODE ***/
    // forEach is a 95% more slower than for, and use break for stop itinerance when find success
    for (let i = 0; i < this.sessions.length; i++) {
      if (this.sessions[i] === user){
        this.sessions.splice(i,1);
        break;
      }
    }
    /*** OLD CODE ***/
    /*
    this.sessions.forEach((session, i) => {
      if (session === user) {
        this.sessions[i] = null;
      }
    });
    this.sessions = this.sessions.filter(session => session !== null);
    */
  }

  // Checks if user exists
  userExists(user) {
    // Temp variable for storing the user if found

    /*** NEW CODE ***/
    // small change to adapt to new object this.users and add break when find success
    let temp = '';
    for (let i of this.users) {
      if (i.user === user) {
        temp = user;
        break;
      }
    }
    let exists = (temp !== '' && temp === user);
    return exists;

    /*** OLD CODE ***/
    /*
    let temp = '';
    for (let i of this.users) {
      if (i === user) {
        temp = user;
      }
    }
    let exists = (temp !== '' && temp === user);
    return exists;
    */
  }

  // Register user
  registerUser(user, password) {
    /*** NEW CODE ***/
    // Use the function userExist is necessary for no register a user twice
    // Only need push a new object with the new user.
    if(!this.userExists(user)){
      this.users.push({user: user, password: password})
      console.log("user does not exist")
    }else{
      console.log("user exist")
    }
    /*** OLD CODE ***/
    //let lastIndex = this.users.length;
    //this.users[lastIndex] = user;
    //this.passwords[lastIndex] = password;
  }

  removeUser(user) {
    
    /*** NEW CODE ***/
    // Only need find index and splice of array if is != -1
    let index = this.idx(user, this.users);
    if(index != -1){
      this.users.splice(index, 1)
    }

    /*** OLD CODE ***/
    /*
    let index = this.idx(user, this.users);
    this.users[index] = null;
    this.passwords[index] = null;
    this.users = this.users.filter(user => user !== null);
    this.passwords = this.passwords.filter(password => password !== null);
    */
  }

  checkPassword(user, password) {
    let index = this.idx(user, this.users);
    let passwordCorrect = this.users[index].password === password;
    return passwordCorrect;
  }

  updatePassword(user, oldPassword, newPassword) {
    // First we check if the user exists

    /*** NEW CODE ***/
    // Only need check if user exist with userExist, then use function checkPassword
    // then only update the password for this index.
    if (this.userExists(user)) {
      let index = this.idx(user, this.users);
      if (this.checkPassword(user,oldPassword)) {
        this.users[index].password = newPassword;
        return true;
      }
    }
    return false;

    /*** OLD CODE ***/

    /*
    let user1 = '';
    for (let i of this.users) {
      if (i === user) {
        user1 = user;
      }
    }
    if (user1 === user) {
      let index = this.idx(user, this.users);
      if (this.passwords[index] === oldPassword) {
        this.passwords[index] = newPassword;
        return true;
      }
    }
    return false;
    */
  }

  login(user, password) {
    
    /*** NEW CODE ***/
    //  check password only if is necessary and use the function checkPassword
    let index = this.idx(user, this.users);
    if(index != -1){
      if (this.checkPassword(user, password)) {
        this.sessions.push(user);
      }  
    }
    /*** OLD CODE ***/
    /*
    let index = this.idx(user, this.users);
    if (this.passwords[index] === password) {
      this.sessions.push(user);
    }
    */
  }

  // Gets index of an element in an array
  idx(element, array) {
    /*** NEW CODE ***/
    // "for" work better in arrays, and add break when find is success
    let index = -1;
    for(let i = 0; i < array.length; i++) {
      if (array[i].user === element) {
          index = i;
          break;
      }
    }
    return index;
    /*** OLD CODE ***/
    /*
    let cont=0;
    for (let i of array) {
      if (i === element) {
        return cont;
      }
      cont += 1;
    }
    return cont;
    */
  }

}

let registeredUsers = {
  user1: 'pass1',
  user2: 'pass2',
  user3: 'pass3'
};

let login = new Login(registeredUsers);

login.registerUser('user4', 'pass4');
login.login('user4', 'pass4');
login.updatePassword('user3', 'pass3', 'pass5');
login.login('user3', 'pass5');
login.login('user5', 'pass5');
login.logout('user4');
login.logout('user3');
