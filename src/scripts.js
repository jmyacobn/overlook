// ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~
import './css/styles.css'
import './images/5-stars.png'
import getData from './apiCalls'

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
        allCustomers = data[0]
        allRooms = data[1]
        allBookings = data[2]
    })
}

// ~~~~~~~~~~~~~~~~~~~~Helper Functions~~~~~~~~~~~~~~~~~~~~