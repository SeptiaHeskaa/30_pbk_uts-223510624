document.addEventListener("DOMContentLoaded", function() {
    const todosLink = document.getElementById("todos");
    const postsLink = document.getElementById("posts");
    const contentDiv = document.getElementById("content");

    todosLink.addEventListener("click", async function(event) {
        event.preventDefault();
        try {
            const response = await fetch('https://223510624septi.vercel.app/todo');
            const todos = await response.json();

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
        } catch (error) {
            console.error('Error fetching todos:', error);
            contentDiv.innerHTML = "<p>Terjadi kesalahan saat mengambil data Todos.</p>";
        }
    });

    postsLink.addEventListener("click", async function(event) {
        event.preventDefault();
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();

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

            selectUser.addEventListener('change', async function() {
                const userId = this.value;
                try {
                    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                    const posts = await response.json();

                    const postList = document.createElement('ul');
                    posts.forEach(post => {
                        const listItem = document.createElement('li');
                        listItem.textContent = post.title;
                        postList.appendChild(listItem);
                    });
                    contentDiv.appendChild(postList);
                } catch (error) {
                    console.error('Error fetching posts:', error);
                    contentDiv.innerHTML = "<p>Terjadi kesalahan saat mengambil data Postingan.</p>";
                }
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            contentDiv.innerHTML = "<p>Terjadi kesalahan saat mengambil data Pengguna.</p>";
        }
    });
});
