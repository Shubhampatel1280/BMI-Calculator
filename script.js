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
        if (document.getElementById('heightunit').value=="select-unit" || document.getElementById('weightunit').value=="select-unit") {
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
    //Tejas & Shubham
        if (weight > 0 && height > 0) {
            let bmi = (weight / (height * height)).toFixed(2);
            document.getElementById("bmiResult").innerHTML = 'Your BMI: ' + bmi + '<br><br>' + 
            'Do you need a diet and workout plan? <br>' + 
            '<button onclick="showSection(\'workoutPlan\')">Yes</button>';
        } else {
            document.getElementById("bmiResult").innerText = "Please enter valid values.";
        }
}

document.addEventListener("DOMContentLoaded", () => {
    showSection('home');
});

//Tejas
function showWorkout(level) {
    // Hide the workout plan buttons
    document.getElementById('workoutPlan').style.display = "none";

    // Hide all plans initially
    document.getElementById('beginnerPlan').style.display = "none";
    document.getElementById('intermediatePlan').style.display = "none";
    document.getElementById('advancedPlan').style.display = "none";

    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);

    if (document.getElementById('heightunit').value == "ft") {
        let inches = parseFloat(document.getElementById('inchesinput').value) || 0;
        height = (height * 0.3048) + (inches * 0.0254); // Convert to meters
    }

    if (document.getElementById('weightunit').value == "lbs") {
        weight = weight * 0.453592; // Convert to kg
    }

    // **Ensure BMI is calculated correctly**
    let bmi = weight / (height * height);
    bmi = parseFloat(bmi.toFixed(2)); // Round to 2 decimal places

    console.log("BMI:", bmi, "Level:", level); // Debugging log

    // Show the selected plan
    if (level === "beginner") {
        document.getElementById('beginnerPlan').style.display = "block";
    } else if (level === "intermediate") {
        document.getElementById('intermediatePlan').style.display = "block";
    } else if (level === "advanced") {
        document.getElementById('advancedPlan').style.display = "block";
    }

    // Show the back button
    document.getElementById('backButton').style.display = "block";

    // **Pass the correct BMI to getDietAndWorkoutPlan**
    getDietAndWorkoutPlan(bmi, level, weight, height);
}
function goBack() {
    // Hide all workout plans when clicked "back"
    document.getElementById('beginnerPlan').style.display = "none";
    document.getElementById('intermediatePlan').style.display = "none";
    document.getElementById('advancedPlan').style.display = "none";

    // Shows the workout plan selection buttons again after clicking "back"
    document.getElementById('workoutPlan').style.display = "block";

    // Hides the "back" button when back to plan selection page
    document.getElementById('backButton').style.display = "none";
}
// Shubham & Joy
function getDietAndWorkoutPlan(bmi, level, weight, height) {
    let plan = "";
    let recommendation = "";
    let diet = "";
    let workout = "";
    let goal = (bmi < 18.5) ? "gain" : (bmi > 24.9) ? "loss" : "maintain";
    let minWeight=18.5*(height * height);
    let midWeight=21.7*(height * height);
    let maxWeight=24.9*(height * height);
    let targetWeight = level === "beginner" ? minWeight :
                       level === "intermediate" ? midWeight :
                       maxWeight;

    let weightDiff = weight - targetWeight;
    if (weightDiff < 0) {
        recommendation = "You need to gain " + (-weightDiff.toFixed(2)) + " kg to reach the need of your plan";
    } else if (weightDiff > 0) {
        recommendation = "You need to lose " + weightDiff.toFixed(2) + " kg to reach the need of your plan";
    } else {
        recommendation = "You are at a perfect weight!";
    }
    
    if (bmi < 18.5) { // Underweight - Need to gain
        diet = `<div class="diet-plan">
                    <h2>${level.charAt(0).toUpperCase() + level.slice(1)} Diet Plan</h2>
                    <div>Breakfast: ${level === "beginner" ? "Scrambled eggs + toast + fruit" : level === "intermediate" ? "Oats + whey + banana" : "Eggs + toast + avocado"}</div>
                    <div>Lunch: ${level === "beginner" ? "Grilled chicken + brown rice" : level === "intermediate" ? "Chicken breast + sweet potato" : "Lean beef + quinoa"}</div>
                    <div>Dinner: ${level === "beginner" ? "Fish + quinoa + salad" : level === "intermediate" ? "Grilled fish + brown rice" : "Grilled chicken + mashed potatoes"}</div>
                </div>`;
    
        workout = `<div class="workout-plan">
                    <h2>${level.charAt(0).toUpperCase() + level.slice(1)} Workout Plan</h2>
                    <div>Squats – ${level === "beginner" ? "3x10" : level === "intermediate" ? "4x12" : "5x12"} <img src='gym.gif'></div>
                    <div>Push-ups – ${level === "beginner" ? "3x8" : level === "intermediate" ? "4x12" : "5x15"} <img src='weighted-push-up.gif'></div>
                    <div>Dumbbell Rows – ${level === "beginner" ? "3x10" : level === "intermediate" ? "4x12" : "5x12"} <img src='DB_LOW.gif'></div>
                    ${level !== "beginner" ? `<div>Bench Press – ${level === "intermediate" ? "3x10" : "4x12"} <img src='anim-dumbbell-bench-press.gif'></div>` : ""}
                    ${level === "advanced" ? `<div>Deadlifts – 4x8 <img src='barbell-deadlift-movement.webp'></div>` : ""}
                  </div>`;
    } else if (bmi >= 18.5 && bmi < 24.9) { // Normal weight - Maintain
        diet = `<div class="diet-plan">
                    <h2>${level.charAt(0).toUpperCase() + level.slice(1)} Diet Plan</h2>
                    <div>Breakfast: ${level === "beginner" ? "Oatmeal + banana" : level === "intermediate" ? "Eggs + whole wheat toast" : "Protein smoothie + almonds"}</div>
                    <div>Lunch: ${level === "beginner" ? "Chicken + brown rice + veggies" : level === "intermediate" ? "Lean beef + quinoa" : "Grilled chicken + mashed potatoes"}</div>
                    <div>Dinner: ${level === "beginner" ? "Grilled fish + sweet potato" : level === "intermediate" ? "Salmon + greens" : "Cottage cheese + nuts"}</div>
                </div>`;
    
        workout = `<div class="workout-plan">
                    <h2>${level.charAt(0).toUpperCase() + level.slice(1)} Workout Plan</h2>
                    <div>Deadlifts – ${level === "beginner" ? "3x6" : level === "intermediate" ? "4x6" : "5x6"} <img src='barbell-deadlift-movement.webp'></div>
                    <div>Pull-ups – ${level === "beginner" ? "3x6" : level === "intermediate" ? "3x8" : "5x10"} <img src='pull-up-647dd51506791.gif'></div>
                    <div>Squats – ${level === "beginner" ? "3x8" : level === "intermediate" ? "4x10" : "5x12"} <img src='gym.gif'></div>
                    ${level !== "beginner" ? `<div>Bench Press – ${level === "intermediate" ? "4x8" : "5x8"} <img src='anim-dumbbell-bench-press.gif'></div>` : ""}
                  </div>`;
    } else { // Overweight - Need to lose or Obese
        diet = `<div class="diet-plan">
                    <h2>${level.charAt(0).toUpperCase() + level.slice(1)} Diet Plan</h2>
                    <div>Breakfast: ${level === "beginner" ? "Oats + banana" : level === "intermediate" ? "Eggs + avocado" : "Oatmeal + berries"}</div>
                    <div>Lunch: ${level === "beginner" ? "Chicken breast + greens" : level === "intermediate" ? "Lean beef + quinoa" : "Salmon + greens"}</div>
                    <div>Dinner: ${level === "beginner" ? "Grilled fish + avocado" : level === "intermediate" ? "Cottage cheese + nuts" : "Grilled chicken + asparagus"}</div>
                </div>`;
    
        workout = `<div class="workout-plan">
                    <h2>${level.charAt(0).toUpperCase() + level.slice(1)} Workout Plan</h2>
                    <div>Jump Rope – ${level === "beginner" ? "2x1 min" : level === "intermediate" ? "3x2 min" : "4x2 min"} <img src='barbell-deadlift-movement.webp'></div>
                    <div>Burpees – ${level === "beginner" ? "2x10" : level === "intermediate" ? "3x12" : "5x12"} <img src='half-burpee.gif'></div>
                    ${level !== "beginner" ? `<div>Squats – ${level === "intermediate" ? "4x12" : "5x15"} <img src='gym.gif'></div>` : ""}
                    ${level === "advanced" ? `<div>HIIT Workouts – 4 rounds of 30s on/30s off <img src='barbell-deadlift-movement.webp'></div>` : ""}
                  </div>`;
    }
    
    
    document.getElementById(level + "Plan").innerHTML =
    '<div id="recommendation"><h2>' + recommendation + '</h2></div>' +
    '<div id="target-weight"><p><b>Target Weight: ' + targetWeight.toFixed(2) + 'kg</b></p></div>' +
    '<p>' + diet + '</p>' +
    '<p>' + workout + '</p>';
}