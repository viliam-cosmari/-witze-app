import "./styles/main.scss";
import { fetchJoke } from "./fetching.js";

const currentJokeEl = document.querySelector(".current-joke__text");
const loadNewJokeBtn = document.querySelector(".current-joke__generate");

async function loadNewJoke() {
  const joke = await fetchJoke();

  currentJokeEl.innerText = joke;
}

loadNewJokeBtn.addEventListener("click", loadNewJoke);

loadNewJoke();
