import "./styles/main.scss";
import { fetchJoke } from "./fetching.js";

const currentJokeEl = document.querySelector(".current-joke__text");
const loadNewJokeBtn = document.querySelector(".current-joke__generate");
const saveJokeBtn = document.querySelector(".current-joke__save");

let currentJoke = "";
let savedJokes = [];

async function loadNewJoke() {
  const joke = await fetchJoke();

  currentJokeEl.innerText = joke;
  currentJoke = joke;
}

loadNewJokeBtn.addEventListener("click", loadNewJoke);

saveJokeBtn.addEventListener("click", () => {
  if (!savedJokes.includes(currentJoke)) {
    savedJokes.push(currentJoke);
    console.log(savedJokes);
  }
});

loadNewJoke();
