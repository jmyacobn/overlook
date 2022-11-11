const sampleCustomers = [
    {
        id: 1,
        name: "Leatha Ullrich"
    },
    {
        id: 2,
        name: "Rocio Schuster"
    },
    {
        id: 3,
        name: "Kelvin Schiller"
    },
    {
        id: 4,
        name: "Kennedi Emard"
    },
    {
        id: 5,
        name: "Rhiannon Little"
    }
]

const sampleRooms = [
    {
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38
    },
    {
        number: 3,
        roomType: "single room",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 491.14
    },
    {
        number: 4,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 429.44
    },
    {
        number: 6,
        roomType: "junior suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 397.02
        },
    {
        number: 8,
        roomType: "junior suite",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 261.26
    },
    {
        number: 9,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 200.39
    },
    {
        number: 12,
        roomType: "single room",
        bidet: false,
        bedSize: "twin",
        numBeds: 2,
        costPerNight: 172.09
    },
    {
        number: 15,
        roomType: "residential suite",
        bidet: false,
        bedSize: "full",
        numBeds: 1,
        costPerNight: 294.56
    },
]

const sampleBookings = [
    {
        id: "5fwrgu4i7k55hl76z",
        userID: 1,
        date: "2022/02/15",
        roomNumber: 4
    },
    {
        id: "5fwrgu4i7k55hl77c",
        userID: 1,
        date: "2022/01/27",
        roomNumber: 9
    },
    {
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2022/02/05",
        roomNumber: 12
    },
    {
        id: "5fwrgu4i7k55hl70e",
        userID: 2,
        date: "2022/01/20",
        roomNumber: 3
    },
    {
        id: "5fwrgu4i7k55hl8eb",
        userID: 2,
        date: "2021/10/23",
        roomNumber: 6
    },
    {
        id: "5fwrgu4i7k55hl6vw",
        userID: 2,
        date: "2023/02/11",
        roomNumber: 9
    },
    {
        id: "5fwrgu4i7k55hl6tl",
        userID: 3,
        date: "2022/01/10",
        roomNumber: 8
    },
    {
        id: "5fwrgu4i7k55hl74i",
        userID: 3,
        date: "2023/01/13",
        roomNumber: 15
    },
    {
        id: "5fwrgu4i7k55hl7d9",
        userID: 3,
        date: "2022/02/15",
        roomNumber: 2
    }
]

export {sampleCustomers, sampleRooms, sampleBookings}