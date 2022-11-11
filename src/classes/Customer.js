class Customer {
    constructor(customerData) {
        this.id = customerData.id;
        this.name = customerData.name;
    }
    getAllBookings(bookingData) {
        const bookedRooms = bookingData.filter(booking => this.id === booking.userID)
        return bookedRooms
    }
    getTotalCost() {

    }
}

export default Customer