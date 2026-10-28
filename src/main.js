import "./styles/main.scss";
import { fetchJoke } from "./fetching.js";

const currentJokeEl = document.querySelector(".current-joke__text");
const loadNewJokeBtn = document.querySelector(".current-joke__generate");
const saveJokeBtn = document.querySelector(".current-joke__save");
const savedJokeListEl = document.querySelector(".saved-joke__list");
const savedJokeTemplate = document.querySelector("#saved-joke-template");

let currentJoke = "";
let savedJokes = [];

async function loadNewJoke() {
  const joke = await fetchJoke();

  currentJokeEl.innerText = joke;
  currentJoke = joke;
}

loadNewJokeBtn.addEventListener("click", loadNewJoke);

function renderSavedJokes() {
  savedJokeListEl.replaceChildren();

  savedJokes.forEach((joke) => {
    const jokeItem = savedJokeTemplate.content.cloneNode(true);
    jokeItem.querySelector(".saved-joke__text").textContent = joke;

    const removeBtn = jokeItem.querySelector(".saved-joke__remove");

    removeBtn.addEventListener("click", () => {
      savedJokes = savedJokes.filter((savedJoke) => savedJoke !== joke);
      renderSavedJokes();
    });
    savedJokeListEl.append(jokeItem);
  });
}

saveJokeBtn.addEventListener("click", () => {
  if (!savedJokes.includes(currentJoke)) {
    savedJokes.push(currentJoke);
    renderSavedJokes();
  }
});

loadNewJoke();
