document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("contactForm").addEventListener("submit", function (e) {

        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();

        let error = document.getElementById("error");

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name === "") {
            error.style.color = "red";
            error.textContent = "Please enter your name.";
            return;
        }

        if (!emailPattern.test(email)) {
            error.style.color = "red";
            error.textContent = "Please enter a valid email.";
            return;
        }

        if (message === "") {
            error.style.color = "red";
            error.textContent = "Please enter your message.";
            return;
        }

        error.style.color = "green";
        error.textContent = "Form submitted successfully!";

        document.getElementById("contactForm").reset();
    });

});

function addTask() {

    let input = document.getElementById("taskInput");

    if (input.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    let li = document.createElement("li");
    li.textContent = input.value;

    let btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = function () {
        li.remove();
    };

    li.appendChild(btn);
    document.getElementById("taskList").appendChild(li);

    input.value = "";
}