let input = prompt("What should I do?");
const todos = [];
while (input !== 'quit' && input !== 'q') {
  switch (input) {
    case 'list':
      console.log('***********');
      todos.forEach(item => console.log(item));
      console.log('***********');
      break;
    case 'new':
      const newTodo = prompt("Type in new todo:");
      todos.push(newTodo);
      console.log(`${newTodo} added to list`);
      break;
    case 'delete':
      const toDelete = prompt("Which todo to delete?");
      if (todos.indexOf(toDelete) !== -1){
        todos.splice(todos.indexOf(toDelete),1);
        console.log(`${toDelete} deleted from todos`);
      } else {
        console.log(`${toDelete} is not in list. Please try again.`);
      }
      break;
  }
  input = prompt("What should I do?");
}
console.log("You quit the app");
