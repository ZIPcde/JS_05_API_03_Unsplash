const photoContainer = document.getElementById('photo-container');
const viewedPhotos = JSON.parse(localStorage.getItem('viewedPhotos')) || [];
let totalLikes = parseInt(localStorage.getItem('totalLikes')) || 0;

async function showPic() {
  const url = 'https://api.unsplash.com/photos/random/?client_id=9GwifaxmL5TVyzZSy8bd6maQ4anLSt9KIgjLoqLBpt4';
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const imageUrl = data.urls.regular;
  const image = document.createElement('img');
  const likes = document.createElement('p');
  likes.textContent = `Количество лайков, которое набрало данное изображение: ${data.likes}`;
  const authorInfo = document.createElement('p');
  authorInfo.textContent = `Фото от: ${data.user.name}`;
  const likeButton = document.createElement('button');
  likeButton.textContent = 'Поставить лайк';
  likeButton.addEventListener('click', () => {
    if (!viewedPhotos.includes(data.id)) {
      totalLikes++;
      viewedPhotos.push(data.id);
      localStorage.setItem('totalLikes', totalLikes);
      localStorage.setItem('viewedPhotos', JSON.stringify(viewedPhotos));
    }
    alert('Лайк поставлен!');
  });
  const likedPhotosToggle = document.createElement('input');
  likedPhotosToggle.type = 'checkbox';
  likedPhotosToggle.id = 'likedPhotosToggle';
  likedPhotosToggle.addEventListener('change', () => {
    const likedPhotos = viewedPhotos.filter(photoId => viewedPhotos.includes(photoId));
    console.log(likedPhotos);
  });
  const likedPhotosLabel = document.createElement('label');
  likedPhotosLabel.for = 'likedPhotosToggle';
  likedPhotosLabel.textContent = 'Показать только пролайканые фото';
  image.classList.add('random-photo');
  image.src = imageUrl;
  photoContainer.appendChild(image);
  photoContainer.appendChild(authorInfo);
  photoContainer.appendChild(likes);
  photoContainer.appendChild(likeButton);
  photoContainer.appendChild(likedPhotosToggle);
  photoContainer.appendChild(likedPhotosLabel);
}

document.addEventListener('DOMContentLoaded', showPic);
