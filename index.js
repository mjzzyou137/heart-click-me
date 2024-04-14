window.onload = function () {
    var context = new AudioContext();
}


const domId = (id) => document.getElementById(id);

const typeCharacter = ({ textToInput, tag, timeout = 110, index = 0 }) => {
    if (index < textToInput.length) {
        // Get the current character
        var char = textToInput[index];

        // Create a new keydown event for the character
        var keyDownEvent = new KeyboardEvent("keydown", {
            key: char,
            keyCode: char.charCodeAt(0),
            which: char.charCodeAt(0),
            bubbles: true,
            cancelable: true,
        });

        // Dispatch the keydown event on the contenteditable div
        tag.dispatchEvent(keyDownEvent);

        // Set the character in the contenteditable div
        tag.innerHTML += char;

        // Call the function recursively for the next character
        setTimeout(() => {
            typeCharacter({ textToInput, tag, timeout, index: index + 1 });
        }, timeout); // You can adjust the delay (in milliseconds) between each character here
    }
}



document.addEventListener("DOMContentLoaded", function (event) {
    var audio = document.getElementById("myAudio");
    audio.play();
});


// function play() {
//     var audio = new Audio('./file_example_MP3_700KB.mp3');
//     audio.play();
// }

// setTimeout(async () => {
//     domId('ss').onclick()
// }, 3000)

domId('wrapper').onclick = () => {

    domId('wrapper').style.display = 'none'

    var audio = new Audio('./audio.mp3');
    audio.play();

    

    setTimeout(() => {
        domId('heartLayer').style.opacity = 1;
        typeCharacter({
            textToInput: 'My baby love you so much forever you and I, I love you oh! I love you so much forever you and I.',
            tag: domId("text"),
        });
    }, 200)

}

let queryData = getSearchData()

let animateHeartCanvas = new AnimateHeartCanvas(
    Number(queryData.hMin),
    Number(queryData.hMax),
    Number(queryData.countHeart),
    Number(queryData.sizeMin),
    Number(queryData.sizeMax),
    queryData.bgColor,
)

domId('heartLayer').style.opacity = 0;


function getSearchData() {
    let searchString = location.search;
    if (searchString) {
        let obj = {};
        searchString = searchString.substring(1, searchString.length);
        let tempArray = searchString.split('&');
        tempArray.forEach(item => {
            obj[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
        });
        return obj;
    } else {
        return false;
    }
}