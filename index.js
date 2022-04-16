import { next } from "./src/engine.js";
const jsonData = fetch("./src/lexicon.json")
    .then(response => {
        return response.json();
    })

const scale = 4;
const worldWidth = 480;
const worldHeight = 240;
let lexiconData

const canvas = document.querySelector("canvas");

const trimmedLetter = (str) => str.trim().toLowerCase()
canvas.width = worldWidth * scale;
canvas.height = worldHeight * scale;
const ctx = canvas.getContext("2d");

const render = (rowIndex, colIndex) => {
  ctx.fillStyle = "#fff";
  ctx.fillStyle = "green";
    ctx.fillRect(colIndex, rowIndex, scale - 1, scale - 1)
};

const renderCanvas = (data) => {
    const arr = data[0].pattern.split('');
    let rowIndex = 480;
    let colIndex = 960;
    arr.forEach((ele, i) => {
        switch (ele) {
            case 'O' :
                colIndex += 1;
                render(rowIndex, colIndex)
                break;
            case '.' :
                colIndex += 1;
                break;
            case '\n':
                rowIndex += 1;
                colIndex = 960;
                break;
        }
    })
}




const renderDescription = data => {
    renderCanvas(data)
    data?.forEach(({description})=> {
        let descEle = document.querySelector('#desc');
        descEle.textContent = `${description}`
    })

}

const renderOptions = (names) => {
    names?.forEach((name)=> {
    const selectEle =  document.querySelector("select");
    selectEle.innerHTML += `<option name="${trimmedLetter(name)}">${name}</option>`
})
}

const getSelectedPatternData = (selectedOption) => {
    const filteredPatternData = lexiconData?.filter(lexicon => lexicon.name === selectedOption)
    renderDescription(filteredPatternData)
}
jsonData.then(data => {
        lexiconData = data;
        const selectOptionNames = lexiconData.map(ele => ele.name);
        renderOptions(selectOptionNames)
        getSelectedPatternData('AK94 gun')
})

const selectEle =  document.querySelector("select");
selectEle?.addEventListener('change', (e)=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    getSelectedPatternData(e?.target?.value)
})
