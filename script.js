let currentPage = 1;
const articlesPerPage = 6;

async function fetchNews(query, page) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&from=2024-03-01&to=2024-03-01&sortBy=popularity&apiKey=21a6b37a8ea1463da6ce7863a4d9a374&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function displayNews(query, page) {
  const newsList = document.getElementById("newsList");
  newsList.innerHTML = "";

  const articles = await fetchNews(query, page);
  articles.forEach((article) => {
    const articleCard = `
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="${article.urlToImage}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.description}</p>
          <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
  `;
    newsList.innerHTML += articleCard;
  });

  // Enable/disable pagination buttons
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled =
    articles.length < articlesPerPage;
}

document.getElementById("prevPage").addEventListener("click", () => {
  currentPage--;
  const searchInput = document.getElementById("searchInput").value;
  displayNews(searchInput, currentPage);
});

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  const searchInput = document.getElementById("searchInput").value;
  displayNews(searchInput, currentPage);
});

document.getElementById("searchButton").addEventListener("click", () => {
  currentPage = 1; // Reset page number when performing a new search
  const searchInput = document.getElementById("searchInput").value;
  displayNews(searchInput, currentPage);
});

document.getElementById("searchInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    currentPage = 1; // Reset page number when performing a new search
    const searchInput = document.getElementById("searchInput").value;
    displayNews(searchInput, currentPage);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Initial display with default search term (empty)
  displayNews("", currentPage);
});
