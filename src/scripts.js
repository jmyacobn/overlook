// ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~
import './css/styles.css'
import './images/5-stars.png'
import getData from './apiCalls'
import Customer from './classes/Customer'
import Room from './classes/Room'
import Booking from './classes/Booking'

// ~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~
let allCustomers
let allRooms
let allBookings
let currentCustomer
// ~~~~~~~~~~~~~~~~~~~~Query Selectors~~~~~~~~~~~~~~~~~~~~
const greeting = document.querySelector('#greeting')
const cost = document.querySelector('#costSummary')
const pastBookings = document.querySelector('#pastBookingDisplay')
const upcomingBookings = document.querySelector('#upcomingBookingDisplay')

// ~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~
window.addEventListener('load', fetchData())


// ~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~
function fetchData() {
    Promise.all([getData('customers'), getData('rooms'), getData('bookings')])
    .then(data => {
        allCustomers = data[0].customers
        allRooms = data[1].rooms
        allBookings = data[2].bookings
        currentCustomer = new Customer(allCustomers[Math.floor(Math.random() * allCustomers.length)])
        displayCustomerData(currentCustomer, allRooms, allBookings)
    })
}

function displayCustomerData(currentCustomer, allRooms, allBookings) {
    greeting.innerText = `Welcome, ${currentCustomer.name}!`
    cost.innerHTML = `Your total cost of bookings is $${currentCustomer.getTotalCost(allBookings, allRooms).toFixed(2)}.`
    displayCardsByType("upcoming")
    displayCardsByType("past")
}

function displayCardsByType(type) {
    if (type === "upcoming") {
        currentCustomer.getBookingsByType(allBookings, getCurrentDate(), type).forEach(booking => {
            allRooms.forEach(room => {
                if(booking.roomNumber === room.number) {
                    upcomingBookings.innerHTML += renderArticle(booking, room)
                }
            })
        })
    } else {
        currentCustomer.getBookingsByType(allBookings, getCurrentDate(), type).forEach(booking => {
            allRooms.forEach(room => {
                if(booking.roomNumber === room.number) {
                    pastBookings.innerHTML += renderArticle(booking, room)
                }
            })
        })
    }
}
function renderArticle(booking, room) {
    return (`<article class="booking-card">
            <p>Date: ${booking.date}</p>
            <p>Room #${booking.roomNumber}</p>
            <p>${room.roomType.toUpperCase()}</p>
            <p>${room.numBeds} ${room.bedSize.charAt(0).toUpperCase()}${room.bedSize.slice(1)} Bed(s)</p>
            <p>Bidet: ${displayBidetStatus(room)}</p>
            <p>$${room.costPerNight}</p>
        </article>`)
}

function getCurrentDate() {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currDate = `${year}/${month}/${day}`
    return currDate
}

function displayBidetStatus(room) {
    if (room.bidet) {
        return "Yes"
    } else {
        return "No"
    }
}