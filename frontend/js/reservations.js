const ReserverUser = new Reservation()
const Passengers = new Passenger()

const reservePop = async (id) => {
    console.log(Passengers.guests);
    ReserverUser.flightId = id
    const button = document.querySelector('.next')
    const dash = document.querySelector('.reserveTable');
    const passengerForm = document.querySelector('.passengerContainer');
    document.body.style.backgroundColor = '#fffff6'
    dash.remove()
    if (Passengers.guests > 0) {
        Passengers.guests == 1 ? button.innerHTML = 'Reserve Now' : null
        passengerForm.style.display = 'block'
    } else {
        startReservation().then(result => {
            !result.error ? passengerForm.innerHTML = `<h1>${result.message}</h1>` : passengerForm.innerHTML = `<h1>${result.error}</h1>`
            passengerForm.style.display = 'block'
        })

    }
}




const reserveForUser = async () => {
    let UserReservation = {
        cin: authUser.getUserInfo().cin,
        flight: ReserverUser.flightId,
        accepted_return: 0,
        guests: Passengers.guestsData.length + 1
    }
    return ReserverUser.add(UserReservation)
}



const startReservation = async () => {
    return reserveForUser().then((data) => {
        if (data.error) {
            return data
        } else {
            if (Passengers.guestsData.length > 0) {
                Passengers.guestsData.map(guest => {
                    guest.reservation = data.result.id
                    Passengers.add(guest)
                })
            }
        }
        return data
    })
}

const nextPassenger = (event) => {
    event.preventDefault()
    let email = document.querySelector('#PassengerEmail').value
    let cin = document.querySelector('#PassengerCin').value
    let first_name = document.querySelector('#Passengerfirst_name').value
    let last_name = document.querySelector('#Passengerlast_name').value
    let address = document.querySelector('#PassengerAddress').value
    let num_passport = document.querySelector('#PassengerPassport').value
    let birth_date = document.querySelector('#PassengerBirthday').value
    let phone = document.querySelector('#PassengerPhone').value
    let button = document.querySelector('.next')
    let number = document.querySelector('.passengerNumber')
    const passengerForm = document.querySelector('.passengerContainer');


    Passengers.guests = Passengers.guests - 1
    if (Passengers.guests > 0) {
        Passengers.guests == 1 ? button.innerHTML = 'Reserve Now' : null
        const guest = {
            email,
            cin,
            first_name,
            last_name,
            address,
            num_passport,
            birth_date,
            phone
        }

        Passengers.guestsData.push(guest)
        console.log(Passengers.guestsData);
        console.log(Passengers.guests);
        document.querySelector('#PassengerEmail').value = ""
        document.querySelector('#PassengerCin').value = ""
        document.querySelector('#Passengerfirst_name').value = ""
        document.querySelector('#Passengerlast_name').value = ""
        document.querySelector('#PassengerAddress').value = ""
        document.querySelector('#PassengerPassport').value = ""
        document.querySelector('#PassengerBirthday').value = ""
        document.querySelector('#PassengerPhone').value = ""
        number.innerHTML = `Passenger Number ${Passengers.guestsData.length + 1}`
    } else {
        const guest = {
            email,
            cin,
            first_name,
            last_name,
            address,
            num_passport,
            birth_date,
            phone
        }

        Passengers.guestsData.push(guest)
        console.log(Passengers.guestsData);
        console.log(Passengers.guests);
        startReservation().then(result => {
            !result.error ? passengerForm.innerHTML = `<h1>${result.message}</h1>` : passengerForm.innerHTML = `<h1>${result.error}</h1>`
            passengerForm.style.display = 'block'
        })
    }

}





const dashRes = document.querySelector('#myreservations')
const getMy = () => {
    ReserverUser.getMyReservations().then(() => {
        ReserverUser.all.map(result => {
            let tr = document.createElement('tr')
            console.log(result);
            tr.innerHTML = `
                <td onclick="guests(${result.id})" class="td-hover" scope="col">Guests</td>
                <td class="td-hover" scope="col">${result.airport}</td>
                <td class="td-hover" scope="col">${result.CityFrom}</td>
                <td class="td-hover" scope="col">${result.CityTo}</td>
                <td class="td-hover" scope="col">${result.going_time.split(' ')[0]}</td>
                <td class="td-hover" scope="col">${result.going_time.split(' ')[1]}</td>
                <td class="td-hover" scope="col">${result.price}</td>
            `
            dashRes.appendChild(tr)
        })
    })
}

dashRes?getMy():null