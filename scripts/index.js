const userLocation = document.getElementById('user-location')
const api = 'http://ip-api.com/json/'

fetch(api, { method: 'GET' })
  .then(response => response.json())
  .then(response => {
    if (response.status === 'success') {
      userLocation.innerText = `${response.city}, ${response.country}`
    }
  })
  .catch(err => console.error(err))
