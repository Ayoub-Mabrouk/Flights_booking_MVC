class Reservation {

    url = 'http://localhost/MVC/reservation'
    all = []
    Token
    flightId

    constructor() {
        this.Token = this.Token ? this.Token : localStorage.getItem("Token")
    }


    
    getReservations = async () => {
        return fetch(`${this.url}/reservations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.Token}`
            },
        }).then(Response => Response.json()).then(data => {
            this.all = []
            this.all = data
        })
    }

    getMyReservations = async () => {
        return fetch(`${this.url}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.Token}`
            },
        }).then(Response => Response.json()).then(data => {
            this.all = []
            this.all = data
        })
    }



    delete = async (id) => {
        return fetch(`${this.url}/delete/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.Token}`
            },
        }).then(Response => Response.json()).then(data => {

        })
    }


    add = async (user) => {

        return fetch(`${this.url}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.Token}`
            },
            body: JSON.stringify(user)
        })
            .then(Response => Response.json())
            .then(data => {
                return data
            })
    }

    edit = async (id, body) => {
        return fetch(`${this.url}/edit/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.Token}`
            },
            body: JSON.stringify(body)
        })
            .then(Response => Response.json())
            .then(data => {
                console.log(data);
            })
    }

    // getFlightsBySearch = async (body) => {
    //     return fetch(`${this.url}/search`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer ${this.Token}`
    //         },
    //         body: JSON.stringify(body)
    //     })
    //         .then(Response => Response.json())
    //         .then(data => {
    //             this.all = data
    //         })
    // }

}