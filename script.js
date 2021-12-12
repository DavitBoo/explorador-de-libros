const file = document.getElementById('the-file');



// =====  get the file and extract the text content
const getFile = (e) => {
    var input = e.target;

    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;    
        var output = document.getElementById('output');
        output.value=dataURL;
        return dataURL;
    };
    // console.log(input.files[0])
    reader.readAsText(input.files[0]);
    
}



const fileString = file.addEventListener('change', getFile);
console.log(fileString);

