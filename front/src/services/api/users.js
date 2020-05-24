//Users table interface 

export async function getUsers() {
  const response = await fetch('/users')
  const body = await response.json()
  return body;
}

export async function getUser(userid) {
  const response = await fetch('/users/'+userid)
  const body = await response.json()
  return body;
}

export async function addUser( user ) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( user )
  }
  const response = await fetch('/users', options)
  const body = await response.json()
  return body;
}

export async function editUser( user, userid ) {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( user )
  }
  const response = await fetch('/users/'+userid, options)
  const body = await response.json()
  return body;
}

export async function deleteUser( userid ) {
  const options = {
    method: 'DELETE'
  }
  const response = await fetch('/users/'+userid, options)
  const body = await response.json()
  return body;
}

export default getUsers;