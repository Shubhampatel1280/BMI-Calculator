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

// Cristo
// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCart = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartContent = document.querySelector('.cart-content');
const cartTotal = document.querySelector('.cart-total');
const cartCount = document.querySelector('.cart-count');
const productGrid = document.querySelector('.product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Cart
let cart = [];

// Product Data
const products = [
    {
        id: 1,
        name: "MuscleBlaze Biozyme Performance Whey, 2 kg (4.4 lb), Rich Chocolate",
        price: 5299,
        category: "protein",
        img: "https://img8.hkrtcdn.com/39078/prd_3907787-MuscleBlaze-Biozyme-Performance-Whey-4.4-lb-Rich-Chocolate_o.jpg",
        desc: "India's 1st clinically proven whey protein: Biozyme Performance whey is proven for superior absorption and enhanced muscle-building efficacy."
    },
    {
        id: 2,
        name: "Creatine Monohydrate",
        price: 24.99,
        category: "creatine",
        img: "https://img4.hkrtcdn.com/28512/prd_2851103-MuscleBlaze-CreaPRO-Creatine-with-Creapure-Powder-from-Germany-0.55-lb-Fruit-Punch_o.jpg",
        desc: "Clinically proven to increase strength and power output."
    },
    {
        id: 3,
        name: "Pre-Workout Energizer",
        price: 29.99,
        category: "preworkout",
        img: "https://img4.hkrtcdn.com/35591/prd_3559003-MuscleBlaze-Pre-Workout-WrathX-0.74-lb-Fruit-Fury_o.jpg",
        desc: "Powerful formula to boost energy, focus and endurance."
    },
    {
        id: 4,
        name: "MuscleBlaze Biozyme Gold 100% Whey, 2 kg (4.4 lb), Double Rich Chocolate",
        price: 6599,
        category: "protein",
        img: "https://img2.hkrtcdn.com/36006/prd_3600571-MuscleBlaze-Biozyme-Gold-100-Whey-4.4-lb-Double-Rich-Chocolate_o.jpg",
        desc: "Whey Isolate as primary source: Biozyme Gold's premium protein blend of Isolate & Concentrate contains Whey Isolate as its primary source, providing you with 26g of high-quality protein in every scoop."
    },
    {
        id: 5,
        name: "Creatine HCL",
        price: 34.99,
        category: "creatine",
        img: "https://m.media-amazon.com/images/I/71wLbVnsgSL.jpg",
        desc: "Advanced creatine formula with enhanced absorption."
    },
    {
        id: 6,
        name: "Nitric Oxide Booster",
        price: 27.99,
        category: "preworkout",
        img: "https://img4.hkrtcdn.com/37799/prd_3779883-MuscleBlaze-PRE-Workout-200-Xtreme-0.22-lb-Fruit-Punch_o.jpg",
        desc: "Promotes vasodilation for insane pumps and endurance."
    },
    {
        id: 7,
        name: "MuscleBlaze Biozyme Whey PR, 2 kg (4.4 lb), Molten Chocolate Cake",
        price: 5299,
        category: "protein",
        img: "https://img2.hkrtcdn.com/34808/prd_3480711-MuscleBlaze-Biozyme-Whey-PR-4.4-lb-Molten-Chocolate-Cake_o.jpg",
        desc: "Unleash the power of AstraGin: Each scoop of MB Biozyme Whey PR has 50mg of patented AstraGin®, a revolutionary gut health and immunity booster that optimizes nutrient absorption in your body."
    },
    {
        id: 8,
        name: "Creatine Complex",
        price: 31.99,
        category: "creatine",
        img: "https://img6.hkrtcdn.com/38194/prd_3819395-MuscleBlaze-Creatine-Monohydrate-CreAMP-Juicy-Berries-0.61-lb_o.jpg",
        desc: "Multi-phase creatine for sustained performance enhancement."
    },
    {
        id: 9,
        name: "Nitric Oxide Booster",
        price: 27.99,
        category: "preworkout",
        img: "https://img6.hkrtcdn.com/37463/prd_3746225-MuscleBlaze-Pre-Workout-Ripped-0.55-lb-Fruit-Splash_o.jpg",
        desc: "Promotes vasodilation for insane pumps and endurance."
    },
    {
        id: 10,
        name: "MuscleBlaze Biozyme Performance Whey, 2 kg (4.4 lb), Rich Chocolate",
        price: 5299,
        category: "protein",
        img: "https://img8.hkrtcdn.com/39078/prd_3907787-MuscleBlaze-Biozyme-Performance-Whey-4.4-lb-Rich-Chocolate_o.jpg",
        desc: "India's 1st clinically proven whey protein: Biozyme Performance whey is proven for superior absorption and enhanced muscle-building efficacy."
    },
    {
        id: 11,
        name: "Creatine Monohydrate",
        price: 24.99,
        category: "creatine",
        img: "https://img4.hkrtcdn.com/28512/prd_2851103-MuscleBlaze-CreaPRO-Creatine-with-Creapure-Powder-from-Germany-0.55-lb-Fruit-Punch_o.jpg",
        desc: "Clinically proven to increase strength and power output."
    },
    {
        id: 12,
        name: "Pre-Workout Energizer",
        price: 29.99,
        category: "preworkout",
        img: "https://img4.hkrtcdn.com/35591/prd_3559003-MuscleBlaze-Pre-Workout-WrathX-0.74-lb-Fruit-Fury_o.jpg",
        desc: "Powerful formula to boost energy, focus and endurance."
    }
];

// Display Products
function displayProducts(filter = 'all') {
    productGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');
        productElement.dataset.id = product.id;
        productElement.innerHTML = `
            <div class="product-img">
                <img src="${product.img}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="product-price">
                    <span>₹${product.price.toFixed(2)}</span>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productElement);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// Add to Cart
function addToCart(e) {
    const productId = parseInt(e.target.closest('.product-card').dataset.id);
    const product = products.find(item => item.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.amount += 1;
    } else {
        cart.push({...product, amount: 1});
    }
    
    updateCart();
    showCartNotification();
}

// Show cart notification
function showCartNotification() {
    cartIcon.classList.add('animate');
    setTimeout(() => {
        cartIcon.classList.remove('animate');
    }, 500);
}

// Update Cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.amount, 0);
    cartCount.textContent = totalItems;
    
    // Update cart content
    cartContent.innerHTML = '';
    
    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0.00';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toFixed(2)}</p>
                    <div class="cart-item-amount">
                        <i class="fas fa-chevron-down decrease"></i>
                        <span>${item.amount}</span>
                        <i class="fas fa-chevron-up increase"></i>
                    </div>
                </div>
                <i class="fas fa-trash cart-item-remove"></i>
            `;
            cartContent.appendChild(cartItem);
        });
        
        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.amount), 0);
        cartTotal.textContent = total.toFixed(2);
        
        // Add event listeners to cart items
        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', decreaseAmount);
        });
        
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', increaseAmount);
        });
        
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
    }
}

// Decrease item amount
function decreaseAmount(e) {
    const productName = e.target.closest('.cart-item').querySelector('h4').textContent;
    const cartItem = cart.find(item => item.name === productName);
    
    if (cartItem.amount > 1) {
        cartItem.amount -= 1;
    } else {
        cart = cart.filter(item => item.name !== productName);
    }
    
    updateCart();
}

// Increase item amount
function increaseAmount(e) {
    const productName = e.target.closest('.cart-item').querySelector('h4').textContent;
    const cartItem = cart.find(item => item.name === productName);
    cartItem.amount += 1;
    updateCart();
}

// Remove item
function removeItem(e) {
    const productName = e.target.closest('.cart-item').querySelector('h4').textContent;
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

// Clear cart
function clearCart() {
    cart = [];
    updateCart();
}

// Filter products
function filterProducts(e) {
    const filter = e.target.dataset.filter;
    
    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    displayProducts(filter);
}

// Initialize
function init() {
    // Display all products initially
    displayProducts();
    
    // Cart event listeners
    cartIcon.addEventListener('click', () => {
        cartOverlay.classList.add('show');
    });
    
    closeCart.addEventListener('click', () => {
        cartOverlay.classList.remove('show');
    });
    
    clearCartBtn.addEventListener('click', clearCart);
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', filterProducts);
    });
    
    // Checkout button
    // document.querySelector('.checkout').addEventListener('click', () => {
    //     if (cart.length > 0) {
    //         alert('Thank you for your purchase!');
    //         clearCart();
    //         cartOverlay.classList.remove('show');
    //     } else {
    //         alert('Your cart is empty!');
    //     }
    // });
    // ... (previous code remains the same)

// Create checkout payment modal
const checkoutModal = document.createElement('div');
checkoutModal.classList.add('checkout-modal');
document.body.appendChild(checkoutModal);

// Modify the checkout button event listener
document.querySelector('.checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        showCheckoutModal();
    } else {
        alert('Your cart is empty!');
    }
});

// ... (previous code remains the same until showCheckoutModal function)

function showCheckoutModal() {
    checkoutModal.innerHTML = `
        <div class="checkout-content">
            <span class="close-checkout">&times;</span>
            <h2>Checkout</h2>
            
            <div class="checkout-steps">
                <div class="step active" data-step="shipping">1. Shipping</div>
                <div class="step" data-step="payment">2. Payment</div>
            </div>
            
            <form class="shipping-form active">
                <h3>Shipping Information</h3>
                <div class="form-group">
                    <label for="full-name">Full Name</label>
                    <input type="text" id="full-name" required>
                </div>
                
                <div class="form-group">
                    <label for="contact-number">Contact Number</label>
                    <input type="tel" id="contact-number" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" required>
                </div>
                
                <div class="form-group">
                    <label for="address">Street Address</label>
                    <textarea id="address" rows="3" required></textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="city">City</label>
                        <input type="text" id="city" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="state">State</label>
                        <input type="text" id="state" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="pincode">PIN Code</label>
                        <input type="text" id="pincode" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="country">Country</label>
                        <input type="text" id="country" value="India" readonly>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary close-checkout">Cancel</button>
                    <button type="button" class="btn btn-primary proceed-to-payment">Proceed to Payment</button>
                </div>
            </form>
            
            <div class="payment-form">
                <h3>Payment Method</h3>
                <div class="payment-options-container">
                    <div class="payment-option">
                        <input type="radio" id="credit-card" name="payment" value="credit" checked>
                        <label for="credit-card">
                            <i class="fas fa-credit-card"></i>
                            <span>Credit Card</span>
                        </label>
                    </div>
                    <div class="payment-option">
                        <input type="radio" id="debit-card" name="payment" value="debit">
                        <label for="debit-card">
                            <i class="fas fa-credit-card"></i>
                            <span>Debit Card</span>
                        </label>
                    </div>
                    <div class="payment-option">
                        <input type="radio" id="upi" name="payment" value="upi">
                        <label for="upi">
                            <i class="fas fa-mobile-alt"></i>
                            <span>UPI Payment</span>
                        </label>
                    </div>
                    <div class="payment-option">
                        <input type="radio" id="cod" name="payment" value="cod">
                        <label for="cod">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>Cash on Delivery</span>
                        </label>
                    </div>
                    <div class="payment-option">
                        <input type="radio" id="netbanking" name="payment" value="netbanking">
                        <label for="netbanking">
                            <i class="fas fa-university"></i>
                            <span>Net Banking</span>
                        </label>
                    </div>
                </div>
                
                <div class="checkout-summary">
                    <h4>Order Summary</h4>
                    <div class="summary-items">
                        ${cart.map(item => `
                            <div class="summary-item">
                                <span>${item.name} (${item.amount}x)</span>
                                <span>₹${(item.price * item.amount).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="summary-total">
                        <span>Total:</span>
                        <span>₹${cart.reduce((sum, item) => sum + (item.price * item.amount), 0).toFixed(2)}</span>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary back-to-shipping">Back</button>
                    <button type="button" class="btn btn-primary confirm-payment">Confirm Payment</button>
                </div>
            </div>
        </div>
    `;

    checkoutModal.classList.add('show');

    // Close modal
    checkoutModal.querySelector('.close-checkout').addEventListener('click', () => {
        checkoutModal.classList.remove('show');
    });

    // Proceed to payment
    checkoutModal.querySelector('.proceed-to-payment').addEventListener('click', () => {
        const shippingForm = checkoutModal.querySelector('.shipping-form');
        const paymentForm = checkoutModal.querySelector('.payment-form');
        const shippingStep = checkoutModal.querySelector('.step[data-step="shipping"]');
        const paymentStep = checkoutModal.querySelector('.step[data-step="payment"]');
        
        // Validate form
        let isValid = true;
        shippingForm.querySelectorAll('[required]').forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            shippingForm.classList.remove('active');
            paymentForm.classList.add('active');
            shippingStep.classList.remove('active');
            paymentStep.classList.add('active');
        } else {
            alert('Please fill all required fields');
        }
    });

    // Back to shipping
    checkoutModal.querySelector('.back-to-shipping').addEventListener('click', () => {
        const shippingForm = checkoutModal.querySelector('.shipping-form');
        const paymentForm = checkoutModal.querySelector('.payment-form');
        const shippingStep = checkoutModal.querySelector('.step[data-step="shipping"]');
        const paymentStep = checkoutModal.querySelector('.step[data-step="payment"]');
        
        shippingForm.classList.add('active');
        paymentForm.classList.remove('active');
        shippingStep.classList.add('active');
        paymentStep.classList.remove('active');
    });

    // Confirm payment
    checkoutModal.querySelector('.confirm-payment').addEventListener('click', () => {
        const paymentMethod = checkoutModal.querySelector('input[name="payment"]:checked').value;
        completePurchase(paymentMethod);
    });
}

function completePurchase(paymentMethod) {
    // Get shipping info
    const shippingInfo = {
        name: document.getElementById('full-name').value,
        contact: document.getElementById('contact-number').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        pincode: document.getElementById('pincode').value,
        country: document.getElementById('country').value
    };

    // Here you would typically send the order to your backend
    // For this demo, we'll just show a confirmation
    
    checkoutModal.innerHTML = `
        <div class="checkout-content">
            <div class="payment-success">
                <i class="fas fa-check-circle"></i>
                <h2>Order Confirmed!</h2>
                <div class="order-details">
                    <h4>Order Details</h4>
                    <p><strong>Order ID:</strong> ${'ORD' + Math.floor(Math.random() * 1000000)}</p>
                    <p><strong>Payment Method:</strong> ${getPaymentMethodName(paymentMethod)}</p>
                    <p><strong>Total Amount:</strong> ₹${cart.reduce((sum, item) => sum + (item.price * item.amount), 0).toFixed(2)}</p>
                    
                </div>
                <p>A confirmation has been sent to your email.</p>
                <button class="return-to-shop">Return to Shop</button>
            </div>
        </div>
    `;

    checkoutModal.querySelector('.return-to-shop').addEventListener('click', () => {
        checkoutModal.classList.remove('show');
        cartOverlay.classList.remove('show');
        cart = [];
        updateCart();
    });
}

function getPaymentMethodName(method) {
    const methods = {
        'credit': 'Credit Card',
        'debit': 'Debit Card',
        'upi': 'UPI Payment',
        'cod': 'Cash on Delivery',
        'netbanking': 'Net Banking'
    };
    return methods[method] || method;
}
function completePurchase(paymentMethod) {
    // Get shipping info
    const shippingInfo = {
        name: document.getElementById('full-name').value,
        contact: document.getElementById('contact-number').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        pincode: document.getElementById('pincode').value,
        country: document.getElementById('country').value
    };

    // Generate order ID
    const orderId = 'ORD' + Math.floor(Math.random() * 1000000);
    const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.amount), 0).toFixed(2);
    const orderDate = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    checkoutModal.innerHTML = `
        <div class="checkout-content">
            <div class="payment-success">
                <i class="fas fa-check-circle"></i>
                <h2>Order Confirmed!</h2>
                <div class="order-details">
                    <h4>Order Details</h4>
                    <p><strong>Order ID:</strong> ${orderId}</p>
                    <p><strong>Date:</strong> ${orderDate}</p>
                    <p><strong>Payment Method:</strong> ${getPaymentMethodName(paymentMethod)}</p>
                    <p><strong>Total Amount:</strong> ₹${orderTotal}</p>
                </div>
                
                <div class="order-items">
                    <h4>Order Items</h4>
                    <table class="order-items-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${cart.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.amount}</td>
                                    <td>₹${item.price.toFixed(2)}</td>
                                    <td>₹${(item.price * item.amount).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="confirmation-actions">
                    <button class="download-bill">Download Bill (PDF)</button>
                    <button class="return-to-shop">Return to Shop</button>
                </div>
            </div>
        </div>
    `;

    // Add event listener for PDF download
    checkoutModal.querySelector('.download-bill').addEventListener('click', () => {
        generatePDF(orderId, orderDate, shippingInfo, paymentMethod, orderTotal);
    });

    checkoutModal.querySelector('.return-to-shop').addEventListener('click', () => {
        checkoutModal.classList.remove('show');
        cartOverlay.classList.remove('show');
        cart = [];
        updateCart();
    });
}

function generatePDF(orderId, orderDate, shippingInfo, paymentMethod, orderTotal) {
    // Create new PDF document
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add logo and header
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.setFont('helvetica', 'bold');
    doc.text('FitFuel', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text('Premium Gym Supplements', 105, 27, { align: 'center' });
    
    // Add order info
    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text(`Order #${orderId}`, 14, 40);
    doc.setFontSize(10);
    doc.text(`Date: ${orderDate}`, 14, 47);
    doc.text(`Payment Method: ${getPaymentMethodName(paymentMethod)}`, 14, 54);
    
    // Add shipping info
    doc.text(`Shipping To:`, 14, 64);
    doc.text(`${shippingInfo.name}`, 14, 71);
    doc.text(`${shippingInfo.address}`, 14, 78);
    doc.text(`${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`, 14, 85);
    doc.text(`${shippingInfo.country}`, 14, 92);
    doc.text(`Contact: ${shippingInfo.contact}`, 14, 99);
    doc.text(`Email: ${shippingInfo.email}`, 14, 106);
    
    // Add order items table
    doc.autoTable({
        startY: 120,
        head: [['Item', 'Qty', 'Price', 'Total']],
        body: cart.map(item => [
            item.name,
            item.amount,
            `₹${item.price.toFixed(2)}`,
            `₹${(item.price * item.amount).toFixed(2)}`
        ]),
        headStyles: {
            fillColor: [255, 107, 107],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245]
        },
        styles: {
            cellPadding: 5,
            fontSize: 10,
            valign: 'middle'
        },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 20 },
            2: { cellWidth: 30 },
            3: { cellWidth: 30 }
        }
    });
    
    // Add total
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: ₹${orderTotal}`, 160, doc.lastAutoTable.finalY + 20);
    
    // Add footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text('Thank you for your purchase!', 105, doc.lastAutoTable.finalY + 30, { align: 'center' });
    doc.text('CoreMatrix', 105, doc.lastAutoTable.finalY + 35, { align: 'center' });
    
    // Save the PDF
    doc.save(`CoreMatrix_Order_${orderId}.pdf`);
}
}


// Run initialization
init();