import "./styles/main.scss";
import { fetchJoke, fetchCategory } from "./fetching.js";

const currentJokeEl = document.querySelector(".current-joke__text");
const loadNewJokeBtn = document.querySelector(".current-joke__generate");
const saveJokeBtn = document.querySelector(".current-joke__save");
const savedJokeListEl = document.querySelector(".saved-joke__list");
const savedJokeTemplate = document.querySelector("#saved-joke-template");
const categoryEl = document.querySelector(".current-joke__category");
const themeSwitchEl = document.querySelector(".theme-switch__input");

let currentJoke = "";
let savedJokes = JSON.parse(localStorage.getItem("savedJokes")) ?? [];

async function loadNewJoke() {
  try {
    const joke = await fetchJoke(categoryEl.value);

    if (!joke) {
      currentJokeEl.innerText = "Kein Witz gefunden";
      currentJoke = "";
    } else {
      currentJokeEl.innerText = joke;
      currentJoke = joke;
    }
  } catch (error) {
    console.error(error);
    currentJokeEl.innerText = "Witz konnte nicht geladen werden";
    currentJoke = "";
  }
}

async function loadCategories() {
  try {
    const categories = await fetchCategory();
    categories.forEach((category) => {
      const optionEl = document.createElement("option");
      const label = category.name[0].toUpperCase() + category.name.slice(1);
      optionEl.textContent = label;
      optionEl.value = category.name;
      categoryEl.append(optionEl);
    });
  } catch (error) {
    console.error(error);
  }
}

themeSwitchEl.addEventListener("change", () => {
  document.body.classList.toggle("light", themeSwitchEl.checked);
});

loadNewJokeBtn.addEventListener("click", loadNewJoke);
categoryEl.addEventListener("change", loadNewJoke);

function saveStorage() {
  localStorage.setItem("savedJokes", JSON.stringify(savedJokes));
}

function renderSavedJokes() {
  savedJokeListEl.replaceChildren();

  savedJokes.forEach((joke) => {
    const jokeItem = savedJokeTemplate.content.cloneNode(true);
    jokeItem.querySelector(".saved-joke__text").textContent = joke;

    const removeBtn = jokeItem.querySelector(".saved-joke__remove");

    removeBtn.addEventListener("click", () => {
      savedJokes = savedJokes.filter((savedJoke) => savedJoke !== joke);
      saveStorage();
      renderSavedJokes();
    });
    savedJokeListEl.append(jokeItem);
  });
}

saveJokeBtn.addEventListener("click", () => {
  if (currentJoke && !savedJokes.includes(currentJoke)) {
    savedJokes.push(currentJoke);
    saveStorage();
    renderSavedJokes();
  }
});
renderSavedJokes();
loadNewJoke();
loadCategories();
