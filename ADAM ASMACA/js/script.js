document.addEventListener("DOMContentLoaded", () => {
    // Rastgele kelimeler
    const words = ["MERHABA", "ELMA", "BİLGİSAYAR", "KİTAP", "TELEFON", "ARABA", "OKUL", "KALEM", "DEFTER", "MASA"];
    let word = "";
    const maxGuesses = 6;

    // Oyun durumu
    let guessedWord = [];
    let remainingGuesses = maxGuesses;
    let guessedLetters = [];
    let wrongLetters = [];
    let timerInterval;
    let elapsedTime = 0;

    // HTML elementlerini seçme
    const startButton = document.getElementById("start-game");
    const newGameButton = document.getElementById("new-game");
    const gameContainer = document.getElementById("game-container");
    const wordDisplay = document.getElementById("word-display");
    const wordLengthDisplay = document.getElementById("word-length");
    const remainingGuessesDisplay = document.getElementById("remaining-guesses");
    const letterButtons = document.querySelectorAll("#letter-buttons button");
    const timerDisplay = document.getElementById("timer");
    const wrongLettersDisplay = document.getElementById("wrong-letters");

    // Oyunu başlatma
    startButton.addEventListener("click", startGame);
    newGameButton.addEventListener("click", startGame);

    function startGame() {
        // Yeni bir kelime seç
        word = words[Math.floor(Math.random() * words.length)].toUpperCase();
        guessedWord = Array(word.length).fill("_");
        remainingGuesses = maxGuesses;
        guessedLetters = [];
        wrongLetters = [];
        elapsedTime = 0;

        // Ekranı sıfırla
        updateWordDisplay();
        updateWordLength();
        updateRemainingGuesses();
        updateWrongLetters();
        updateTimer();

        // Butonları etkinleştir
        letterButtons.forEach(button => {
            button.disabled = false;
        });

        // Oyun alanını göster
        gameContainer.style.display = "block";
        startButton.style.display = "none";
        newGameButton.style.display = "none";

        // Yanlış harfler alanını görünür yap
        wrongLettersDisplay.style.display = "block";

        // Zamanlayıcıyı başlat
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            elapsedTime++;
            updateTimer();
        }, 1000);
    }

    // Kelime durumunu güncelleme
    function updateWordDisplay() {
        wordDisplay.textContent = guessedWord.join(" ");
    }

    // Kelime uzunluğunu güncelleme
    function updateWordLength() {
        wordLengthDisplay.textContent = `Kelime ${word.length} harften oluşuyor.`;
    }

    // Kalan tahmin hakkını güncelleme
    function updateRemainingGuesses() {
        remainingGuessesDisplay.textContent = `Kalan Tahmin Hakkı: ${remainingGuesses}`;
    }

    // Yanlış tahmin edilen harfleri güncelleme
    function updateWrongLetters() {
        wrongLettersDisplay.textContent = `Yanlış Harfler: ${wrongLetters.join(", ")}`;
    }

    // Zamanlayıcıyı güncelleme
    function updateTimer() {
        timerDisplay.textContent = `Süre: ${elapsedTime} saniye`;
    }

    // Oyunu kontrol etme
    function checkGameStatus() {
        if (guessedWord.join("") === word) {
            alert(`Tebrikler! Kelimeyi doğru tahmin ettiniz! 🎉 Süre: ${elapsedTime} saniye`);
            endGame();
        } else if (remainingGuesses === 0) {
            alert(`Sağlık olsun! Kaybettiniz. Doğru kelime: ${word}`);
            endGame();
        }
    }

    // Oyunu bitirme
    function endGame() {
        disableAllButtons();
        clearInterval(timerInterval);
        newGameButton.style.display = "block";
    }

    // Tüm butonları devre dışı bırakma
    function disableAllButtons() {
        letterButtons.forEach(button => {
            button.disabled = true;
        });
    }

    // Harf tahmini yapma
    function handleGuess(letter) {
        if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
            alert("Bu harfi zaten tahmin ettiniz!");
            return;
        }

        if (word.includes(letter)) {
            guessedLetters.push(letter);
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    guessedWord[i] = letter;
                }
            }
        } else {
            wrongLetters.push(letter);
            remainingGuesses--;
        }

        updateWordDisplay();
        updateRemainingGuesses();
        updateWrongLetters();
        checkGameStatus();
    }

    // Butonlara tıklama olayını bağlama
    letterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const letter = button.textContent;
            button.disabled = true;
            handleGuess(letter);
        });
    });
});