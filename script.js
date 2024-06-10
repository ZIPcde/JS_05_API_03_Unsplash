const photoContainer = document.getElementById('photo-container');
let viewedPhotos = JSON.parse(localStorage.getItem('viewedPhotos')) || [];
let totalLikes = parseInt(localStorage.getItem('totalLikes')) || 0;

async function showPic() {
  const url = 'https://api.unsplash.com/photos/random/?client_id=9GwifaxmL5TVyzZSy8bd6maQ4anLSt9KIgjLoqLBpt4';
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  if (!viewedPhotos.some(photo => photo.id === data.id)) {
    viewedPhotos.push({ id: data.id, likedByYou: false });
    localStorage.setItem('viewedPhotos', JSON.stringify(viewedPhotos));
  };
  const imageUrl = data.urls.regular;
  const image = document.createElement('img');
  const likes = document.createElement('p');
  likes.textContent = `Количество лайков, которое набрало данное изображение: ${data.likes}`;
  const authorInfo = document.createElement('p');
  authorInfo.textContent = `Фото от: ${data.user.name}`;
  const likeButton = document.createElement('button');
  likeButton.textContent = 'Поставить лайк';
  likeButton.addEventListener('click', () => {
    const photoIndex = viewedPhotos.findIndex(photo => photo.id === data.id);
    if (photoIndex === -1) {
      viewedPhotos.push({ id: data.id, likedByYou: false });
      localStorage.setItem('viewedPhotos', JSON.stringify(viewedPhotos));
    }
    if (!viewedPhotos[photoIndex].likedByYou) {
      viewedPhotos[photoIndex].likedByYou = true;
      data.likes++;
      likes.textContent = `Количество лайков, которое набрало данное изображение: ${data.likes}`;
      totalLikes++;
      localStorage.setItem('totalLikes', totalLikes);
      localStorage.setItem('viewedPhotos', JSON.stringify(viewedPhotos));
    }
    alert('Лайк поставлен!');
  });
  const likedPhotosToggle = document.createElement('input');
  likedPhotosToggle.type = 'checkbox';
  likedPhotosToggle.id = 'likedPhotosToggle';
  likedPhotosToggle.addEventListener('change', () => {
    if (likedPhotosToggle.checked) {
      const likedPhotos = viewedPhotos.filter(photo => photo.likedByYou);
      console.log(likedPhotos);
      // Если доживу, поместить сюда фильтр только лайканых фото
    } else {
      // Если доживу, поместить сюда сброс фильтра нелайканых фото
    }
  });
  const totalLikesElement = document.createElement('p');
  totalLikesElement.textContent = parseInt(localStorage.getItem('totalLikes')) > 0 ? (`Общее количество лайков: ${localStorage.getItem('totalLikes')}`) : 0;
  const likedPhotosLabel = document.createElement('label');
  likedPhotosLabel.for = 'likedPhotosToggle';
  likedPhotosLabel.textContent = 'Показать только пролайканые фото';
  image.classList.add('random-photo');
  image.src = imageUrl;
  photoContainer.appendChild(image);
  photoContainer.appendChild(authorInfo);
  photoContainer.appendChild(likes);
  photoContainer.appendChild(likeButton);
  photoContainer.appendChild(totalLikesElement);
  photoContainer.appendChild(likedPhotosToggle);
  photoContainer.appendChild(likedPhotosLabel);

  // Отображение ранее просмотренных фоток, не больше 10 штучек
  const recentPhotos = viewedPhotos.slice(-10).reverse();
  for (const photo of recentPhotos) {
    const photoUrl = `https://api.unsplash.com/photos/${photo.id}?client_id=9GwifaxmL5TVyzZSy8bd6maQ4anLSt9KIgjLoqLBpt4`;
    const photoResponse = await fetch(photoUrl);
    const photoData = await photoResponse.json();
    const recentPhoto = document.createElement('div');
    recentPhoto.classList.add('recent-photo-container');
    const recentPhotoImage = document.createElement('img');
    recentPhotoImage.src = photoData.urls.regular;
    recentPhotoImage.classList.add('recent-photo');
    const recentPhotoInfo = document.createElement('p');
    recentPhotoInfo.textContent = `Количество лайков: ${photoData.likes} | Вы ${photo.likedByYou ? 'лайкали' : 'не лайкали'} это фото`;
    recentPhoto.appendChild(recentPhotoImage);
    recentPhoto.appendChild(recentPhotoInfo);
    photoContainer.appendChild(recentPhoto);
  }
}

document.addEventListener('DOMContentLoaded', showPic);
