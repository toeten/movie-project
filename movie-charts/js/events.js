import { createCard, displayCards, updateBarChart, updateDonutChart } from "./dom-manip";
import sampleMovies from "../movie-data.json";

document.addEventListener('DOMContentLoaded', () => {
  displayCards();

  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const movie = {
      title: form.querySelector('input[name="title"]').value,
      criticScore: parseInt(form.querySelector('input[name="criticScore"]').value, 10),
      audienceScore: parseInt(form.querySelector('input[name="audienceScore"]').value, 10),
      domestic: parseInt(form.querySelector('input[name="domesticGross"]').value, 10),
      genre: form.querySelector('select[name="genre"]').value
    };
    addMovie(movie);
  });
});

const addMovie = (movie) => {
  sampleMovies.unshift(movie);
  const cardContainer = document.getElementById('card-container');
  const card = createCard(movie);
  cardContainer.appendChild(card);
  updateBarChart(sampleMovies);
  updateDonutChart(sampleMovies);
  updateRadarChart(sampleMovies);
};