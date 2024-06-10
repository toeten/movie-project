import sampleMovies from "../../movie-data.json";
import { Chart } from 'chart.js/auto';

export const createCard = (movie) => {
  // Create card container
  const card = document.createElement('div');
  card.classList.add('card', 'border', 'border-gray-300', 'rounded-md', 'p-4', 'mb-4', 'w-64', 'h-64', 'flex', 'flex-col', 'justify-between');

  // Title
  const title = document.createElement('h3');
  title.textContent = movie.title;
  title.classList.add('text-xl', 'font-semibold', 'mb-2');
  card.appendChild(title);

  // Genre
  const genre = document.createElement('p');
  genre.textContent = `Genre: ${movie.genre}`;
  genre.classList.add('text-sm', 'text-gray-700', 'mb-1');
  card.appendChild(genre);

  // Critic Score
  const critic = document.createElement('p');
  critic.textContent = `Critic Score: ${movie.criticScore}`;
  critic.classList.add('text-sm', 'text-gray-700', 'mb-1');
  card.appendChild(critic);

  // Audience Score
  const audience = document.createElement('p');
  audience.textContent = `Audience Score: ${movie.audienceScore}`;
  audience.classList.add('text-sm', 'text-gray-700', 'mb-1');
  card.appendChild(audience);

  // Domestic Gross
  const domesticGross = document.createElement('p');
  domesticGross.textContent = `Domestic Gross: $${movie.domestic.toLocaleString()}`;
  domesticGross.classList.add('text-sm', 'text-gray-700', 'mb-1');
  card.appendChild(domesticGross);

  return card;
};

export const displayCards = () => {
  const container = document.getElementById('card-container');
  container.classList.add('flex', 'flex-wrap', 'justify-end', 'space-x-4', 'p-4');

  sampleMovies.forEach(movie => {
    const card = createCard(movie);
    container.appendChild(card);
  });

  createBarChart(sampleMovies);
  createDonutChart(sampleMovies);
  createRadarChart(sampleMovies);
};

let barChart, donutChart, radarChart;

const createBarChart = (movies) => {
  const canvas = document.getElementById('bar-chart');
  const ctx = canvas.getContext('2d');

  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: movies.map(movie => movie.title),
      datasets: [
        {
          label: 'Critic Score',
          data: movies.map(movie => movie.criticScore),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Audience Score',
          data: movies.map(movie => movie.audienceScore),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};

const createDonutChart = (movies) => {
  const canvas = document.getElementById('donut-chart');
  const ctx = canvas.getContext('2d');

  const genreDistribution = movies.reduce((acc, movie) => {
    const genre = movie.genre;
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(genreDistribution),
      datasets: [
        {
          label: 'Genre Distribution',
          data: Object.values(genreDistribution),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    }
  });
};
const createRadarChart = (movies) => {
  const canvas = document.getElementById('radar-chart');
  const ctx = canvas.getContext('2d');

  const genres = [...new Set(movies.map(movie => movie.genre))];
  const genreData = genres.map(genre => {
    const genreMovies = movies.filter(movie => movie.genre === genre);
    const totalGross = genreMovies.reduce((sum, movie) => sum + movie.domestic, 0);
    return totalGross / genreMovies.length;
  });

  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: genres,
      datasets: [
        {
          label: 'Average Domestic Gross',
          data: genreData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: Math.max(...genreData),
          pointLabels: {
            font: {
              size: 12
            }
          },
          ticks: {
            backdropColor: 'rgba(255, 255, 255, 0.75)',
            display: true,
            z: 1
          }
        }
      },
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  });
};



export const updateBarChart = (movies) => {
  barChart.data.labels = movies.map(movie => movie.title);
  barChart.data.datasets[0].data = movies.map(movie => movie.criticScore);
  barChart.data.datasets[1].data = movies.map(movie => movie.audienceScore);
  barChart.update();
};

export const updateDonutChart = (movies) => {
  const genreDistribution = movies.reduce((acc, movie) => {
    const genre = movie.genre;
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  donutChart.data.labels = Object.keys(genreDistribution);
  donutChart.data.datasets[0].data = Object.values(genreDistribution);
  donutChart.update();
};

export const updateRadarChart = (movies) => {
  const genres = [...new Set(movies.map(movie => movie.genre))];
  const genreData = genres.map(genre => {
    return movies
      .filter(movie => movie.genre === genre)
      .reduce((sum, movie) => sum + movie.domestic, 0);
  });

  radarChart.data.labels = genres;
  radarChart.data.datasets[0].data = genreData;
  radarChart.update();
};
