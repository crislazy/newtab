import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero1.png'

// Set the base path for the app
document.querySelector('#app').innerHTML = `
<div class="container">
  <div class="card">
    <img
    src="${heroImg}"
    alt="Hero Image"
    class="hero-image"
    />
    <h1 id="clock" style="clock">00:00:00</h1>
    <div class="card">
      <input id="searchInput" type="text" placeholder="Search..." class="search-input" />
      <button id="searchButton" style="margin-left: 10px; height: 35px;">Search</button>
      <br>
      <br>
      <button id="settingsButton">Open settings</button>
      <div class="settings-container" style="display: none; padding-top: 10px;">
        <input type="checkbox" id="openInNewTab"/>
        <label for="openInNewTab">Open in new tab</label>
        <br>
        <label for="searchEngine">Select a search engine:</label>
        <select id="searchEngine" name="searchEngine">
          <option value="duckduckgo">DuckDuckGo</option>
          <option value="google">Google</option>
          <option value="bing">Bing</option>
        </select>
      </div>
    </div>
  </div>
</div>
`

// Defining variables
const searchUrls = {
  duckduckgo: 'https://duckduckgo.com/?q=',
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q='
}
const searchInput = document.querySelector('#searchInput')
const searchButton = document.querySelector('#searchButton')
const openInNewTabCheckbox = document.querySelector('#openInNewTab')
const openInNewTabValue = localStorage.getItem('openInNewTab')
const searchEngineDropdown = document.querySelector('#searchEngine')
const settingsButton = document.querySelector('#settingsButton')
const settingsContainer = document.querySelector('.settings-container')
const clockElement = document.querySelector('#clock')

function search() {
  const query = searchInput.value
  const searchEngine = searchEngineDropdown.value
  const openInNewTab = openInNewTabCheckbox.checked

  if (query) {
    const url = searchUrls[searchEngine] + encodeURIComponent(query)

    if (openInNewTab) {
      window.open(url, '_blank')
    } else {
      window.location.href = url
    }
  }
}


settingsButton.addEventListener('click', () => {
  const settingsButtonText = settingsButton.textContent
  settingsButton.textContent = settingsButtonText === 'Open settings' ? 'Close settings' : 'Open settings'
  settingsContainer.style.display = settingsContainer.style.display === 'block' ? 'none' : 'block'
})

// Set openInNewTab checkbox based on localStorage value - if its first time, set it to true
if (openInNewTabValue === null) {
  localStorage.setItem('openInNewTab', 'true')
  openInNewTabCheckbox.checked = true
} else {
  openInNewTabCheckbox.checked = openInNewTabValue === 'true'
}

// Set search engine dropdown based on localStorage value - if its first time, set it to duckduckgo
const searchEngineValue = localStorage.getItem('searchEngine')
if (searchEngineValue === null) {
  localStorage.setItem('searchEngine', 'duckduckgo')
  searchEngineDropdown.value = 'duckduckgo'
} else {
  searchEngineDropdown.value = searchEngineValue
}

searchEngineDropdown.addEventListener('change', () => {
  localStorage.setItem('searchEngine', searchEngineDropdown.value)
})

openInNewTabCheckbox.addEventListener('change', () => {
  localStorage.setItem('openInNewTab', openInNewTabCheckbox.checked.toString())
})

searchButton.addEventListener('click', () => {
  search()
})

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    search()
  }
})

function updateClock() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  clockElement.textContent = `${hours}:${minutes}:${seconds}`
}
setInterval(updateClock, 1000)
updateClock()