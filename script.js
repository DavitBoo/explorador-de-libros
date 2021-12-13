const 
    file = document.getElementById('the-file'),
    searchWordForm = document.querySelector('.search-word'),
    searchInput = document.getElementById('search-input'),
    ahundredForm = document.querySelector('.ahundred-word');

let fileContent = '';
let fileArray = [];
let wordObj = {};
let fullSortedWordArray = [];


// ===== a list of stop words we don't want to include in stats
const enArrayCommonWords = ['a', 'and', 'in', 'the', 'of', 'to'];
// const esArrayCommonWords = ['a', 'and', 'in', 'the', 'of', 'to'];

// =====  get the file and extract the text content
const getFile = (e) => {
    var input = e.target;

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
    // console.log(fileArray);
}


// ========= creates an object with all the word and it counts them
const arrayCountedWords = () => {
    const fullSortedWordArray = [];

    //vamos a crerar un objeto con las palabras del texto
    for (let i = 0; i < fileArray.length; i++) {
        if(wordObj[fileArray[i]]){
            wordObj[fileArray[i]]++;
        }else{
            wordObj[fileArray[i]] = 1;
        }    
    }

    upDateList(wordObj);
    sortObj(Object.entries(wordObj));
}


// ==== it shows the word list in the HTML
const upDateList = wordObj => {
    const wordList = document.querySelector('.lista-palabras');
    const stringfyWordObj = JSON.stringify(wordObj)
    console.log(stringfyWordObj);
    wordList.textContent = "The list:" + stringfyWordObj;
}


// ======= Object to an array with the values ------------------------------------------------------
const objToArray = wordObj => {

}

const sortObj = (wordArr) => {
    // console.log(wordArr);
    wordArr.sort(function(a, b) {
        return b[1] - a[1];
    });
    // console.log(wordArr)
    fullSortedWordArray = wordArr;
}


// AHORA QUE TENGO UN OBJETO CON TODAS LAS PALABRAS ESTO ES SUSTITUIBLE y MEJORABLE --------------------------------
function searchWord(e) {
    e.preventDefault();
    let str = searchInput.value;
    let strArray =  fileArray;
    for (let i=0; i<strArray.length; i++) {
        if (strArray[i].match(str)) return console.log(i);
    }
    return -1;
}


const repeatedHundred = (e) => {
    e.preventDefault();
    let hundredArray = '';
    const las100 = document.querySelector('.las-100-palabras');
    const listElem = document.createElement('li');

    for (let i = 0; i < 99; i++) {
        hundredArray = fullSortedWordArray[i];
        // console.log(hundredArray);
        listElem.innerHTML += `<li> ${hundredArray}</li>` ;
        las100.appendChild(listElem);
    }
    // // 
    // las100.textContent = hundredArray;
    // console.log({hundredArray});
}



file.addEventListener('change', getFile);
searchWordForm.addEventListener('submit', searchWord);
ahundredForm.addEventListener('submit', repeatedHundred);
 

