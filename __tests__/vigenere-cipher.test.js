let vigenereCipher = require("../src/vigenereCipher.js");

describe("vigenereCipher OBJECT", () => {
   it("vigenereCipher file exports an object", () => {
      expect(vigenereCipher).toBeDefined();
   });
});

describe("ENCRYPT METHOD", () => {
   test('Encrypt method returns "vrpzb" when message === "hello" and kye === "one"', () => {
      expect(vigenereCipher.encrypt("hello", "one")).toBe("vrpzb");
   });

   test("Encrypt method ignores non-letter characters", () => {
      expect(vigenereCipher.encrypt("hell o!", "one")).toBe("vrpz b!");
      expect(
         vigenereCipher.encrypt(
            '[]-+* ¨Ñ_:.,;=¿?!¡()&%$#|<>/\\~`^¬@°"0123',
            "key"
         )
      ).toBe('[]-+* ¨Ñ_:.,;=¿?!¡()&%$#|<>/\\~`^¬@°"0123');
   });

   test("Capital letters are preserved", () => {
      expect(
         vigenereCipher.encrypt(
            "The quick brown fox jumps over the lazy dog",
            "spongebob"
         )
      ).toBe("Lws damdy cjdka lsy xveeg bbis hiw aome hpu");
   });

   test("Key argument case doesn't matter", () => {
      expect(vigenereCipher.encrypt("Hello world!", "Key")).toBe(
         "Rijvs uyvjn!"
      );
      expect(vigenereCipher.encrypt("Hello world!", "kEy")).toBe(
         "Rijvs uyvjn!"
      );
      expect(vigenereCipher.encrypt("Hello world!", "keY")).toBe(
         "Rijvs uyvjn!"
      );
      expect(vigenereCipher.encrypt("Hello world!", "KEY")).toBe(
         "Rijvs uyvjn!"
      );
   });
});

describe("DECRYPT METHOD", () => {
   test("It can decrypt a simple string", () => {
      expect(vigenereCipher.decrypt("vrpzb", "one")).toBe("hello");
   });

   test("#1 Key argument case does not matter", () => {
      expect(vigenereCipher.decrypt("vrpzb", "One")).toBe("hello");
   });

   test("#2 Key argument case does not matter", () => {
      expect(vigenereCipher.decrypt("vrpzb", "oNe")).toBe("hello");
   });

   test("#3 Key argument case does not matter", () => {
      expect(vigenereCipher.decrypt("vrpzb", "onE")).toBe("hello");
   });

   test("Capital letters are preversed", () => {
      expect(vigenereCipher.decrypt("VRPZ B!", "one")).toBe("HELL O!");
   });

   test("It can decrypt a long string", () => {
      expect(
         vigenereCipher.decrypt(
            "Lws damdy cjdka lsy xveeg bbis hiw aome hpu",
            "spongebob"
         )
      ).toBe("The quick brown fox jumps over the lazy dog");
   });

   test("Non-letter characters are ignore", () => {
      expect(
         vigenereCipher.decrypt(".;#&% Rijvs,... Astfov! &%#;.", "key")
      ).toBe(".;#&% Hello,... Cipher! &%#;.");
   });
});
