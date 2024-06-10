import { displayCards } from "./js/dom-manip";
import { updateBarChart, updateDonutChart } from './js/dom-manip.js';
import sampleMovies from "../movie-data.json"

const main = () => {
  displayCards();
  updateBarChart(sampleMovies);
  updateDonutChart(sampleMovies);
  updateRadarChart(sampleMovies);
};

main();
