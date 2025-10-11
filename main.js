const generateBtn = document.getElementById("btn");
const paletteContainer = document.querySelector(".palette-container");


generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("copy-btn")) {
        const haxValue = e.target.previousElementSibling.textContent;

        navigator.clipboard.writeText(haxValue).then(() => showCopySuccess(e.target))
            .catch((err) => console.log(err));
    }
    else if(e.target.classList.contains("color")){
        const haxValue =e.target.nextElementSibling.querySelector(".hex-value").textContent;

        navigator.clipboard.writeText(haxValue).then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
            .catch((err) => console.log(err));
    }
});

function showCopySuccess(element) {
    element.classList.remove("fa-solid", "fa-copy");
    element.classList.add("fa-solid", "fa-check");

    element.style.color = "#48bb78";

    setTimeout(() => {
        element.classList.remove("fa-solid", "fa-check");
        element.classList.add("fa-solid", "fa-copy");
        element.style.color="";
    },1500);

}

function generatePalette() {
    const colors = [];
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor())
    }

    updatePaletteDisplay(colors);
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF"; //hex value have number from 0-9 and alphabets from A-F

    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];//math.random() creates random value in point to and *16 keep it in range of 15.999... and math.floor() make it to nearest whole number 
    }
    return color;
}

function updatePaletteDisplay(colors) {
    const colorBox = document.querySelectorAll(".color-boxes");

    colorBox.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const haxValue = box.querySelector(".hex-value");


        colorDiv.style.backgroundColor = color;
        haxValue.textContent = color;
    })
}