const steps = document.querySelectorAll(".step");
const lines = document.querySelectorAll(".line");

setTimeout(() => {

    steps[1].classList.add("active");
    lines[0].classList.add("active");

},2000);

setTimeout(() => {

    steps[2].classList.add("active");
    lines[1].classList.add("active");

},5000);

setTimeout(() => {

    steps[3].classList.add("active");
    lines[2].classList.add("active");

},8000);