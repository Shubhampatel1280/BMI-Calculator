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
    let minWeight = 18.5 * (height * height);
    let midWeight = 21.7 * (height * height);
    let maxWeight = 24.9 * (height * height);

    if (bmi > 24.9) { // Overweight or Obese
        targetWeight = level === "beginner" ? maxWeight :
                       level === "intermediate" ? midWeight :
                       minWeight; // Advanced loses the most weight
    } else {
        targetWeight = level === "beginner" ? minWeight :
                      level === "intermediate" ? midWeight :
                     maxWeight; // Normal or underweight cases remain unchanged
    }

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
                    ${level === "advanced" ? `<div>Push-ups – 3x20 <img src='weighted-push-up.gif'></div>` : ""}
                  </div>`;
    }
    
    
    document.getElementById(level + "Plan").innerHTML =
    '<div id="recommendation"><h2>' + recommendation + '</h2></div>' +
    '<div id="target-weight"><p><b>Target Weight: ' + targetWeight.toFixed(2) + 'kg</b></p></div>' +
    '<p>' + diet + '</p>' +
    '<p>' + workout + '</p>';
}
    let productDetails = {
        product1: { title: "Optimum Nutrition Gold Standard Whey", desc: "A blend of whey protein isolate, concentrate, and peptides, providing 24g of protein per serving to support muscle building and recovery.", price: "₹3,499", imageURL: "https://m.media-amazon.com/images/I/71gQNJJi2CL.jpg"},
        product2: { title: "Dymatize ISO100", desc: "Hydrolyzed whey protein isolate offering 25g of protein per serving, known for rapid absorption and digestion.", price: "₹4,299",imageURL: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/dyz/dyz35321/l/25.jpg" },
        product3: { title: "MuscleBlaze Whey Protein", desc: "Premium whey protein with 25g of protein per serving, enhanced with digestive enzymes for better absorption.", price: "₹2,999", imageURL: "https://img6.hkrtcdn.com/27834/prd_2783395-MuscleBlaze-Whey-Performance-Protein-4.4-lb-Chocolate_o.jpg"},
        product4: { title: "Ultimate Nutrition Prostar",  desc: "Whey protein blend with 25g protein per serving, low in fat and carbohydrates for lean muscle gains.", price: "₹3,799", imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzEct8xEt4kp-KPGM6v8VFQxGSsxbTVdKBg&s"},
        product5: { title: "Muscletech Nitro-Tech", desc: "Scientifically engineered whey protein with added creatine for superior muscle growth and strength.", price: "₹4,499", imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4HQIXvKLZyyQaZp-mYHqja6q4XEAwSi2aJw&s" },
        product6: { title: "MyProtein Impact Whey", desc: "High-quality whey protein with 21g of protein per serving, known for its purity and taste.", price: "₹3,199", imageURL: "https://m.media-amazon.com/images/I/31yb+Beg6WL.jpg" },
        product7: { title: "BSN Syntha-6", desc: "A protein matrix that delivers sustained amino acid release, ideal for post-workout recovery and nighttime use.", price: "₹3,999",  imageURL: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/bsn/bsn01110/y/8.jpg" },
        product8: { title: "Optimum Nutrition Serious Mass", desc: "A high-calorie mass gainer with 50g protein, 250g carbs, and essential vitamins for maximum muscle gain.", price: "₹2,899", imageURL: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02299/y/55.jpg" },
        product9: { title: "Muscletech Mass-Tech", desc: "An advanced mass gainer with multi-phase protein, complex carbs, and creatine for optimal muscle building.", price: "₹4,099", imageURL: "https://m.media-amazon.com/images/I/61hA0OnsLKL.jpg" },
        product10: { title: "Ronnie Coleman Whey", desc: "High-quality whey protein with BCAAs for enhanced muscle recovery and growth.", price: "₹3,899", imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcGsafrdHl9eUKNq92Mgjt34CT6CcKEYIZA&s" },
        product11: { title: "MusclePharm Combat", desc: "A blend of 5 different protein sources ensuring a sustained release of amino acids for muscle recovery.", price: "₹3,599", imageURL: "https://musclepharm.com/cdn/shop/files/MP_4lbCombat_Horchata_Frontcopy.png?v=1707501734&width=2000" },
        product12: { title: "Evlution Nutrition Stacked Protein", desc: "Multi-stage protein blend with whey isolate, casein, and egg protein for muscle growth and recovery.", price: "₹3,999", imageURL: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/evl/evl02339/l/8.jpg" },
        product13: { title: "Rule 1 Whey", desc: "Ultra-pure whey isolate with no fillers, providing 25g of protein per serving.", price: "₹4,199", imageURL: "https://fitbasket.in/wp-content/uploads/2019/05/Rule1whey5lbchoc-1-1.jpg"},
        product14: { title: "IsoPure Zero Carb", desc: "Zero-carb, pure whey protein isolate, perfect for low-carb diets and lean muscle maintenance.", price: "₹4,299", imageURL: "https://apexsupplements.in/cdn/shop/files/Isopure-Zero-Carb-Whey-Protein-Isolate-unflavoured_3995a2a7-9ef8-4de5-9db6-9929690805cc.jpg?v=1729931003&width=1946" },
        product15: { title: "Mutant Mass", desc: "An extreme mass gainer packed with calories, protein, and essential nutrients for serious weight gainers.", price: "₹3,999", imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVXPlcBl5neFHSRitxF7Dzg0-wo-Z9N7UPKg&s" },
        product16: { title: "Optimum Nutrition Casein", desc: "Slow-digesting casein protein providing a sustained release of amino acids, ideal for nighttime recovery.", price: "₹4,499", imageURL: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02419/y/24.jpg" },
        product17: { title: "Xtend BCAA", desc: "A performance-enhancing BCAA formula that supports muscle recovery, endurance, and hydration.", price: "₹2,799", imageURL: "https://m.media-amazon.com/images/I/71jYB0vgo3L.jpg" },
        product18: { title: "BSN True Mass", desc: "A calorie-dense mass gainer with a blend of proteins, complex carbs, and healthy fats for maximum muscle gains.", price: "₹4,099", imageURL: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/bsn/bsn00655/l/42.jpg" }
    };

let currentProductId = '';

function viewMore(productId) {
    console.log("viewMore called with:", productId);
    currentProductId = productId;
    const product = productDetails[productId];
    if (product) {
        console.log("Product found:", product);
        document.getElementById('detailsTitle').innerText = product.title;
        document.getElementById('detailsImage').src = product.imageURL; // Fixed issue
        document.getElementById('detailsDesc').innerText = product.desc;
        document.getElementById('detailsPrice').innerText = product.price;
        document.getElementById('productQuantity').value = 1;
        document.getElementById('productDetails').style.display = "block";
    } else {
        console.error("Product not found for ID:", productId);
    }
}

function closeDetails() {
    document.getElementById('productDetails').style.display = "none";
}

function changeQuantity(amount) {
    const quantityInput = document.getElementById('productQuantity');
    let currentQuantity = parseInt(quantityInput.value);
    if (!isNaN(currentQuantity)) {
        currentQuantity += amount;
        if (currentQuantity < 1) currentQuantity = 1;
        quantityInput.value = currentQuantity;
    }
}

function buyNow() {
    const quantity = document.getElementById('productQuantity').value;
    const product = productDetails[currentProductId];

    if (product) {
        document.getElementById('checkoutProductName').innerText = product.title;
        document.getElementById('checkoutQuantity').innerText = quantity;
        document.getElementById('checkoutModal').style.display = "block";
    }
}

function closeCheckout() {
    document.getElementById('checkoutModal').style.display = "none";
}

function proceedPayment() {
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const address = document.getElementById('userAddress').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    if (name && phone && address && paymentMethod) {
        alert(`Order placed successfully!\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nPayment: ${paymentMethod}`);
        
        // Redirect to a confirmation page or handle order processing
        window.location.href = `/confirm-order?product=${currentProductId}&quantity=${document.getElementById('productQuantity').value}&name=${encodeURIComponent(name)}&phone=${phone}&address=${encodeURIComponent(address)}&payment=${paymentMethod}`;
    } else {
        alert("Please fill in all details.");
    }
}
