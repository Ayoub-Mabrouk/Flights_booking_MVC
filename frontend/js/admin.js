authUser = new User()
!authUser.checkAuth() ? window.location.replace('http://localhost:3000/assets/pages/login.html'):null



// change user name in nav 

if(!authUser.currentUser){
    let User = authUser.getUserInfo()

    if(User.role != "Admin"){
        window.location.replace('http://localhost:3000/')
    }
}
