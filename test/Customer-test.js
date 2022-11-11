import {expect} from 'chai'
import Customer from '../src/classes/Customer'
import {sampleCustomers, sampleRooms, sampleBookings} from '../src/sample-data'

describe('Customer', () => {
    sampleCustomers
    sampleRooms
    sampleBookings
    let customer1, customer2

    beforeEach(() => {
        customer1 = new Customer(sampleCustomers[0])
        customer2 = new Customer(sampleCustomers[1])
    })

    it('should be a function', () => {
        expect(Customer).to.be.a('function')
    })

    it('should have property of id', () => {
        expect(customer1.id).to.equal(1)
        expect(customer2.id).to.equal(2)
    })
})