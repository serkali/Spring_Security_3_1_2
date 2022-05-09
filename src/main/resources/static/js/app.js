const url = 'http://localhost:8080/api/users'
let allUsers = document.querySelector('#allUsers')

//test.innerHTML = 'test'
function getUsers() {
    fetch(url)
        .then(response => response.json())
        .then(showUsers => {
            console.log(showUsers)
            allUsers.innerHTML = ''
            for (const showUsersKey of showUsers) {
                let nameRoles = '';
                for (let authority of showUsersKey.authorities) {
                    nameRoles += authority.authority.replace('ROLE_', '') + ' '
                }
                allUsers.innerHTML += `
                 <tr>
                            <td>${showUsersKey.id} </td>
                            <td>${showUsersKey.name}</td>
                            <td>${showUsersKey.username}</td>
                            <td>${showUsersKey.email}</td>
                       
                            <td><span>${nameRoles}</span></td>
                            

                            <!-- Красная Delete  синяя  Edit -->
                            <td>
                                <button type="button" class="btn btn-info"
                                        data-toggle="modal" data-target = "#edit">Edit
                                </button>
                            </td>
                            <td>
                                <button  type="button" class="btn btn-danger"
                                        data-toggle="modal">Delete
                                </button>
                            </td>
                        </tr>`
            }
        })
}

getUsers()
//Создание юзера
let addUserForm = document.querySelector('#createUser')
let rolelist = [
    {id: 1, authority: 'ROLE_ADMIN'},
    {id: 2, authority: 'ROLE_USER'}
]


function createUser() {
    addUserForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let name = addUserForm.querySelector('#name').value;
        let username = addUserForm.querySelector('#username').value
        let email = addUserForm.querySelector('#email').value
        let password = addUserForm.querySelector('#password').value
        let roles = () => {
            let arrayRoles = []
            let options = document.querySelector('#newRole').options
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    arrayRoles.push(rolelist[i])
                }
            }
            return arrayRoles;
        }
        let newUser = {
            name: name,
            username: username,
            email: email,
            password: password,
            roles: roles()
        }
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        })
            .then(k => {
                event.target.reset(), getUsers()
                document.querySelector('#nav-home-tab').classList.add('active')
                document.querySelector('#nav-profile-tab').classList.remove('active')
                document.querySelector('#nav-home').classList.add('active','show')
                document.querySelector('#nav-profile').classList.remove('active','show')

            })
    })

}

createUser()

