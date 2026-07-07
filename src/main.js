import './style.css'
import heroImg from './assets/hero1.png'
let config = {
  banner: heroImg
};

try {
  config = await fetch("https://raw.githubusercontent.com/crislazy/json-files/main/newtab.json")
    .then(r => r.json());
} catch (e) {
  console.log(e)
}

// Set the base path for the app
document.querySelector('#app').innerHTML = `
<div class="container">
  <div class="card-main">
    <h2 id="announcement" class="announcement">Loading</h2>
    <img
    src="${config.banner}"
    alt="Hero Image"
    class="hero-image"
    id="hero-image"
    />
    <h1 id="clock" style="clock">00:00:00</h1>
    <div class="card">
      <input id="searchInput" type="text" placeholder="Search..." class="search-input" />
      <button id="searchButton" style="margin-left: 10px; height: 35px;">Search</button><br>
      <button id="iFeelLucky" style="margin-top: 10px; height: 35px;">I feel lucky</button>
    </div>
    <br>
    <div class="linksContainer" id="linksContainer">
      <button id="addLinks" class="addLinksButton">+</button>
    </div>
  </div>
  <div class="card-bottom">
    <button id="settingsButton">Open settings</button>
  </div>

  <div id="modalBackdrop" class="modal-backdrop"></div>
  <div id="settingsModal" class="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
    <button id="settingsClose" class="settings-close" aria-label="Close">✕</button>
    <h2 id="settingsTitle">Settings</h2>
    <div class="settings-container" style="padding-top: 10px;">
      <input type="checkbox" id="openInNewTab"/>
      <label for="openInNewTab">Open link in new tab</label>
      <br>
      <label for="searchEngine">Select a search engine:</label>
      <select id="searchEngine" name="searchEngine">
        <option value="duckduckgo">DuckDuckGo</option>
        <option value="google">Google</option>
        <option value="bing">Bing</option>
      </select>
      <br>
      <br>
      <h3>Info</h3>
      <p>A project made for <a href="https://stardance.hackclub.com/projects/28169" target="_blank">Hackclub Stardance</a></p>
      <p>Created by <a href="https://crislzy.xyz" target="_blank">Cris</a></p>
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
const settingsModal = document.querySelector('#settingsModal')
const modalBackdrop = document.querySelector('#modalBackdrop')
const settingsCloseBtn = document.querySelector('#settingsClose')
const clockElement = document.querySelector('#clock')
const linksContainer = document.querySelector('#linksContainer')
const announcementBanner = document.querySelector('#announcement')
const iFeelLuckyButton = document.querySelector('#iFeelLucky')

if (config.announcement != "No_Announcement_Text") {
  announcementBanner.innerHTML = `${config.announcement}`
} else {
  announcementBanner.innerHTML = ``
  announcementBanner.className=``
}

function search() {
  const query = searchInput.value
  const searchEngine = searchEngineDropdown.value
  const openInNewTab = openInNewTabCheckbox.checked

  if (query) {
    if(isValidUrl(query)){
      if (openInNewTab) {
        window.open(query, '_blank')
      } else {
        window.location.href = query
      }
    } else {
      const url = searchUrls[searchEngine] + encodeURIComponent(query)

      if (openInNewTab) {
        window.open(url, '_blank')
      } else {
        window.location.href = url
      }
    }
  }
}


iFeelLuckyButton.addEventListener('click', () => {
  const url = "https://www.youtube.com/watch?v=E4WlUXrJgy4"
  if (openInNewTab) {
    window.open(url, '_blank')
  } else {
    window.location.href = url
  }
})

settingsButton.addEventListener('click', () => {
  settingsModal.classList.add('active')
  modalBackdrop.classList.add('active')
  settingsButton.textContent = 'Close settings'
})

function closeSettings() {
  settingsModal.classList.remove('active')
  modalBackdrop.classList.remove('active')
  settingsButton.textContent = 'Open settings'
}

settingsCloseBtn.addEventListener('click', closeSettings)
modalBackdrop.addEventListener('click', closeSettings)

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

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function deleteLink(index) {
  links.splice(index, 1);
  localStorage.setItem("links", JSON.stringify(links));
  renderLinks();
}

let links = JSON.parse(localStorage.getItem("links")) || [];
function renderLinks() {
  linksContainer.innerHTML = "";

  links.forEach((link, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "link-wrapper";

    const button = document.createElement("button");
    button.textContent = link.name;

    button.addEventListener("click", () => {
      if (openInNewTabCheckbox.checked) {
        window.open(link.url, "_blank");
      } else {
        window.location.href = link.url;
      }
    });

    button.className = "link";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.className = "delete-link";

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent opening the link
      deleteLink(index);
    });

    wrapper.appendChild(button);
    wrapper.appendChild(deleteBtn);

    linksContainer.appendChild(wrapper);
  });
  const addBtn = document.createElement("button");
  addBtn.id = "addLinks";
  addBtn.className = "addLinksButton";
  addBtn.textContent = "+";
  addBtn.addEventListener("click", addLink);

  linksContainer.appendChild(addBtn);
}

function addLink() {
  const name = prompt("Link name:");
  if (!name) return;
  if (name.length > 35) alert("Please enter a name with a length smaller that 36 characters"); return;

  const url = prompt("URL:");
  if (!url) return;

  if (!isValidUrl(url)) {
    alert("Please enter a valid URL (e.g. https://google.com)");
    return;
  }

  links.push({
    name,
    url
  });

  localStorage.setItem("links", JSON.stringify(links));
  renderLinks();
}
renderLinks();