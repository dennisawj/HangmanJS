
document.addEventListener("DOMContentLoaded", () => {
    const keyboardContainer = document.querySelector('.keyboard');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const hintbox = document.querySelector('.hints');
    const display = document.querySelector('.WordDisplay');
    const title = document.querySelector('.game-title')
    const chances = document.querySelector(".chances");
    const gametitleButton = document.querySelector('.title');
    var { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    var correctlist = [];
    const hangmanimg = document.querySelector('.game-image img')
    var chance = 6;
    var guessedlist = []; //letters are that guessed
    var hidelist = []; //number of letters in the correct words * " _ "
    var count = 0; //total number of wrongs + 1 
    // Add event listener to the reset button
    resetbutton = document.querySelector(".reset-button")
    resetbutton.addEventListener('click', resetGame);


    //start game
    title.style.visibility = 'visible';
    gametitleButton.addEventListener('click', function () {
        title.style.visibility = 'hidden';
        hintbox.innerText = hint;
        correctlist = word.split(''); // letters of the word split into each individual letters
        console.log(correctlist);

        for (var i = 0; i < word.length; i++) {
            hidelist.push(" _ ");
        };
        display.innerText = hidelist.join("");
        chances.innerText = "Chances left: " + chance;
        hangmanimg.src = "/images/hangman-0.svg";
        // Hide Reset Button
        resetbutton.style.visibility = "hidden"

    });

    //Creating Keyboard
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.innerText = letter;
        button.classList.add('key');
        keyboardContainer.appendChild(button);

        button.addEventListener('click', function () {
            let correct = false;
            guessedlist.push(letter); // Add the clicked letter to the guessedlist array
            button.disabled = true;
            for (var x = 0; x < correctlist.length; x++) {
                if (letter == correctlist[x].toUpperCase()
                ) {
                    hidelist[x] = letter.toUpperCase();
                    correct = true
                }
            }
            display.innerText = hidelist.join("");
            if (correct == false) {
                chance = chance - 1;
                chances.innerText = "Chances left: " + chance;
                count++;
                if (count < 7) {
                    hangmanimg.src = "/images/hangman-" + count + ".svg";
                }
                else {
                    hangmanimg.src = "images/lost.gif";
                    chances.innerText = "Chances left: 0"
                    document.querySelectorAll('.key').forEach(button => {
                        button.disabled = true;
                    });
                    resetbutton.style.visibility = "visible"
                }
            }
            for (var x = 0; x < correctlist.length; x++) {
                if (hidelist.join("") == word.toUpperCase()) {
                    hangmanimg.src = "images/victory.gif";
                    document.querySelectorAll('.key').forEach(button => {
                        button.disabled = true;
                    });
                    resetbutton.style.visibility = "visible"

                }
            }
        });
    });
    function resetGame() {
        // Reset all game-related variables to their initial state
        chance = 6;
        guessedlist = [];
        hidelist = [];
        count = 0;

        // Clear the display
        display.innerText = "";

        // Reset the hangman image to the initial state
        hangmanimg.src = "/images/hangman-0.svg";

        // Enable all keyboard buttons
        document.querySelectorAll('.key').forEach(button => {
            button.disabled = false;
        });

        // Reset the chances display
        chances.innerText = "Chances left: " + chance;

        // Reset the hint
        hintbox.innerText = hint;

        // Reinitialize the game title visibility
        title.style.visibility = 'visible';

        // Hide Reset Button
        resetbutton.style.visibility = "hidden"


        //reset word
        const randomIndex = Math.floor(Math.random() * wordList.length);
        word = wordList[randomIndex].word;
        hint = wordList[randomIndex].hint;

    }



});

