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

// ~~~~~~~~~~~~~~~~~~~~Query Selectors~~~~~~~~~~~~~~~~~~~~


// ~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~
window.addEventListener('load', fetchData())


// ~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~
function fetchData() {
    Promise.all([getData('customers'), getData('rooms'), getData('bookings')])
    .then(data => {
        console.log(data)
        allCustomers = data[0].customers
        allRooms = data[1].rooms
        allBookings = data[2].bookings
        // displayCustomerData(user)
    })
}

// function displayCustomerData(user) {
//     //Hard code user until we have log in page?
//     //Add user name in header
//     //Add total cost in header
//     //Display all past bookings as cards
//     //Display all upcoming bookings as cards
// }

// ~~~~~~~~~~~~~~~~~~~~Helper Functions~~~~~~~~~~~~~~~~~~~~