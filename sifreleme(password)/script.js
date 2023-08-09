document.addEventListener("DOMContentLoaded", function () {
    const encryptText = document.getElementById("encrypt-text");
    const encryptButton = document.getElementById("encrypt-button");
    const encryptionAlgorithm = document.getElementById("encryption-algorithm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const decryptText = document.getElementById("decrypt-text");
    const decryptButton = document.getElementById("decrypt-button");
    const decryptionAlgorithm = document.getElementById("decryption-algorithm");
    const decryptUsername = document.getElementById("decrypt-username");
    const decryptPassword = document.getElementById("decrypt-password");

    const outputDiv = document.getElementById("output");
    const recordList = document.getElementById("record-list");
    const showRecordsButton = document.getElementById("show-records-button");

    const validUsername = "kullanıcı"; // Gerçek kullanıcı adınızı buraya yazın
    const validPassword = "123"; // Gerçek şifrenizi buraya yazın

    encryptButton.addEventListener("click", function () {
        const text = encryptText.value;
        const algorithm = encryptionAlgorithm.value;
        const username = usernameInput.value;
        const password = passwordInput.value;

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
        const encryptedText = decryptText.value;
        const algorithm = decryptionAlgorithm.value;
        const username = decryptUsername.value;
        const password = decryptPassword.value;

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
                const recordItem = document.createElement("div");
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