import "./styles/main.scss";
import { fetchJoke } from "./fetching.js";

const currentJokeEl = document.querySelector(".current-joke__text");
const loadNewJokeBtn = document.querySelector(".current-joke__generate");
const saveJokeBtn = document.querySelector(".current-joke__save");
const savedJokeListEl = document.querySelector(".saved-joke__list");
const savedJokeTemplate = document.querySelector("#saved-joke-template");

let currentJoke = "";
let savedJokes = JSON.parse(localStorage.getItem("savedJokes")) ?? [];

async function loadNewJoke() {
  const joke = await fetchJoke();

  currentJokeEl.innerText = joke;
  currentJoke = joke;
}

loadNewJokeBtn.addEventListener("click", loadNewJoke);

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
  if (!savedJokes.includes(currentJoke)) {
    savedJokes.push(currentJoke);
    saveStorage();
    renderSavedJokes();
  }
});
renderSavedJokes();
loadNewJoke();
