/* ==========================================
   MOBILE NAVIGATION
========================================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


/* Close menu after clicking a link */

document.querySelectorAll(".nav-menu a").forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});


/* ==========================================
   INTERACTIVE QUIZ
========================================== */

const questions = [

    {
        question: "What does HTML stand for?",

        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],

        correct: 0
    },


    {
        question: "Which language is used to style a webpage?",

        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],

        correct: 1
    },


    {
        question: "Which language is mainly used to make webpages interactive?",

        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        correct: 2
    },


    {
        question: "Which keyword can be used to declare a JavaScript variable?",

        answers: [
            "var",
            "define",
            "variable",
            "declare"
        ],

        correct: 0
    },


    {
        question: "Which JavaScript function is used to request data from an API?",

        answers: [
            "request()",
            "fetch()",
            "getAPI()",
            "data()"
        ],

        correct: 1
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const nextButton =
    document.getElementById("nextButton");

const questionNumber =
    document.getElementById("questionNumber");

const scoreElement =
    document.getElementById("score");

const progressBar =
    document.getElementById("progressBar");

const quizResult =
    document.getElementById("quizResult");


function loadQuestion() {

    answered = false;

    const current = questions[currentQuestion];


    questionElement.textContent =
        current.question;


    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;


    scoreElement.textContent =
        `Score: ${score}`;


    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    answersElement.innerHTML = "";


    current.answers.forEach(function (answer, index) {

        const button =
            document.createElement("button");


        button.className = "answer";

        button.textContent = answer;


        button.addEventListener("click", function () {

            checkAnswer(index, button);

        });


        answersElement.appendChild(button);

    });

}


function checkAnswer(selectedIndex, selectedButton) {

    if (answered) {
        return;
    }


    answered = true;


    const correctIndex =
        questions[currentQuestion].correct;


    const allAnswers =
        document.querySelectorAll(".answer");


    if (selectedIndex === correctIndex) {

        selectedButton.classList.add("correct");

        score++;

        scoreElement.textContent =
            `Score: ${score}`;

    }

    else {

        selectedButton.classList.add("wrong");

        allAnswers[correctIndex]
            .classList.add("correct");

    }

}


nextButton.addEventListener("click", function () {

    if (!answered) {

        alert("Please select an answer first.");

        return;
    }


    currentQuestion++;


    if (currentQuestion < questions.length) {

        loadQuestion();

    }

    else {

        showQuizResult();

    }

});


function showQuizResult() {

    questionElement.textContent =
        "🎉 Quiz Completed!";


    answersElement.innerHTML = "";


    nextButton.style.display =
        "none";


    progressBar.style.width =
        "100%";


    quizResult.innerHTML = `
        You scored <strong>${score}</strong>
        out of <strong>${questions.length}</strong>.
        <br><br>
        ${getResultMessage()}
    `;

}


function getResultMessage() {

    if (score === 5) {

        return "🏆 Excellent!";

    }

    if (score >= 3) {

        return "👏 Good Job!";

    }

    return "📚 Keep Learning!";

}


loadQuestion();


/* ==========================================
   IMAGE CAROUSEL
========================================== */

const carouselImages = [

    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",

    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85",

    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85",

    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=85"

];


let currentImage = 0;


const carouselImage =
    document.getElementById("carouselImage");

const carouselDots =
    document.getElementById("carouselDots");


/* Create dots automatically */

carouselImages.forEach(function (_, index) {

    const dot =
        document.createElement("button");


    dot.className = "carousel-dot";


    if (index === 0) {

        dot.classList.add("active");

    }


    dot.addEventListener("click", function () {

        showImage(index);

    });


    carouselDots.appendChild(dot);

});


function showImage(index) {

    currentImage = index;


    carouselImage.style.opacity = "0";


    setTimeout(function () {

        carouselImage.src =
            carouselImages[currentImage];

        carouselImage.style.opacity = "1";

    }, 150);


    document
        .querySelectorAll(".carousel-dot")
        .forEach(function (dot, dotIndex) {

            dot.classList.toggle(
                "active",
                dotIndex === currentImage
            );

        });

}


/* Next Image */

document
    .getElementById("nextImageButton")
    .addEventListener("click", function () {

        currentImage++;

        if (currentImage >= carouselImages.length) {

            currentImage = 0;

        }

        showImage(currentImage);

    });


/* Previous Image */

document
    .getElementById("previousButton")
    .addEventListener("click", function () {

        currentImage--;

        if (currentImage < 0) {

            currentImage =
                carouselImages.length - 1;

        }

        showImage(currentImage);

    });


/* Automatic image change every 4 seconds */

setInterval(function () {

    currentImage++;

    if (currentImage >= carouselImages.length) {

        currentImage = 0;

    }

    showImage(currentImage);

}, 4000);


/* ==========================================
   WEATHER API
   Open-Meteo Public API
========================================== */

const cityInput =
    document.getElementById("cityInput");

const weatherButton =
    document.getElementById("weatherButton");

const weatherResult =
    document.getElementById("weatherResult");


weatherButton.addEventListener(
    "click",
    getWeather
);


/* Press Enter to search */

cityInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            getWeather();

        }

    }
);


async function getWeather() {

    const city =
        cityInput.value.trim();


    if (city === "") {

        weatherResult.innerHTML = `
            <div class="error">
                Please enter a city name.
            </div>
        `;

        return;

    }


    weatherResult.innerHTML = `
        <div>
            <div class="weather-icon">⏳</div>
            <p>Loading weather information...</p>
        </div>
    `;


    try {

        /*
         * STEP 1:
         * Find latitude and longitude
         * using city name.
         */

        const geoURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;


        const geoResponse =
            await fetch(geoURL);


        if (!geoResponse.ok) {

            throw new Error(
                "Unable to connect to location service."
            );

        }


        const geoData =
            await geoResponse.json();


        if (
            !geoData.results ||
            geoData.results.length === 0
        ) {

            throw new Error(
                "City not found."
            );

        }


        const location =
            geoData.results[0];


        /*
         * STEP 2:
         * Get weather information
         */

        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;


        const weatherResponse =
            await fetch(weatherURL);


        if (!weatherResponse.ok) {

            throw new Error(
                "Weather service unavailable."
            );

        }


        const weatherData =
            await weatherResponse.json();


        const current =
            weatherData.current;


        const weatherText =
            getWeatherDescription(
                current.weather_code
            );


        /*
         * STEP 3:
         * Display data dynamically
         */

        weatherResult.innerHTML = `

            <div class="weather-card">

                <div class="weather-icon">
                    ${getWeatherIcon(current.weather_code)}
                </div>

                <h3>
                    ${location.name},
                    ${location.country}
                </h3>

                <div class="temperature">
                    ${current.temperature_2m}°C
                </div>

                <p>
                    ${weatherText}
                </p>

                <div class="weather-details">

                    <span>
                        💧 Humidity:
                        ${current.relative_humidity_2m}%
                    </span>

                    <span>
                        💨 Wind:
                        ${current.wind_speed_10m} km/h
                    </span>

                </div>

            </div>

        `;

    }

    catch (error) {

        weatherResult.innerHTML = `

            <div class="error">

                ❌ ${error.message}

                <br><br>

                Please check the city name
                and try again.

            </div>

        `;

        console.error(error);

    }

}


/* ==========================================
   WEATHER DESCRIPTION
========================================== */

function getWeatherDescription(code) {

    if (code === 0) {

        return "Clear Sky";

    }

    if (code >= 1 && code <= 3) {

        return "Partly Cloudy";

    }

    if (code >= 45 && code <= 48) {

        return "Foggy";

    }

    if (code >= 51 && code <= 57) {

        return "Drizzle";

    }

    if (code >= 61 && code <= 67) {

        return "Rainy";

    }

    if (code >= 71 && code <= 77) {

        return "Snow";

    }

    if (code >= 80 && code <= 82) {

        return "Rain Showers";

    }

    if (code >= 95) {

        return "Thunderstorm";

    }

    return "Current Weather";

}


/* ==========================================
   WEATHER ICON
========================================== */

function getWeatherIcon(code) {

    if (code === 0) {

        return "☀️";

    }

    if (code >= 1 && code <= 3) {

        return "⛅";

    }

    if (code >= 45 && code <= 48) {

        return "🌫️";

    }

    if (code >= 51 && code <= 57) {

        return "🌦️";

    }

    if (code >= 61 && code <= 67) {

        return "🌧️";

    }

    if (code >= 71 && code <= 77) {

        return "❄️";

    }

    if (code >= 80 && code <= 82) {

        return "🌦️";

    }

    if (code >= 95) {

        return "⛈️";

    }

    return "🌤️";

}