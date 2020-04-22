const api= "563492ad6f917000010000012c8a9a45be784ffabb95c13c4a174e3a";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSeaech;

// event listerner
searchInput.addEventListener("input", undateInput);//call back the promise (undteInput)
form.addEventListener('submit',(e) => {
e.preventDefault();
currentSeaech = searchValue;
    searchPhotos(searchValue);
});
more.addEventListener("click",loadMore);


function undateInput(e){

    searchValue = e.target.value
}

async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: api
        }
      });
      const data = await dataFetch.json();
      return data;
}

function generatePictures(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class = "gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg);
        
    });
}

async function curatedPhoto(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePictures(data);
    
}
async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

 function clear(){
     gallery.innerHTML = "";
     searchInput.value = '';
 }
 async function loadMore(){
     page++;
     if(currentSeaech){
         fetchLink = `https://api.pexels.com/v1/search?query=${currentSeaech}+query&per_page=15&page=${page}`;
     }else{
         fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
     }
     const data = await fetchApi(fetchLink);
     generatePictures(data);
 }

curatedPhoto();