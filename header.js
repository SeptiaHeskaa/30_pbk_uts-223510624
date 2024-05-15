document.addEventListener("DOMContentLoaded", function() {
    const todosLink = document.getElementById("todos");
    const postsLink = document.getElementById("posts");
    const contentDiv = document.getElementById("app");

    todosLink.addEventListener("click", function(event) {
        event.preventDefault();
        fetch('https://223510624septi.vercel.app/todo')
            .then(response => response.json())
            .then(todos => {
                contentDiv.innerHTML = "<h2>Fitur Todos</h2>";
                if (todos.length === 0) {
                    contentDiv.innerHTML += "<p>Tidak ada todos untuk ditampilkan.</p>";
                } else {
                    const todoList = document.createElement('ul');
                    todos.forEach(todo => {
                        const listItem = document.createElement('li');
                        listItem.textContent = todo.title;
                        todoList.appendChild(listItem);
                    });
                    contentDiv.appendChild(todoList);
                }
            })
            .catch(error => console.error('Error fetching todos:', error));
    });

    postsLink.addEventListener("click", function(event) {
        event.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                contentDiv.innerHTML = "<h2>Fitur Postingan</h2>";
                const selectUser = document.createElement('select');
                selectUser.innerHTML = "<option value=''>Pilih Pengguna</option>";
                users.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = user.name;
                    selectUser.appendChild(option);
                });
                contentDiv.appendChild(selectUser);

                selectUser.addEventListener('change', function() {
                    const userId = this.value;
                    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                        .then(response => response.json())
                        .then(posts => {
                            const postList = document.createElement('ul');
                            posts.forEach(post => {
                                const listItem = document.createElement('li');
                                listItem.textContent = post.title;
                                postList.appendChild(listItem);
                            });
                            contentDiv.appendChild(postList);
                        })
                        .catch(error => console.error('Error fetching posts:', error));
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    });
});
