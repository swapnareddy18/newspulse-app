const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const technologyBtn = document.getElementById("technology");
const entertainmentBtn = document.getElementById("entertainment");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsdetails = document.getElementById("newsdetails");

const API_KEY = "YOUR_API_KEY";
const BASE_URL = "http://api.mediastack.com/v1/news";

async function fetchNews(category = "", keyword = "") {
  newsdetails.innerHTML = "<h5>Loading...</h5>";

  let url = `${BASE_URL}?access_key=${API_KEY}&languages=en&limit=12`;

  if (category) url += `&categories=${category}`;
  if (keyword) url += `&keywords=${keyword}`;

  const response = await fetch(url);
  const result = await response.json();

  console.log(result); 

  if (!result.data || result.data.length === 0) {
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  displayNews(result.data);
}
function displayNews(newsArray) {
  newsdetails.innerHTML = "";

  newsArray.forEach(news => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    const hasImage = news.image && news.image.trim() !== "";

    card.innerHTML = `
      <div class="card h-100 shadow-sm">

        ${hasImage ? `
          <img src="${news.image}"
               class="card-img-top"
               alt="news image"
               onerror="this.style.display='none'">
        ` : ""}

        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">${news.description || ""}</p>
          <a href="${news.url}" target="_blank"
             class="btn btn-primary btn-sm">
            Read More
          </a>
        </div>

      </div>
    `;

    newsdetails.appendChild(card);
  });
}


generalBtn.onclick = () => fetchNews();
businessBtn.onclick = () => fetchNews("business");
sportsBtn.onclick = () => fetchNews("sports");
technologyBtn.onclick = () => fetchNews("technology");
entertainmentBtn.onclick = () => fetchNews("entertainment");

searchBtn.onclick = () => {
  if (newsQuery.value.trim() !== "")
    fetchNews("", newsQuery.value.trim());
};
fetchNews();