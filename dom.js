'use strict';

window.addEventListener('DOMContentLoaded', () => {
   const encryptBtn = document.getElementById('encrypt-button');
   const decryptBtn = document.getElementById('decrypt-button');
   const encryptForm = document.getElementById('encrypt-form');
   const encryptFormKey = encryptForm.elements['encrypt-key'];
   const encryptFormMessage = encryptForm.elements['encrypt-message'];
   const encryptFormOutput = encryptForm.elements.output;
   const encryptErrorMsg = document.getElementById('encrypt-error-message');
   const decryptForm = document.getElementById('decrypt-form');
   const decryptFormKey = decryptForm.elements['decrypt-key'];
   const decryptFormMessage = decryptForm.elements['decrypt-message'];
   const decryptFormOutput = decryptForm.elements.output;
   const decryptErrorMsg = document.getElementById('decrypt-error-message');

   encryptFormKey.value = 'cookie';
   encryptFormMessage.value = 'Hello world!';
   encryptFormOutput.value = 'Jszvw aqfzn!';

   decryptFormKey.value = 'cookie';
   decryptFormMessage.value = 'Jszvw aqfzn!';
   decryptFormOutput.value = 'Hello world!';

   encryptBtn.addEventListener('click', toggleAccordion);
   decryptBtn.addEventListener('click', toggleAccordion);
   encryptForm.addEventListener('submit', encryptUserInput);
   decryptForm.addEventListener('submit', decryptUserInput);

   function toggleAccordion(e) {
      let target = e.target;

      if (target.nodeName === 'IMG') {
         target = target.parentElement;
      }

      let sibling = target.nextElementSibling;

      if (target.className.search(/accordion-button--on/) >= 0) {
         target.className = 'button accordion-button';
         sibling.className = 'accordion-content';
      } else {
         target.className = 'button accordion-button accordion-button--on';
         sibling.className = 'accordion-content accordion-content--open';
      }
   }

   function encryptUserInput(e) {
      let { valid, message } = validateInput(encryptFormKey.value, encryptFormMessage.value);

      e.preventDefault();
      encryptErrorMsg.textContent = '';

      if (!valid) {
         encryptErrorMsg.textContent = message;
         return;
      }

      encryptFormOutput.textContent = vigenereCipher.encrypt(
         encryptFormMessage.value.trim(),
         encryptFormKey.value.trim()
      );
   }

   function decryptUserInput(e) {
      let { valid, message } = validateInput(decryptFormKey.value, decryptFormMessage.value);

      e.preventDefault();
      decryptErrorMsg.textContent = '';

      if (!valid) {
         decryptErrorMsg.textContent = message;
         return;
      }

      decryptFormOutput.textContent = vigenereCipher.decrypt(
         decryptFormMessage.value.trim(),
         decryptFormKey.value.trim()
      );
   }

   function validateInput(key, message) {
      let result = {
         valid: null,
         message: null,
      };
      let trimedKey = key.trim();
      let trimedMessage = message.trim();

      if (trimedKey.length === 0 || trimedMessage.length === 0) {
         result.valid = false;
         result.message = 'Key and Message are required';
      } else if (trimedKey.match(/[\d\W_]/g)) {
         result.valid = false;
         result.message = 'Key field only accepts letters (whitespace, digits, and punctuation marks are not allowed)';
      } else {
         result.valid = true;
      }

      return result;
   }
});