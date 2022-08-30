const vigenereCipher = (function () {
   const _alphabet = "abcdefghijklmnopqrstuvwxyz";

   // Generate vigenere table
   const _vigenereTable = {};
   let shift = 0;

   for (let i = 0; i < _alphabet.length; i++) {
      let shiftedAlphabet = _alphabet.slice(shift) + _alphabet.slice(0, shift);

      _vigenereTable[_alphabet[i]] = {};
      for (let j = 0; j < _alphabet.length; j++) {
         _vigenereTable[_alphabet[i]][_alphabet[j]] = shiftedAlphabet[j];
      }
      shift++;
   }

   const encrypt = (message, key) => {
      let result = "";
      let rowIndex = 0;
      let colIndex = 0;

      for (; colIndex < message.length; colIndex++) {
         // if the current message character is not a letter,
         // add it to result add jump to next iteration.
         if (message[colIndex].match(/[\d\W_]/i)) {
            result = result + message[colIndex];
            continue;
         }

         let character =
            _vigenereTable[key[rowIndex].toLowerCase()][
               message[colIndex].toLowerCase()
            ];

         if (
            message[colIndex].codePointAt() >= 65 &&
            message[colIndex].codePointAt() <= 90
         ) {
            character = character.toUpperCase();
         }

         result = result + character;
         rowIndex++;
         if (rowIndex >= key.length) rowIndex = 0;
      }

      return result;
   };

   const decrypt = function (encryptedMessage, key) {
      let result = "";
      let rowIndex = 0;
      let colIndex = 0;

      key = key.toLowerCase();

      for (; colIndex < encryptedMessage.length; colIndex++) {
         let rowObj = _vigenereTable[key[rowIndex]];

         for (let prop in rowObj) {
            // if the current character of encryptedMessage is not a letter,
            // add it to result add jump to next iteration.
            if (encryptedMessage[colIndex].toLowerCase().match(/[\d\W_]/i)) {
               result = result + encryptedMessage[colIndex];
               break;
            }

            if (rowObj[prop] === encryptedMessage[colIndex].toLowerCase()) {
               let letter = prop;

               if (
                  encryptedMessage[colIndex].codePointAt() >= 65 &&
                  encryptedMessage[colIndex].codePointAt() <= 90
               ) {
                  letter = letter.toUpperCase();
               }

               result = result + letter;
               rowIndex++;
               if (rowIndex >= key.length) rowIndex = 0;
            }
         }
      }

      return result;
   };

   return {
      encrypt,
      decrypt,
   };
})();

module.exports = vigenereCipher;
