const photoContainer = document.getElementById('photo-container');
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
  const authorProfile = document.createElement('p');
  authorProfile.innerHTML = `Профиль автора: <a href="${data.user.links.html}">${data.user.name}</a>`;
  const authorBio = document.createElement('p');
  authorBio.textContent = `Биография автора: ${data.user.bio}`;
  image.classList.add('random-photo');
  image.src = imageUrl;
  photoContainer.appendChild(image);
  photoContainer.appendChild(authorInfo);
  photoContainer.appendChild(authorProfile);
  photoContainer.appendChild(authorBio);
  photoContainer.appendChild(likes);
}

document.addEventListener('DOMContentLoaded', showPic);
