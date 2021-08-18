const BASE_URL = "https://raw.githubusercontent.com/Dane-Dawson/json-server-collection/main/dnd-5e-monsters/db.json"
const dropMenu = document.getElementById("drop-menu")
const imageContainer = document.getElementById('show-pic')
const selected = document.getElementById("selected")
let monsterList = []

const getMonsters = () => {
    return fetch(BASE_URL)
    .then(res => res.json())
}

const appendMonsters = (data=>{
    monsterList = data.monsters
        for(let i = 0; i < monsterList.length; i++){
            let opt = monsterList[i].name
            let el = document.createElement("option")
            el.innerText = opt
            dropMenu.appendChild(el)
        }
})

const init = () => {
    getMonsters()
    .then(appendMonsters)
}

document.addEventListener('DOMContentLoaded', init())

// selected.addEventListener("click",(e) => {
//   result = monsterList.find(({name}) => name === `${e.target.innerHTML}`)
//   let div = document.createElement("div")
//   div.className = "container"
//   let images = document.createElement("img")
//   images.src = result.img_url
//   images.className = "image"
//   let actions = document.createElement("p")
//   actions.innerHTML = result.Actions
//   actions.className = "actions"
//   let diceLiker = document.createElement("img")
//   diceLiker.className = "empty-heart"
//   diceLiker.src= "pics/dice-unliked.png"
//   imageContainer.appendChild(div);
//   div.appendChild(images)
//   div.appendChild(actions)
//   div.appendChild(diceLiker)
//   imageContainer.append(document.createElement("br"))
// })

// dropMenu.addEventListener("change",(e) => {
//     let li = document.createElement("li")
//     li.className = "monster-name"
//     li.innerHTML = e.target.value
//     selected.appendChild(li)
// })

const createCard = (result) => {
  let div = document.createElement("div")
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
  div.appendChild(images)
  div.appendChild(actions)
  div.appendChild(diceLiker)
  imageContainer.append(document.createElement("br"))
}

dropMenu.addEventListener("change",(e) => {
  result = monsterList.find(({name}) => name === `${e.target.value}`)
  createCard(result)
})

const beholderCard = document.querySelector(".beholder")

beholderCard.addEventListener("dblclick",() => {
  bugbearObj = monsterList[58]
  createCard(bugbearObj)
})



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