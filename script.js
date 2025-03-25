function showSection(sectionId) {
    let sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = "none");
    document.getElementById(sectionId).style.display = "block";
}
function addinchesinput() {
    let heightunit = document.getElementById('heightunit').value;
    let inchesinput = document.getElementById('inchesinput');

    if (heightunit === "ft" && !inchesinput) {
        document.getElementById('inchesin').innerHTML += 
            '<label id="label">'+'Inches: '+'</label>'+'<input type="number" id="inchesinput" placeholder="Inches">';
    } else if (heightunit !== "ft" && inchesinput) {
        inchesinput.remove();
        label.remove();
    }
}
function calculateBMI() {
        let weight = document.getElementById("weight").value;
        let height = document.getElementById("height").value;
        if (document.getElementById('heightunit').value=="select-unit" ||document.getElementById('weightunit').value=="select-unit") {
            document.getElementById("bmiResult").innerText = "Invalid input: Please select weight and height units.";
            return;
        }
        if(document.getElementById('heightunit').value=="ft"){
            inches = document.getElementById('inchesinput').value
            height = (height * 0.3048) + (inches * 0.0254);
        }
        if(document.getElementById('weightunit').value=="lbs"){
            weight = weight * 0.453592;
        }
        weight = parseFloat(weight);
        height = parseFloat(height);
        if (weight > 0 && height > 0) {
            let bmi = (weight / (height * height)).toFixed(2);
            document.getElementById("bmiResult").innerText = "Your BMI: " + bmi;
        } else {
            document.getElementById("bmiResult").innerText = "Please enter valid values.";
        }

    // let weight = document.getElementById("weight").value;
    // let height = document.getElementById("height").value;

    // if (weight > 0 && height > 0) {
    //     let bmi = (weight / (height * height)).toFixed(2);
    //     document.getElementById("bmiResult").innerText = "Your BMI: " + bmi;
    // } else {
    //     document.getElementById("bmiResult").innerText = "Please enter valid values.";
    // }
}

document.addEventListener("DOMContentLoaded", () => {
    showSection('home');
});
