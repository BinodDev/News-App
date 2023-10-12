const API_KEY = "7c0fae638a104ab69cdac03c7be889d8";

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=> fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage)
        {
            return;
        } 
            
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, articles) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description;

    const date = new Date(articles.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});   
    
    newsSource.innerHTML = `${articles.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(articles.url, "_blank")
    })
}

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
    
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) 
    {
        return;
    }
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});

const menu = document.querySelector('.ri-menu-line');
const burger = document.querySelector('.burger');
const close = document.querySelector('.ri-close-line');

menu.addEventListener('click', () => {
    burger.style.visibility = 'visible';
    burger.style.opacity = '100%';
    burger.style.transform = 'translateY(0%)';
    menu.style.visibility = 'hidden';
    close.style.visibility = 'visible';
    close.style.opacity = '100%';
});


close.addEventListener('click', () => {
    burger.style.visibility = 'hidden';
    burger.style.opacity = '0%';
    burger.style.transform = 'translateY(-100%)';
    menu.style.visibility = 'visible';
    close.style.visibility = 'hidden';
    close.style.opacity = '0%';
})
