const 
    body = document.querySelector('body')
    file = document.getElementById('the-file'),
    searchWordForm = document.querySelector('.search-word'),
    searchInput = document.getElementById('search-input'),
    ahundredForm = document.querySelector('.ahundred-word');
    textAlert = document.querySelector('.alert');

const title = document.querySelector('.book-name'),
      h1 = document.querySelector('h1');

let fileContent = '';
let fileArray = [];
let fileTitle = "";
let wordObj = {};
let fullSortedWordArray = [];


// ===== a list of stop words we don't want to include in stats
const enArrayCommonWords = ['a', 'and', 'in', 'the', 'of', 'to'];
// const esArrayCommonWords = ['a', 'and', 'in', 'the', 'of', 'to'];

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
    // console.log(fileArray);
}


// ========= creates an object with all the word and it counts them
const arrayCountedWords = () => {
    // const fullSortedWordArray = [];

    //vamos a crerar un objeto con las palabras del texto
    for (let i = 0; i < fileArray.length; i++) {
        if(wordObj[fileArray[i]]){
            wordObj[fileArray[i]]++;
        }else{
            wordObj[fileArray[i]] = 1;
        }    
    }

    // upDateList(wordObj); -----------------------------------------------------   
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
    let timesTheWord = ';'
    timesTheWord = wordObj[searchInput.value];

    const searchedWordP = document.querySelector('.searched-word-p');
    searchedWordP.classList.add('mb-5');
    searchedWordP.innerHTML = `Se han encontrado <strong>${timesTheWord}</strong> resultados para la palabra <i>"${searchInput.value}."</i>`;


    // e.preventDefault();
    // let str = searchInput.value;
    // let strArray =  fileArray;
    // for (let i=0; i<strArray.length; i++) {
    //     if (strArray[i].match(str)) return console.log(i);
    // }
    // return -1;
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

    for (let i = 0; i < 99; i++) {
        hundredArray = fullSortedWordArray[i];
        // console.log(hundredArray);
        listElem.innerHTML += `<li>${i+1}. ${hundredArray.join(': ')}</li>` ;
        console.log(hundredArray);
        las100.appendChild(listElem);
    }
    // // 
    // las100.textContent = hundredArray;
    // console.log({hundredArray});
}


const mostrarAlerta = mensaje =>{
    textAlert.textContent = mensaje;
    textAlert.classList.remove('d-none');
    setTimeout(() => {
        textAlert.classList.add('d-none');
    }, 5000);
}


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



file.addEventListener('change', getFile);
searchWordForm.addEventListener('submit', searchWord);
ahundredForm.addEventListener('submit', repeatedHundred);
body.addEventListener('mousemove', shadow);
 

