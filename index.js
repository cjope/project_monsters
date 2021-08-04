const BASE_URL = "https://raw.githubusercontent.com/Dane-Dawson/json-server-collection/main/dnd-5e-monsters/db.json"
const dropList = document.getElementById("drop")
const imageContainer = document.getElementById('show-pic')
const selected = document.getElementById("selected")

let monsterList = []

//basic fetch command
const getMonsters = () => {
    fetch(BASE_URL)
    return fetch('https://raw.githubusercontent.com/Dane-Dawson/json-server-collection/main/dnd-5e-monsters/db.json')
    .then(res => res.json())
}

// (only works as an appendage) gets fetched data and populates monsterList (empty array), then loops through the ids and returns the name object, then creates an option element and fills in innerText with the names, then appends the names to the dropdown list
const appendMonsters = (data=>{
    monsterList = data.monsters
        for(let i = 0; i < 327; i++){
            let opt = data.monsters[i].name
            let el = document.createElement("option")
            el.innerText = opt
            dropList.appendChild(el)
        }
})

// calls function to fetch data, then calls function to populate the dropdown list
const init = () => {
    getMonsters()
    .then(appendMonsters)
}

// calls init function when DOM is loaded
document.addEventListener('DOMContentLoaded', init())


//listens to the dropdown menu for a selection and creates a list. CSS displays as an inline-block to list them horizontally. (would like to set up with a function to ignore duplicates, but I think I have to do bubbling to access the dynamically created elements)
dropList.addEventListener("change",(e) => {
    let li = document.createElement("li")
    li.className = "monster-name"
    li.innerHTML = e.target.value
    selected.appendChild(li)
})

//listens to the created list of names and displays a card with a photo, actions, and a like button (which does nothing but change colors). All of this is pulled from the monsterList using the find function and interpolating the selected name by using the innerHTML of the element (it's name in string form). It then creates a <div> element (the container or "card"), which holds three other elements - <img> for the image, <p> for the traits, and <button> for the like button.
selected.addEventListener("click",(monsterName) => {
  result = monsterList.find( ({ name }) => name === `${monsterName.target.innerHTML}`)
  let div = document.createElement("div")
  // div.className = `container-${result.name}`
  div.className = "container"
  let images = document.createElement("img")
  images.src = result.img_url
  images.className = "image"
  let actions = document.createElement("p")
  actions.innerHTML = result.Actions
  actions.className = "actions"
  let diceLiker = document.createElement("img")
  diceLiker.className = "empty-heart"
  diceLiker.src= "pics/dice-unliked.png"
  imageContainer.appendChild(div);
  div.appendChild(images).width = 200
  div.appendChild(actions)
  div.appendChild(diceLiker)
  imageContainer.append(document.createElement("br"))
})

//listens for clicks on the like button and changes it back and forth
imageContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('empty-heart')) {
    e.target.src = "pics/dice-liked.png"
    e.target.className = 'full-heart'
  } else {
    if (e.target.classList.contains('full-heart')) {
        e.target.src = "pics/dice-unliked.png"
        e.target.className = 'empty-heart'
    }
  }
});



/*would have liked to add: 
- card created from the dropdown menu instead of clicking on a list  
- like button creates a new list of favorites
- like button css hexagon clipping (had it working but changing window sizing affected the sizing)
- other css styling - tried to use bootstrap as it was mentioned somewhere on slack? I decided to not get into that and now I'm afraid to delete that folder incase it affects my project in any way.
*/