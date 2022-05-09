const url = 'http://localhost:8080/api/user'
let pageUser = document.querySelector('#getOneUser')
//страница с юзерами
function getOneUser() {
    fetch(url)
        .then(response => response.json())
        .then(user => {
            let nameRoles = '';
            for (let authority of user.authorities) {
                nameRoles += authority.authority.replace('ROLE_', '') + ' '
            }
            pageUser.innerHTML += `
                 <tr>
                            <td>${user.id} </td>
                            <td>${user.name}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                       
                            <td><span>${nameRoles}</span></td>
                            
                            </tr>
                            `;
        })
}
getOneUser()
