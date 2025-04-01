//Shubham
// Ensure proper visibility control on page load
document.addEventListener("DOMContentLoaded", () => {
    const workoutPlan = document.getElementById('workoutPlan');
    const selectedWorkoutPlan = document.getElementById('selectedWorkoutPlan');
    workoutPlan.style.display = 'none';
    selectedWorkoutPlan.style.display = 'none';
    showSection('home'); // Show Home by default
});

// Helper function to reset visibility of Workout Plan and selected workout details
function resetVisibility() {
    const workoutPlan = document.getElementById('workoutPlan');
    const selectedWorkoutPlan = document.getElementById('selectedWorkoutPlan');
    workoutPlan.style.display = 'none';
    selectedWorkoutPlan.style.display = 'none';
}

// Show the relevant section based on the section ID
function showSection(sectionId) {
    let sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = "none");
    document.getElementById(sectionId).style.display = "block";
//Shubham and Tejas
    if (sectionId === 'bmi') {
        resetVisibility();
        const bmiResult = document.getElementById('bmiResult');
        if (bmiResult) {
            bmiResult.innerHTML = ''; // Clear any lingering results when navigating to BMI page
        }
    } else {
        resetVisibility(); // Ensure Workout Plan and selected workout are hidden on non-BMI pages
    }
}

//SHubham
function addinchesinput() {
    let heightunit = document.getElementById('heightunit').value;
    let inchesContainer = document.getElementById('inchesContainer');

    if (heightunit === "ft" && !inchesContainer) {
        const newDiv = document.createElement('div');
        newDiv.id = 'inchesContainer';
        newDiv.innerHTML = 
            '<label id="label">Inches: </label>' +
            '<input type="number" id="inchesinput" placeholder="Inches">';
        document.getElementById('inchesin').appendChild(newDiv);
    } else if (heightunit !== "ft" && inchesContainer) {
        inchesContainer.remove();
    }
}

function calculateBMI() {
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;

    if (document.getElementById('heightunit').value == "select-unit" || document.getElementById('weightunit').value == "select-unit") {
        document.getElementById("bmiResult").innerText = "Invalid input: Please select weight and height units.";
        return;
    }
    if (document.getElementById('heightunit').value == "ft") {
        let inches = document.getElementById('inchesinput')?.value || 0;
        height = (height * 0.3048) + (inches * 0.0254);
    }
    if (document.getElementById('weightunit').value == "lbs") {
        weight = weight * 0.453592;
    }

    weight = parseFloat(weight);
    height = parseFloat(height);

    if (weight > 0 && height > 0) {
        let bmi = (weight / (height * height)).toFixed(2);
        document.getElementById("bmiResult").innerHTML = `
            Your BMI: ${bmi} <br><br>
            Do you need a diet and workout plan? <br>
            <button onclick="showWorkoutSelection()">Yes</button>
        `;
    } else {
        document.getElementById("bmiResult").innerText = "Please enter valid values.";
    }
}
//Tejas
function showWorkoutSelection() {
    const bmiSection = document.getElementById('bmi');
    bmiSection.style.display = 'none'; // Hide BMI calculator elements

    const workoutPlan = document.getElementById('workoutPlan');
    workoutPlan.style.display = 'flex'; // Show Workout Plan in Flexbox layout
}

function showWorkout(level) {
    const workoutPlan = document.getElementById('workoutPlan');
    workoutPlan.style.display = 'none'; // Hide the Workout Plan section

    const selectedWorkoutPlan = document.getElementById('selectedWorkoutPlan');
    let content = '';

    if (level === 'beginner') {
        content = '<h1>Beginner Plan</h1><p>This plan is designed for newcomers looking to ease into fitness.</p>';
    } else if (level === 'intermediate') {
        content = '<h1>Intermediate Plan</h1><p>This plan is for those ready to build consistency and strength.</p>';
    } else if (level === 'advanced') {
        content = '<h1>Advanced Plan</h1><p>This plan is tailored for seasoned fitness enthusiasts seeking peak performance.</p>';
    }

    selectedWorkoutPlan.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            ${content}
            <button onclick="goBackToSelection()" style="margin-top: 20px;">Back</button>
        </div>
    `;
    selectedWorkoutPlan.style.display = 'block'; // Make selected plan visible
}

function goBackToSelection() {
    const selectedWorkoutPlan = document.getElementById('selectedWorkoutPlan');
    selectedWorkoutPlan.style.display = 'none'; // Hide the selected workout plan

    const workoutPlan = document.getElementById('workoutPlan');
    workoutPlan.style.display = 'flex'; // Restore Workout Plan options
}