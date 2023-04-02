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
        const itemOrdered = menuArray.find(element => element.id === 0)
        if(itemOrdered.numberInOrder < 1){
            itemsInOrder.push(itemOrdered)
        }
        itemsInOrder[itemsInOrder.indexOf(itemOrdered)].numberInOrder++
        orderCompleted.classList.add('hidden')
        console.log(itemsInOrder[itemsInOrder.indexOf(itemOrdered)].numberInOrder)
    } else if (e.target.id === "1") {
        const itemOrdered = menuArray.find(element => element.id === 1)
        if(itemOrdered.numberInOrder < 1){
            itemsInOrder.push(itemOrdered)
        }
        itemsInOrder[itemsInOrder.indexOf(itemOrdered)].numberInOrder++
        orderCompleted.classList.add('hidden')
    } else if (e.target.id === "2") {
        const itemOrdered = menuArray.find(element => element.id === 2)
        if(itemOrdered.numberInOrder < 1){
            itemsInOrder.push(itemOrdered)
        }
        itemsInOrder[itemsInOrder.indexOf(itemOrdered)].numberInOrder++
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

payForm.addEventListener('submit', handlePaymentSubmit)

function handleRemoveClick(e) {

    const itemToDelete = itemsInOrder.filter( item => item.name === e.target.id )[0]
    if (itemToDelete.numberInOrder > 1) {
        itemsInOrder[itemsInOrder.indexOf(itemToDelete)].numberInOrder--
    } else {
        itemsInOrder[itemsInOrder.indexOf(itemToDelete)].numberInOrder--
        itemsInOrder.splice(itemsInOrder.indexOf(itemToDelete), 1)
    }

    renderOrder()
}

function handleCompleteClick() {
    document.getElementById('payment').classList.remove('hidden')
    document.body.classList.add('filter')
}

function handlePaymentSubmit(e) {
    e.preventDefault()
    let customerName = e.target.firstElementChild.value
    payForm.reset()
    document.body.classList.remove('filter')
    document.getElementById('payment').classList.add('hidden')
    itemsInOrder.length = 0
    renderOrder()
    renderCompleteMsg(customerName)
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
        total += (item.price * item.numberInOrder)
        order += `
        <div class="item-added">
            <p>${item.name}</p>
            <button class="delete-btn" id="${item.name}">remove</button>
            <p class="quantity">x ${item.numberInOrder}</p>
            <p>£${item.price * item.numberInOrder}</p>
        </div>
        `
    })

    orderDetails.innerHTML = order
    totalAmount.textContent = `£${total}`
}

renderMenu()