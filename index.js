import { menuArray } from "./data.js";


const mainContainer = document.getElementById('main-container')
const menuContainer = document.getElementById('menu-container')
const orderContainer = document.getElementById('order-container')
const orderDetails = document.getElementById('order-details')
const payForm = document.getElementById('payment-form')
const orderCompleted = document.getElementById('order-completed')

const itemsInOrder = []

mainContainer.addEventListener('click', (e) => {

    if (e.target.id === "0") {
        itemsInOrder.push(menuArray.find(element => element.id === 0))
        orderCompleted.classList.add('hidden')
    } else if (e.target.id === "1") {
        itemsInOrder.push(menuArray.find(element => element.id === 1))
        orderCompleted.classList.add('hidden')
    } else if (e.target.id === "2") {
        itemsInOrder.push(menuArray.find(element => element.id === 2))
        orderCompleted.classList.add('hidden')
    }

    renderOrder()
})

orderContainer.addEventListener('click', (e) => {

    if ( e.target.id === 'Pizza' || 
        e.target.id === 'Hamburger' || 
        e.target.id === 'Beer' ) {
        handleRemoveClick(e)
    } else if ( e.target.id === 'order-btn') {
        handleCompleteClick()
    }
})

payForm.onsubmit = (e) => {
    e.preventDefault()
    let customerName = e.target.firstElementChild.value
    document.body.classList.remove('filter')
    document.getElementById('payment').classList.add('hidden')
    itemsInOrder.length = 0
    renderOrder()
    renderCompleteMsg(customerName)
}

function handleRemoveClick(e) {

    const itemToDelete = itemsInOrder.filter( item => item.name === e.target.id )[0]

    if (itemToDelete) {
        itemsInOrder.splice(itemsInOrder.indexOf(itemToDelete), 1)
    } 

    renderOrder()
}

function handleCompleteClick() {
    document.getElementById('payment').classList.remove('hidden')
    document.body.classList.add('filter')
}

function renderMenu() {

    let menu = ``

    menuArray.forEach(item => {
        menu += getMenuItems(item)
    })

    menuContainer.innerHTML = menu
}

function renderOrder() {

    if (itemsInOrder.length < 1) {
        orderContainer.classList.add('hidden')
    } else {
        orderContainer.classList.remove('hidden')
        getOrderItems()
    }

}

function renderCompleteMsg(customerName) {
    document.getElementById('customer-name').textContent = customerName
    orderCompleted.classList.remove('hidden')
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

function getOrderItems() {
    
    const totalAmount = document.getElementById('total-amount')
    
    let total = 0
    let order = ``

    itemsInOrder.forEach(item => {
        total += item.price
        order += `
        <div class="item-added">
            <p>${item.name}</p>
            <button class="delete-btn" id="${item.name}">remove</button>
            <p>£${item.price}</p>
        </div>
        `
    })

    orderDetails.innerHTML = order
    totalAmount.textContent = `£${total}`
}

renderMenu()