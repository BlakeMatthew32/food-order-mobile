import { menuArray } from "./data.js";

const menuContainer = document.getElementById('menu-container')
const orderContainer = document.getElementById('order-container')

console.log('here')
 function renderMenu() {
    console.log('here')
    let menu = ``

    menuArray.forEach(item => {
        menu += getMenuItems(item)
    })

    menuContainer.innerHTML = menu

 }

 function getMenuItems(item) {

    return `
        <div class="menu-item">
            <p class="food-icon">${item.emoji}</p>
            <div class="info">
                <h2 class="food-title">${item.name}</h2>
                <p class="ingredients">${item.ingredients.toString()}</p>
                <p class="price">£${item.price}</p>
            </div>
            <button class="plus-btn" id="${item.id}">+<btn>
        </div>
        `
 }

 renderMenu()