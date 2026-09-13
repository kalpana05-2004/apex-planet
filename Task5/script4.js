/* =================================
   PRODUCT DATA
================================= */

const products = [

    {
        id: 1,
        name: "Smart Laptop",
        category: "electronics",
        price: 59999,
        rating: 5,
        icon: "💻"
    },

    {
        id: 2,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2999,
        rating: 4,
        icon: "🎧"
    },

    {
        id: 3,
        name: "Smart Watch",
        category: "accessories",
        price: 4499,
        rating: 5,
        icon: "⌚"
    },

    {
        id: 4,
        name: "Running Shoes",
        category: "fashion",
        price: 2499,
        rating: 4,
        icon: "👟"
    },

    {
        id: 5,
        name: "Casual T-Shirt",
        category: "fashion",
        price: 799,
        rating: 4,
        icon: "👕"
    },

    {
        id: 6,
        name: "Backpack",
        category: "fashion",
        price: 1299,
        rating: 5,
        icon: "🎒"
    },

    {
        id: 7,
        name: "Table Lamp",
        category: "home",
        price: 999,
        rating: 4,
        icon: "💡"
    },

    {
        id: 8,
        name: "Coffee Maker",
        category: "home",
        price: 3499,
        rating: 5,
        icon: "☕"
    },

    {
        id: 9,
        name: "Mobile Phone",
        category: "electronics",
        price: 24999,
        rating: 5,
        icon: "📱"
    },

    {
        id: 10,
        name: "Sunglasses",
        category: "accessories",
        price: 1499,
        rating: 4,
        icon: "🕶️"
    },

    {
        id: 11,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 1999,
        rating: 4,
        icon: "🔊"
    },

    {
        id: 12,
        name: "Wall Clock",
        category: "home",
        price: 899,
        rating: 4,
        icon: "🕐"
    }

];


/* =================================
   CART
================================= */

let cart = [];


/* =================================
   DISPLAY PRODUCTS
================================= */

function displayProducts(productList = products) {

    const productGrid =
        document.getElementById("productGrid");

    const noProducts =
        document.getElementById("noProducts");

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        noProducts.style.display = "block";

        return;
    }

    noProducts.style.display = "none";


    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">
                    ${getStars(product.rating)}
                </div>

                <div class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>

        `;

        productGrid.appendChild(card);

    });

}


/* =================================
   STAR RATING
================================= */

function getStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        stars +=
            i <= rating ? "★" : "☆";

    }

    return stars;
}


/* =================================
   FILTER PRODUCTS
================================= */

function filterProducts(category) {

    if (category === "all") {

        displayProducts(products);

        return;
    }

    const filtered =
        products.filter(
            product => product.category === category
        );

    displayProducts(filtered);

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =================================
   SEARCH
================================= */

function searchProducts() {

    const searchInput =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    const filtered =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(searchInput)

            ||

            product.category
                .toLowerCase()
                .includes(searchInput)

        );

    displayProducts(filtered);
}


/* =================================
   SORT PRODUCTS
================================= */

function sortProducts() {

    const option =
        document.getElementById("sortProducts").value;

    let sorted = [...products];


    if (option === "low") {

        sorted.sort(
            (a, b) => a.price - b.price
        );

    }


    if (option === "high") {

        sorted.sort(
            (a, b) => b.price - a.price
        );

    }


    if (option === "rating") {

        sorted.sort(
            (a, b) => b.rating - a.rating
        );

    }


    displayProducts(sorted);
}


/* =================================
   ADD TO CART
================================= */

function addToCart(productId) {

    const product =
        products.find(
            p => p.id === productId
        );

    if (!product) {
        return;
    }


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    showToast(
        `${product.name} added to cart!`
    );
}


/* =================================
   UPDATE CART
================================= */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent =
        totalQuantity;


    const cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="
                text-align:center;
                padding:40px;
                color:#78909c;
            ">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">
                ${item.icon}
            </div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                    × ${item.quantity}
                </p>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})">

                    Remove

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    calculateTotal();
}


/* =================================
   REMOVE CART ITEM
================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );

    updateCart();

    showToast("Product removed from cart.");
}


/* =================================
   CALCULATE TOTAL
================================= */

function calculateTotal() {

    const total =
        cart.reduce(

            (sum, item) =>

                sum +
                item.price *
                item.quantity,

            0
        );


    document.getElementById(
        "cartTotal"
    ).textContent =
        "₹" + total.toLocaleString("en-IN");
}


/* =================================
   OPEN CART
================================= */

function openCart() {

    document
        .getElementById("cartModal")
        .classList.add("active");

    updateCart();
}


/* =================================
   CLOSE CART
================================= */

function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("active");
}


/* =================================
   MOBILE MENU
================================= */

function toggleMenu() {

    document
        .getElementById("navLinks")
        .classList.toggle("active");
}


/* =================================
   SEARCH BOX
================================= */

function toggleSearch() {

    document
        .getElementById("searchBox")
        .classList.toggle("active");

    document
        .getElementById("searchInput")
        .focus();
}


/* =================================
   TOAST
================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* =================================
   COPY COUPON
================================= */

function copyCoupon() {

    navigator.clipboard
        .writeText("WELCOME20")
        .then(() => {

            showToast(
                "Coupon WELCOME20 copied!"
            );

        })
        .catch(() => {

            showToast(
                "Coupon: WELCOME20"
            );

        });
}


/* =================================
   CONTACT FORM
================================= */

function submitContact(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    showToast(
        `Thank you ${name}! Your message was sent.`
    );

    document
        .getElementById("contactForm")
        .reset();
}


/* =================================
   CHECKOUT
================================= */

function checkout() {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty!"
        );

        return;
    }


    const total =
        cart.reduce(

            (sum, item) =>
                sum +
                item.price *
                item.quantity,

            0
        );


    alert(
        "Order placed successfully!\n\n" +
        "Total Amount: ₹" +
        total.toLocaleString("en-IN")
    );


    cart = [];

    updateCart();

    closeCart();
}


/* =================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
================================= */

document
    .getElementById("cartModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeCart();

            }

        }
    );


/* =================================
   INITIAL LOAD
================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayProducts();

        updateCart();

    }
);