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
    //Tejas and shubham
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
    // Hide the workout plan buttons by using display:"none";
    document.getElementById('workoutPlan').style.display = "none";

    // Hide all plans first(this is when the buttons are visible the plans are invisible/hidden)
    document.getElementById('beginnerPlan').style.display = "none";
    document.getElementById('intermediatePlan').style.display = "none";
    document.getElementById('advancedPlan').style.display = "none";

    // Show the selected plan and the back button(this is when a plan is selected the back buttons and the plan description is visible and the other buttons are invisible/hidden)
    if (level === "beginner") {
        document.getElementById('beginnerPlan').style.display = "block";
    } else if (level === "intermediate") {
        document.getElementById('intermediatePlan').style.display = "block";
    } else if (level === "advanced") {
        document.getElementById('advancedPlan').style.display = "block";
    }
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);

    if (document.getElementById('heightunit').value == "ft") {
        let inches = parseFloat(document.getElementById('inchesinput').value) || 0;
        height = (height * 0.3048) + (inches * 0.0254); // Convert to meters
    }

    if (document.getElementById('weightunit').value == "lbs") {
        weight = weight * 0.453592; // Convert to kg
    }

    // Shows the back button when clicked on plans
    document.getElementById('backButton').style.display = "block";
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
// Shubham
function getDietAndWorkoutPlan(bmi, level, weight, height) {
    let plan = "";
    let recommendation = "";
    let diet = "";
    let workout = "";
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
    
    if (bmi < 18.5) {
        diet = level === "beginner" ? "High-calorie meals with rice, eggs, chicken, and dairy." :
               level === "intermediate" ? "Increase protein intake with whey, lean meats, and nuts." :
               "High protein, creatine, and resistance training-focused nutrition.";
        workout = "Strength training with progressive overload and minimal cardio.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        diet = level === "beginner" ? "Balanced diet with proteins, carbs, and healthy fats." :
               level === "intermediate" ? "Lean proteins, complex carbs, and hydration focus." :
               "Customized macros with calculated calorie intake and advanced supplements.";
        workout = "Strength and endurance workouts with moderate cardio.";
    } else if (bmi >= 25 && bmi < 29.9) {
        diet = level === "beginner" ? "Lower carbs, high fiber, and lean proteins." :
               level === "intermediate" ? "Include intermittent fasting and meal timing strategies." :
               "Strict low-carb, high-protein diet with fat-burning supplements.";
        workout = "High-intensity interval training (HIIT) and strength workouts.";
    } else {
        diet = "Strict calorie deficit with portion control and nutrient-dense foods.";
        workout = "Low-impact workouts like swimming, walking, and gradual strength training.";
    }

    plan = '<h2>'+recommendation+'</h2>'+
                '<p>'+'<b>'+'Target Weight: '+'</b>'+targetWeight.toFixed(2)+'kg'+'</p>'+
                '<p>'+'<b>'+'Diet Plan: '+'</b>'+diet+'</p>'+
                '<p>'+'<b>'+'Workout Plan: '+'</b>'+workout+'</p>';

    document.getElementById(level + "Plan").innerHTML = plan;
}