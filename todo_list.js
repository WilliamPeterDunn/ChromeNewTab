const todoDiv = document.getElementById('todo_header');
const tasks = document.getElementById('tasks');
const arrow = document.getElementById('arrow');
const arrow_bookmarks = document.getElementById('arrow_bookmarks');

const bookmarks_list = document.getElementById('bookmarks_list');
const bookmarks_header = document.getElementById('bookmarks_header');

todoDiv.addEventListener('click', function() {
		tasks.classList.toggle('hide');
		arrow.classList.toggle('up');
});

bookmarks_header.addEventListener('click', function() {
		bookmarks_list.classList.toggle('hide');
		arrow_bookmarks.classList.toggle('up');

		console.log('works');
});