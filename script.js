const 
    body = document.querySelector('body')
    file = document.getElementById('the-file'),
    searchWordForm = document.querySelector('.search-word'),
    searchInput = document.getElementById('search-input'),
    ahundredForm = document.querySelector('.ahundred-word');
    textAlert = document.querySelector('.alert'),
    langSelector = document.getElementById('lang-selector');

const title = document.querySelector('.book-name'),
      h1 = document.querySelector('h1');

let fileContent = '';
let fileArray = [];
let fileTitle = "";
let wordObj = {};
let fullSortedWordArray = [];

// ===== a list of stop words we don't want to include in stats
// sin implementar --------------------------------------------------------------------------
const enArrayCommonWords =  ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];

const esArrayCommonWords = ['', 'a', 'al', 'con', 'de', 'del', 'el', 'en', 'la', 'las', 'lo', 'los', 'me', 'mi', 'por', 'que', 'se', 'un', 'una', 'y'];

const elArrayCommonWords =  ['τι', 'το', 'ο', 'η'];

let arrLang = [];

// =====  get the file and extract the text content
const getFile = (e) => {
    var input = e.target;
    
    fileTitle = e.target.files[0].name;
    fileTitle = fileTitle.substr(0, fileTitle.lastIndexOf('.')) || input;
    console.log(fileTitle);
    showTitle(fileTitle);

    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;   
        text = text.toLowerCase(); 
        var output = document.getElementById('output');
        output.value=text;
        fileContent=text;
        textToString();
        arrayCountedWords();
    };
    reader.readAsText(input.files[0]);
    
}


// ========= converts the text to words array
const textToString = () => {
    fileArray = fileContent.split(/\s+/ );
}


// ========= creates an object with all the word and it counts them
const arrayCountedWords = () => {

    //vamos a crerar un objeto con las palabras del texto
    for (let i = 0; i < fileArray.length; i++) {

        if(wordObj[fileArray[i]]){
            wordObj[fileArray[i]]++;
        }else{
            wordObj[fileArray[i]] = 1;
        }    
    }

    sortObj(Object.entries(wordObj));
}


// ==== it shows the word list in the HTML
const upDateList = wordObj => {
    const wordList = document.querySelector('.lista-palabras');
    const stringfyWordObj = JSON.stringify(wordObj)
    console.log(stringfyWordObj);
    wordList.textContent = "The list:" + stringfyWordObj;
}


const sortObj = (wordArr) => {
    // console.log(wordArr);
    wordArr.sort(function(a, b) {
        return b[1] - a[1];
    });
    // console.log(wordArr)
    fullSortedWordArray = wordArr;
}


// ===== to show the times it is a specific word in the file
function searchWord(e) {
    e.preventDefault();

    if(!fileContent){
        mostrarAlerta('No has cargado ningún texto.')
        return;
    }

    if(!searchInput.value){
        mostrarAlerta('Te has olvidado de escribir una palabra.')
        return;
    }

    let timesTheWord = '';
    timesTheWord = wordObj[searchInput.value];

    const searchedWordP = document.querySelector('.searched-word-p');
    searchedWordP.classList.add('mb-5');
    
    if(typeof(timesTheWord)=== 'undefined'){
        searchedWordP.innerHTML = `No se han econtrado coincidencias para la palabra <i>"${searchInput.value}."</i>`;
        return;
    }

    searchedWordP.innerHTML = `Se han encontrado <strong>${timesTheWord}</strong> resultados para la palabra <i>"${searchInput.value}."</i>`;
    

}

//añadir el título del document
const showTitle = () => {
    title.textContent = fileTitle;
}


// imprimir la más repetidas en la lista que se activa con el submit
const repeatedHundred = (e) => {
    e.preventDefault();
    if(!fileContent){
        mostrarAlerta('No has cargado ningún texto.')
        return;
    }

    let hundredArray = '';
    const las100 = document.querySelector('.las-100-palabras');
    const listElem = document.createElement('li');

    let k=0;
    let maxWords = 99;
    for (let i = 0; i < maxWords; i++) {
        k++;
        for (let j = 0; j < arrLang.length; j++) {
            if(arrLang[j] === fullSortedWordArray[i][0]){
                console.log('hola');
                i++;
                maxWords++;
                j=0;
            }
            
        }
        hundredArray = fullSortedWordArray[i];

        listElem.innerHTML += `<li>${k}. ${hundredArray.join(': ')}</li>` ;
        // console.log(hundredArray);
        las100.appendChild(listElem);
    }

}


const mostrarAlerta = mensaje =>{
    textAlert.textContent = mensaje;
    textAlert.classList.remove('d-none');
    setTimeout(() => {
        textAlert.classList.add('d-none');
    }, 5000);
}


// === title's shadow

const walk = 7;

function shadow(e){
    const {offsetWidth: width, offsetHeight: height} = body;
    let { offsetX: x, offsetY: y} = e;

    if(this !== e.target){
      x = x + e.target.offsetLeft;
      y = y + e.target.offsetTop;
    }
  
   const xWalk = Math.round(x / width * walk) - (walk / 2); 
   const yWalk = Math.round(y / height * walk) - (walk / 2); 

    h1.style.textShadow = `${xWalk}px ${yWalk}px 5px rgb(121,121,121)`;

  }

  const langWordsFilter = e => {
        let languaje = e.target.value;
        switch (languaje) {
            case 'es':
                arrLang = esArrayCommonWords;
                break;

            case 'en':
                arrLang = enArrayCommonWords;
                break;

            case 'el':
                arrLang = elArrayCommonWords;
                break;

            default:
                break;
        }
        console.log(arrLang)
  }



file.addEventListener('change', getFile);
searchWordForm.addEventListener('submit', searchWord);
ahundredForm.addEventListener('submit', repeatedHundred);
body.addEventListener('mousemove', shadow);
langSelector.addEventListener('change', langWordsFilter)
 

