
const accessKey = 'mYweULWvkOWvXS6WXjqitHgIrf4JwNbGIbMG-wrKTPg';


const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showBtn = document.getElementById('show-more-btn');

// console.log(searchBox);

let keyword = '';
let page = 1;

async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML='';
    }

    const results = data.results;

    results.map((result)=>{
        const image = document.createElement('img');
        image.src =result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href =result.links.html;
        imageLink.target = '_blank';

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })

    if (results.length > 0) {
        showBtn.style.display = 'block';
    } else {
        showBtn.style.display = 'none';
    }
}

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    page = 1;
    searchImage();
})

showBtn.addEventListener('click',()=>{
    page++;
    searchImage();
})