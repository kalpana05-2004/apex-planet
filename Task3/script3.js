/* =====================================
   MOBILE MENU
===================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


/* Close mobile menu */

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


/* =====================================
   TODO LIST
===================================== */

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];


const todoInput =
    document.getElementById("todoInput");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const todoList =
    document.getElementById("todoList");

const clearTasksBtn =
    document.getElementById("clearTasksBtn");


/* Save tasks */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


/* Display tasks */

function displayTasks() {

    todoList.innerHTML = "";


    tasks.forEach(function (task, index) {

        const li =
            document.createElement("li");

        li.className = "todo-item";


        /* Checkbox */

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked =
            task.completed;


        checkbox.addEventListener(
            "change",
            function () {

                tasks[index].completed =
                    checkbox.checked;

                saveTasks();

                displayTasks();

            }
        );


        /* Task text */

        const span =
            document.createElement("span");

        span.className = "todo-text";

        span.textContent =
            task.text;


        if (task.completed) {

            span.classList.add("completed");

        }


        /* Delete button */

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "Delete";

        deleteButton.className =
            "delete-btn";


        deleteButton.addEventListener(
            "click",
            function () {

                deleteTask(index);

            }
        );


        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteButton);

        todoList.appendChild(li);

    });

}


/* Add task */

function addTask() {

    const text =
        todoInput.value.trim();


    if (text === "") {

        alert("Please enter a task.");

        return;

    }


    tasks.push({

        text: text,

        completed: false

    });


    saveTasks();

    displayTasks();


    todoInput.value = "";

    todoInput.focus();

}


/* Delete task */

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();

}


/* Clear all */

function clearTasks() {

    if (tasks.length === 0) {

        alert("No tasks available.");

        return;

    }


    if (
        confirm(
            "Are you sure you want to delete all tasks?"
        )
    ) {

        tasks = [];

        saveTasks();

        displayTasks();

    }

}


/* Add button */

addTaskBtn.addEventListener(
    "click",
    addTask
);


/* Enter key */

todoInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


/* Clear button */

clearTasksBtn.addEventListener(
    "click",
    clearTasks
);


/* =====================================
   PRODUCT DATA
===================================== */

const products = [

    {
        name: "Wireless Headphones",
        category: "Electronics",
        price: 799,
        rating: 4.5,
        icon: "🎧"
    },

    {
        name: "Smart Watch",
        category: "Electronics",
        price: 1299,
        rating: 4.7,
        icon: "⌚"
    },

    {
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 599,
        rating: 4.2,
        icon: "🔊"
    },

    {
        name: "Cotton T-Shirt",
        category: "Clothing",
        price: 399,
        rating: 4.1,
        icon: "👕"
    },

    {
        name: "Denim Jacket",
        category: "Clothing",
        price: 899,
        rating: 4.6,
        icon: "🧥"
    },

    {
        name: "Running Shoes",
        category: "Clothing",
        price: 1499,
        rating: 4.8,
        icon: "👟"
    },

    {
        name: "Java Programming Book",
        category: "Books",
        price: 450,
        rating: 4.7,
        icon: "📘"
    },

    {
        name: "Machine Learning Book",
        category: "Books",
        price: 699,
        rating: 4.9,
        icon: "📚"
    },

    {
        name: "Notebook",
        category: "Books",
        price: 40,
        rating: 4.0,
        icon: "📓"
    },

    {
        name: "Leather Wallet",
        category: "Accessories",
        price: 299,
        rating: 4.3,
        icon: "👛"
    },

    {
        name: "Sunglasses",
        category: "Accessories",
        price: 199,
        rating: 4.1,
        icon: "🕶️"
    },

    {
        name: "Backpack",
        category: "Accessories",
        price: 599,
        rating: 4.6,
        icon: "🎒"
    }

];


/* =====================================
   PRODUCT ELEMENTS
===================================== */

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const priceFilter =
    document.getElementById("priceFilter");

const sortFilter =
    document.getElementById("sortFilter");

const productGrid =
    document.getElementById("productGrid");


/* =====================================
   DISPLAY PRODUCTS
===================================== */

function displayProducts() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const category =
        categoryFilter.value;

    const price =
        priceFilter.value;

    const sort =
        sortFilter.value;


    /* Filter */

    let filteredProducts =
        products.filter(function (product) {

            const searchMatch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const categoryMatch =
                category === "all" ||
                product.category === category;


            let priceMatch = true;


            if (price === "0-50") {

                priceMatch =
                    product.price < 50;

            }

            else if (price === "50-100") {

                priceMatch =
                    product.price >= 50 &&
                    product.price <= 100;

            }

            else if (price === "100-500") {

                priceMatch =
                    product.price > 100 &&
                    product.price <= 500;

            }

            else if (price === "500") {

                priceMatch =
                    product.price > 500;

            }


            return (
                searchMatch &&
                categoryMatch &&
                priceMatch
            );

        });


    /* =================================
       SORTING
    ================================= */

    if (sort === "priceLow") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }

    else if (sort === "priceHigh") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }

    else if (sort === "ratingHigh") {

        filteredProducts.sort(
            (a, b) => b.rating - a.rating
        );

    }

    else if (sort === "name") {

        filteredProducts.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    /* =================================
       SHOW PRODUCTS
    ================================= */

    productGrid.innerHTML = "";


    if (filteredProducts.length === 0) {

        productGrid.innerHTML = `

            <div class="no-products">

                <h3>No Products Found</h3>

                <p>
                    Try another search or filter.
                </p>

            </div>

        `;

        return;

    }


    filteredProducts.forEach(
        function (product) {

            const card =
                document.createElement("div");

            card.className =
                "product-card";


            card.innerHTML = `

                <div class="product-image">
                    ${product.icon}
                </div>

                <div class="product-details">

                    <span class="category">
                        ${product.category}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="price">
                        ₹${product.price}
                    </div>

                    <div class="rating">
                        ⭐ ${product.rating}/5
                    </div>

                </div>

            `;


            productGrid.appendChild(card);

        }
    );

}


/* Product events */

searchInput.addEventListener(
    "input",
    displayProducts
);

categoryFilter.addEventListener(
    "change",
    displayProducts
);

priceFilter.addEventListener(
    "change",
    displayProducts
);

sortFilter.addEventListener(
    "change",
    displayProducts
);


/* =====================================
   CONTACT FORM
===================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;


        alert(
            "Thank you, " +
            name +
            "! Your message has been submitted."
        );


        contactForm.reset();

    }
);


/* =====================================
   INITIALIZE
===================================== */

displayTasks();

displayProducts();