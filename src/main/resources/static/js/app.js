//все юзеры
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
                                <button type="button" class="btn btn-info" onclick="editModalId(${showUsersKey.id})"
                                        data-toggle="modal" data-target = "#edit">Edit
                                </button>
                                </td>
                               
                               <td>
                                <button type="button" class="btn btn-danger" onclick="delModalId(${showUsersKey.id})" 
                                data-toggle="modal" data-target="#delete">
                                    Delete
                                </button>
                            </td>
                               
                            
                           <!--<td>
                            <button type="button" class="btn btn-primary btn-edit" onclick="editModalId(user.id})" data-bs-toggle="modal" data-bs-target="#edit" >
                                    Edit
                            </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="delModalId(user.id})" data-bs-toggle="modal" data-bs-target="#exampleModalDel">
                                    Delete
                                </button>
                            </td>-->
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
                document.querySelector('#nav-home').classList.add('active', 'show')
                document.querySelector('#nav-profile').classList.remove('active', 'show')

            })
    })

}

createUser()

// получение юзера по user.id через onclick на кнопке и заполнение формы редактирования
function editModalId(id) {
    let editForm = document.querySelector('#formId')
    const urlEdit = "http://localhost:8080/api/users/" + id;

    fetch(urlEdit)
        .then(response => response.json())
        .then(userEdit => {

            let inputEdit = editForm.querySelectorAll('.formEdit');
            for (let inputEditElement of inputEdit) {

                switch (inputEditElement.name) {
                    case 'id':
                        inputEditElement.value = userEdit.id
                        break;
                    case 'name':
                        inputEditElement.value = userEdit.name
                        break;
                    case 'username':
                        inputEditElement.value = userEdit.username
                        break;
                    case 'email':
                        inputEditElement.value = userEdit.email
                        break;
                    case 'password':
                        inputEditElement.value = userEdit.password
                        break;
                }

            }
        });
//отправка формы для изменения юзера
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let id = editForm.querySelector('#idEdit').value
        let name = editForm.querySelector('#nameEdit').value;
        let username = editForm.querySelector('#usernameEdit').value;
        let email = editForm.querySelector('#emailEdit').value;
        let password = editForm.querySelector('#passwordEdit').value;
        let roles = () => {
            let arrayRoles = []
            let options = document.querySelector('#editRole').options
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    arrayRoles.push(rolelist[i])
                }
            }
            return arrayRoles;
        }

        let editUser = {
            id: id,
            name: name,
            username: username,
            email: email,
            password: password,
            roles: roles()
        }
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editUser)
        }).then(r => {
            console.log(editUser)
            event.target.reset();
            getUsers();
            $('#edit').modal('hide');
        });
    });
}
//удаление юзера
function delModalId(id) {
    let delForm = document.querySelector('#formDel');
    const urlDel = "http://localhost:8080/api/users/" + id;

    fetch(urlDel)
        .then(response => response.json())
        .then(userDel => {

            let inputDel = delForm.querySelectorAll('.inputDel');
            for (let inputDelElement of inputDel) {

                switch (inputDelElement.name) {
                    case 'id':
                        inputDelElement.value = userDel.id
                        break;
                    case 'name':
                        inputDelElement.value = userDel.name
                        break;
                    case 'username':
                        inputDelElement.value = userDel.username
                        break;
                    case 'email':
                        inputDelElement.value = userDel.email
                        break;
                    case 'password':
                        inputDelElement.value = userDel.password
                        break;
                }

            }
        });
//отправка формы для изменения юзера
    delForm.addEventListener('submit', (event) => {
        event.preventDefault();

        fetch(urlDel, {
            method: 'DELETE',
        }).then(r => {

            event.target.reset();
            getUsers();
           $('#delete').modal('hide');
        });
    });
}


