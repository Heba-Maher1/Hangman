const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector('.letters');

lettersArray.forEach((letter) => {
    let span = document.createElement("span");
    let spanText = document.createTextNode(letter);
    span.appendChild(spanText);
    span.className = "letter-box";
    lettersContainer.appendChild(span);
});

// Objects of words + categories

const words = {
    programming :["php" , "javascript" , "go" , "scala" , "fortran" , "r" , "mysql" , "python"],
    movies :["Prestige" , "Inception" , "Parasite" , "Interstellar" , "Whiplash" , "Memento" , "Coco" , "Up"],
    people: ["Albert Einstein" , "Hitchock" , "Alexandar" , "Cleopatra" , "Mahatma Ghandi"],
    countries:["Syria" , "Palestine" , "Yeman" , "Egypt" , "Bahrain" , "Qatar"],
}

// Get Random Property
let allKeys = Object.keys(words);

// Random Number Deoend On Keys Lenght
let randomPropNumber = Math.floor(Math.random() * allKeys.length); //0 1 2 3 

// Category
let randomPropName =allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Categoty Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let letterGuess = document.querySelector(".letters-guess");

// Convert Choosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Span Depend On Word
lettersAndSpace.forEach(e => {
    // Create Empty Span
    let letterSpan = document.createElement("span");
    
    // If Letter Is Space
    if(e === ' '){
        // Add Class To The Span
        letterSpan.className = 'with-space';
       
    }

    // Append Span To The Letters Guess Container
    letterGuess.appendChild(letterSpan);
})


// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

let gameAttempts = 0;

// Select Hangman
let theDrow = document.querySelector(".hangman-drow")

// Handle Clicking On Letters
document.addEventListener("click" , (e)=> {

    
// Set The Choose State

let theStatus = false;


    if(e.target.className === 'letter-box'){
        e.target.classList.add("clicked"); 

        // Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // The Choosen Word
        let theChoosenWord = Array.from(randomValueValue.toLowerCase());
       
        theChoosenWord.forEach((wordLetter , wordIndex) => {


            // If The Clicked Letter Equal To One Of The Choosen Word Letter
            if(theClickedLetter == wordLetter){

                // Set The Status To Correct
                theStatus = true;

                // Loop On All Guess Spans
                guessSpans.forEach((span , spanIndex) => {

                    if(wordIndex === spanIndex){

                        span.innerHTML = theClickedLetter;
                    }
                })  
            }
        });


        // Outside Loop
        // console.log(theStatus);

        // If Letter Is Wrong
        if(theStatus !== true){

            // Increase The Wrong Attempts
            wrongAttempts++;

            theDrow.classList.add(`Wrong-${wrongAttempts}`);

            // play Failed Sound
            document.getElementById("fail").play();
            
            if(wrongAttempts === 8) {
                endGame();
                lettersContainer.classList.add("finished")

            }
        
        }if(theStatus === true){
            gameAttempts++;

            document.getElementById("success").play();

            if(gameAttempts === theChoosenWord.join('').length){
                success();
            }
        }
    }
})

// End Game Function

function endGame(){
    document.body.style.opacity = .6 ;

    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(`Game Over , The Word Is ${randomValueValue}`);

    // Append Text To The Div
    div.appendChild(divText);

    // Add Class On Div
    div.className = 'popup';

    // Append The Div To The Body
    document.body.appendChild(div); 
}

function success(){
    document.body.style.opacity = .6 ;

    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(`Congratulation`);

    divText.className = 'heading';

    // Append Text To The Div
    div.appendChild(divText);

    // Add Class On Div
    div.className = 'popup';

    // Create Next Button
    let nextButton = document.createElement("button");

    // Add Class To The Button
    nextButton.className = 'nextButton';

    // Create Text On The Button
    let buttonText = document.createTextNode("Next");
    buttonText.className = 'buttonValue';

    // Append The Text To The Button
    nextButton.appendChild(buttonText);

    // Append The Button To The Popup Div
    div.appendChild(nextButton);

    // Append The Div To The Body
    document.body.appendChild(div); 

    nextButton.addEventListener('click' , ()=>{
        div.style.display = 'none';
        document.body.style.opacity = 1;
        let box = document.querySelectorAll(".letter-box");
        box.forEach(e => {
            e.classList.remove("clicked");
        })
        // theDrow.classList.remove(`Wrong-${wrongAttempts}`);
        // guessSpans.forEach(span => {
        //     span.innerHTML = "";        
        //     })  
        
        
    })

}