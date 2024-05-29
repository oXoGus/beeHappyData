let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
}

let saveUserName = (userName) => {
    localStorage.setItem('userName', userName)
}


let getUserName = () => {
    return localStorage.getItem('userName')
}

let isLogged = () => {
    let token = localStorage.getItem('token')

    // renvoie true si il y a un token et false si n'y en a pas (transforme le null en false)
    return !!token
}

let getToken = () => {
    return localStorage.getItem('token');
}

// on exporte un objet pour pouvoir utiliser ses méthodes dans d'autre fichier
export const accountService = {
    saveToken, logout, isLogged, getToken, saveUserName, getUserName
}