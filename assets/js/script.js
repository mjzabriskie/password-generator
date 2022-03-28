// Assignment code here
var generatePassword = function () {
  var nbrChar = null;
  while (nbrChar < 8 || nbrChar > 128 || isNaN(nbrChar)) { //checks if nbrChar is a number from 8 to 128
    nbrChar = parseInt(prompt("Number of characters for the generated password (min 8, max 128)", "8"));
  }
  var lowerCase = false;
  var upperCase = false;
  var numeric = false;
  var special = false;

  while (!lowerCase && !upperCase && !numeric && !special) { //Storing which character sets the user wishes to use.
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
  var specialSet = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"';
  var combinedSet = "";

  switch (lowerCase) {//combines the selected character sets into one string
    case true:
      combinedSet += lowerCaseSet;
      break;
    default:
      break;
  }

  switch (upperCase) {
    case true:
      combinedSet += upperCaseSet;
      break;
    default:
      break;
  }

  switch (numeric) {
    case true:
      combinedSet += numericSet;
      break;
    default:
      break;
  }

  switch (special) {
    case true:
      combinedSet += specialSet;
      break;
    default:
      break;
  }

  //loops for number of characters user entered,
  //uses Math.random() to select random character from combinedSet.
  for (var i = 0; i < nbrChar; i++) {
    var fullPassword;
    var charSelect = Math.floor(Math.random() * combinedSet.length) + 1;
    var charItem = combinedSet.charAt(charSelect - 1);

    if (!fullPassword) {//Added to avoid "undefined" being printed in addition to generated password.
      fullPassword = charItem;
    } else {
      fullPassword += charItem;
    }
  }
  return fullPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
