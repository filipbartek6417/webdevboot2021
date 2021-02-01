const form = document.querySelector("#searchForm");
form.addEventListener('submit', async e => {
  e.preventDefault();
  const searchItem = form.elements.query.value;
  const config = {params: {q: searchItem}};
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
  displayImg(res.data);
  form.elements.query.value = ''
  })

const displayImg = (shows) => {
  for (let show of shows) {
    if (show.show.image != null) {
      const img = document.createElement('img');
      img.src = show.show.image.medium;
      document.body.append(img);
    }
  }
}
