let themeButton = document.getElementById("theme-button");

const toggleLightMode = () => {
  document.body.classList.toggle("light-mode");
};

themeButton.addEventListener("click", toggleLightMode);

let signButton = document.getElementById("sign-now-button");

let count = 3;
const addSignature = (person) => {
  const signature = document.createElement("p");
  signature.textContent = `️🖊️ ${person.name} from ${person.hometown} supports this.`;
  const signatures = document.querySelector(".signatures");
  signatures.appendChild(signature);

  count++;
  document.getElementById("counter").textContent =
    "🖊️ " + count + " people have signed this petition and support this cause.";
  signatures.appendChild(document.querySelector("#counter"));
};

const validateForm = () => {
  let containsErrors = false;

  var petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value,
  };
  // TODO: Loop through all inputs
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add("error");
    } else {
      petitionInputs[i].classList.remove("error");
    }
  }

  if (containsErrors == false) {
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
};

signButton.addEventListener("click", validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: "2s",
  transitionProperty: "all",
  transitionTimingFunction: "ease",
};

const revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer =
      revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add("active");
    } else {
      revealableContainers[i].classList.remove("active");
    }
  }
};

window.addEventListener("scroll", reveal);

let scaleFactor = 1;
let modalImage = document.getElementById("modal-image");

let scaleImage = () => {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
};

const toggleModal = (person) => {
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");
  modal.style.display = "flex";
  modalContent.textContent = `️ Thank you, ${person.name}, for  supporting our goal of becoming a greener California!`;
  var intervalId = setInterval(scaleImage, 500);
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000);
};
