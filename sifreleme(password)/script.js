// @osmanmuratgull

document.addEventListener("DOMContentLoaded", function () {
    var encryptText = document.getElementById("encrypt-text");
    var encryptButton = document.getElementById("encrypt-button");
    var encryptionAlgorithm = document.getElementById("encryption-algorithm");
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");

    var decryptText = document.getElementById("decrypt-text");
    var decryptButton = document.getElementById("decrypt-button");
    var decryptionAlgorithm = document.getElementById("decryption-algorithm");
    var decryptUsername = document.getElementById("decrypt-username");
    var decryptPassword = document.getElementById("decrypt-password");

    var outputDiv = document.getElementById("output");
    var recordList = document.getElementById("record-list");
    var showRecordsButton = document.getElementById("show-records-button");

    var validUsername = "kullanıcı"; // Gerçek kullanıcı adınızı buraya yazın
    var validPassword = "123"; // Gerçek şifrenizi buraya yazın

    encryptButton.addEventListener("click", function () {
        var text = encryptText.value;
        var algorithm = encryptionAlgorithm.value;
        var username = usernameInput.value;
        var password = passwordInput.value;

        if (isValidInput(text) && isValidCredentials(username, password)) {
            let encrypted = "";

            switch (algorithm) {
                case "AES":
                    encrypted = CryptoJS.AES.encrypt(text, "your-secret-key").toString();
                    break;
                case "DES":
                    encrypted = CryptoJS.DES.encrypt(text, "your-secret-key").toString();
                    break;
                case "TripleDES":
                    encrypted = CryptoJS.TripleDES.encrypt(text, "your-secret-key").toString();
                    break;
                case "Rabbit":
                    encrypted = CryptoJS.Rabbit.encrypt(text, "your-secret-key").toString();
                    break;
                default:
                    break;
            }

            outputDiv.innerText = `Şifrelenmiş Metin (${algorithm}): ${encrypted}`;
        } else {
            outputDiv.innerText = "Lütfen geçerli bir metin, doğru kullanıcı adı/şifre girin.";
        }
    });

    decryptButton.addEventListener("click", function () {
        var encryptedText = decryptText.value;
        var algorithm = decryptionAlgorithm.value;
        var username = decryptUsername.value;
        var password = decryptPassword.value;

        if (isValidInput(encryptedText) && isValidCredentials(username, password)) {
            let decrypted = "";

            switch (algorithm) {
                case "AES":
                    decrypted = CryptoJS.AES.decrypt(encryptedText, "your-secret-key").toString(CryptoJS.enc.Utf8);
                    break;
                case "DES":
                    decrypted = CryptoJS.DES.decrypt(encryptedText, "your-secret-key").toString(CryptoJS.enc.Utf8);
                    break;
                case "TripleDES":
                    decrypted = CryptoJS.TripleDES.decrypt(encryptedText, "your-secret-key").toString(CryptoJS.enc.Utf8);
                    break;
                case "Rabbit":
                    decrypted = CryptoJS.Rabbit.decrypt(encryptedText, "your-secret-key").toString(CryptoJS.enc.Utf8);
                    break;
                default:
                    break;
            }

            outputDiv.innerText = `Deşifrelenmiş Metin (${algorithm}): ${decrypted}`;
        } else {
            outputDiv.innerText = "Lütfen geçerli bir şifreli metin, doğru kullanıcı adı/şifre girin.";
        }
    });

    showRecordsButton.addEventListener("click", function () {
        recordList.innerHTML = ""; // Önceki içeriği temizle

        let encryptedData = localStorage.getItem("encryptedData");
        if (encryptedData) {
            encryptedData = JSON.parse(encryptedData);

            encryptedData.forEach(function (encryptedText, index) {
                var recordItem = document.createElement("div");
                recordItem.className = "record-item";
                recordItem.innerHTML = `<strong>Kayıt ${index + 1}:</strong> ${encryptedText}`;
                recordList.appendChild(recordItem);
            });
        } else {
            recordList.innerText = "Henüz kayıt yok.";
        }
    });

    function isValidInput(input) {
        return input.trim() !== "";
    }

    function isValidCredentials(username, password) {
        return username === validUsername && password === validPassword;
    }
});
