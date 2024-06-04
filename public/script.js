document.getElementById('loadUsers').addEventListener('click', () => {
  fetch('/api/USER')
    .then(response => response.json())
    .then(users => {
      const usersList = document.getElementById('usersList');
      usersList.innerHTML = '';
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${user.NAME}, Age: ${user.AGE},id: ${user.id}`;
        usersList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching users:', error));
});
