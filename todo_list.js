const todoDiv = document.getElementById('todo_header');
const tasks = document.getElementById('tasks');
const arrow = document.getElementById('arrow');



todoDiv.addEventListener('click', function() {
		tasks.classList.toggle('hide');
		arrow.classList.toggle('up');
});

const arrow_bookmarks = document.getElementById('arrow_bookmarks');
const bookmarks_list = document.getElementById('bookmarks_list');
const bookmarks_header = document.getElementById('bookmarks_header');

bookmarks_header.addEventListener('click', function() {
		bookmarks_list.classList.toggle('hide');
		arrow_bookmarks.classList.toggle('up');
});


const arrow_finance = document.getElementById('arrow_finance');
const finance_list = document.getElementById('finance_list');
const finance_header = document.getElementById('finance_header');

finance_header.addEventListener('click', function() {
		finance_list.classList.toggle('hide');
		arrow_finance.classList.toggle('up');
});

const arrow_goals = document.getElementById('arrow_goals');
const goals_list = document.getElementById('goals_list');
const goals_header = document.getElementById('goals_header');

goals_header.addEventListener('click', function() {
		goals_list.classList.toggle('hide');
		arrow_goals.classList.toggle('up');
});