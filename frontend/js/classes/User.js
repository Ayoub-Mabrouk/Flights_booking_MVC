class User {
    token = ""
    url = 'http://localhost/MVC/user'
    userData

   


    login = (email, password) => {
        fetch(`${this.url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        }).then(response => response.json()).then((data) => {
            localStorage.setItem('Token', data.Token)
            this.currentUser = data
            window.location.replace('http://localhost:3000')
        })
    }

    register = (data) => {
        fetch(`${this.url}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then((data) => {
            localStorage.setItem('Token', data.Token)
            this.currentUser = data
            window.location.replace('http://localhost:3000')
        })
    }



    checkAuth = () => {
        this.Token = localStorage.getItem('Token')
        return this.Token
    }

    isAdmin = () => {
        dyToken = ""
        if (!this.Token) {
            this.Token = localStorage.getItem('Token')
        } else {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            dyToken = JSON.parse(jsonPayload).role;
        }
        return dyToken
    }

    getUserInfo = () => {
        if (!this.Token) {
            this.Token = localStorage.getItem('Token')
            var base64Url = this.Token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            this.currentUser = JSON.parse(jsonPayload).role;
        } else {
            var base64Url = this.Token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            this.currentUser = JSON.parse(jsonPayload);
        }
        return this.currentUser
    }

    getUserByCin = async (cin) => {
        fetch(`${this.url}/user/${cin}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.Token}`
            },
        }).then(response => response.json()).then((data) => {
            this.userData = data
        })

    }

    getLogs = () => {

    }


}