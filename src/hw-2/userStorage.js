let users = [];

export function getUsers() {
  return users;
}

export function setUsers(newUsers) {
  users = [...newUsers];
}

export default users;