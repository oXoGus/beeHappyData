let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let logout = () => {
    localStorage.removeItem('token')
}

let isLogged = () => {
    let token = localStorage.getItem('token')

    // renvoie true si il y a un token et false si n'y en a pas (transforme le null en false)
    return !!token
}


// on exporte un objet pour pouvoir utiliser ses méthodes dans d'autre fichier
export const accountService = {
    saveToken, logout, isLogged
}