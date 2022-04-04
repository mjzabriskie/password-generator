// Assignment code here
var generatePassword = function () {
  var nbrChar = null;
  while (nbrChar < 8 || nbrChar > 128 || isNaN(nbrChar)) {
    //checks if nbrChar is a number from 8 to 128
    nbrChar = parseInt(
      prompt(
        "Number of characters for the generated password (min 8, max 128)",
        "8"
      )
    );
  }
  var lowerCase = false;
  var upperCase = false;
  var numeric = false;
  var special = false;

  while (!lowerCase && !upperCase && !numeric && !special) {
    //Storing which character sets the user wishes to use.
    lowerCase = window.confirm('Select "OK" to include lower-case letters.');
    upperCase = window.confirm('Select "OK" to include upper-case letters.');
    numeric = window.confirm('Select "OK" to include numbers.');
    special = window.confirm('Select "OK" to include special characters.');
    if (!lowerCase && !upperCase && !numeric && !special) {
      window.alert("You must select at least one character type.");
    }
  }

  var lowerCaseSet = "abcdefghijklmnopqrstuvwxyz";
  var upperCaseSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numericSet = "1234567890";
  var specialSet = " !#$%&'()*+,-./:;<=>?@[]^_`{|}~" + '"';
  var combinedSet = "";

  if (lowerCase) {
    //combines the selected character sets into one string
    combinedSet += lowerCaseSet;
  }

  if (upperCase) {
    combinedSet += upperCaseSet;
  }

  if (numeric) {
    combinedSet += numericSet;
  }

  if (special) {
    combinedSet += specialSet;
  }

  //loops for number of characters user entered,
  //uses Math.random() to select random character from combinedSet.
  var fullPassword = "";

  var setPassword = function () {
    if (fullPassword) {
      fullPassword = "";
    }

    for (var i = 0; i < nbrChar; i++) {
      var charSelect = Math.floor(Math.random() * combinedSet.length);
      var charItem = combinedSet.charAt(charSelect);

      fullPassword += charItem;
    }
    if (lowerCase) {//if lowerCaseSet was selected, checks that password contains at least one char from the set.
      var lowerArray = lowerCaseSet.split("");

      for (i = 0; i < lowerArray.length; i++) {
        var atLeastOne = fullPassword.match(lowerArray[i]);

        if (atLeastOne) {
          break;
        }
      }
      if (!atLeastOne) {
        setPassword();
      }
    }
    if (upperCase) {//if upperCaseSet was selected, checks that password contains at least one char from the set.
      var upperArray = upperCaseSet.split("");

      for (i = 0; i < upperArray.length; i++) {
        var atLeastOne = fullPassword.match(upperArray[i]);

        if (atLeastOne) {
          break;
        }
      }
      if (!atLeastOne) {
        setPassword();
      }
    }
    if (numeric) {
      //if numericSet was selected, checks that password contains at least one char from the set.
      var numericArray = numericSet.split("");

      for (i = 0; i < numericArray.length; i++) {
        var atLeastOne = fullPassword.match(numericArray[i]);

        if (atLeastOne) {
          break;
        }
      }
      if (!atLeastOne) {
        setPassword();
      }
    }
    if (special) {
      //if specialSet was selected, checks that password contains at least one char from the set.
      var specialArray = specialSet.split("");

      for (i = 0; i < specialArray.length; i++) {
        var atLeastOne = fullPassword.match(/[^\w\s]/); //Special characters gave me trouble, even in a string.
                                                        //Used this regex code to match anything that's not an alphanumeric.
        if (atLeastOne) {
          break;
        }
      }
      if (!atLeastOne) {
        setPassword();
      }
    }
    return fullPassword;
  };
  setPassword();
  return fullPassword;
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector("#copy");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function copyPassword() { //Added function to make password retrieval easier
  var getPassword = document.querySelector("#password");
  getPassword.select();
  getPassword.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(getPassword.value);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copyPassword);
