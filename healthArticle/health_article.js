

const articlesContainer = document.getElementById("articles");

async function loadArticles() {
  try {
    const response = await fetch("./health_article.json");

    if (!response.ok) {
      throw new Error("Failed to load JSON file");
    }
    
    const articles = await response.json();
  
    renderArticles(articles.articles);
  } catch (error) {
    articlesContainer.innerHTML = `
      <p style="color:red;">
        Error loading articles: ${error.message}
      </p>
    `;
  }
}

function renderArticles(articles) {
  articlesContainer.innerHTML = "";

  articles.forEach(article => {
    const articleElement = document.createElement("div");

    articleElement.innerHTML = `
      <h2>${article.title}</h2>

      <p>
        <strong>Description:</strong>
        ${article.description}
      </p>

      <h3>Ways to Achieve</h3>
      <ul>
        ${article.ways_to_achieve
          .map(item => `<li>${item}</li>`)
          .join("")}
      </ul>

      <h3>Benefits</h3>
      <ul>
        ${article.benefits
          .map(item => `<li>${item}</li>`)
          .join("")}
      </ul>

      <hr>
    `;

    articlesContainer.appendChild(articleElement);
  });
}

loadArticles();