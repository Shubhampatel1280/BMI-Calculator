// Function to show only the selected section
function showSection(sectionId) {
    // Hide all sections
    let sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = "none");

    // Show the selected section
    document.getElementById(sectionId).style.display = "block";
}

// Function to calculate BMI
function calculateBMI() {
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;

    if (weight > 0 && height > 0) {
        let bmi = (weight / (height * height)).toFixed(2);
        document.getElementById("bmiResult").innerText = "Your BMI: " + bmi;
    } else {
        document.getElementById("bmiResult").innerText = "Please enter valid values.";
    }
}

// Set Home section as default visible
document.addEventListener("DOMContentLoaded", () => {
    showSection('home');
});
