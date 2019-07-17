var todoList ={
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText, 
      completed: false}
    );  
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;    
    // Get number of completed todos
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo) {
      // Case 1: if everything is true (completed), make everything false (uncompleted)
      if (completedTodos === totalTodos) {
          todo.completed = false;
      }else{
      // Case 2: Otherwise, make everything true (completed)
        todo.completed = true;
      }
    });
  },
};





var handlers = {
  addTodo: function(){
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function(position, text){
    // var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    // var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    // todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    todoList.changeTodo(position, text.value);
    // changeTodoPositionInput.value = '';
    // changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position){
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  }
};







var view = { //View object used for the user interface
  displayTodos: function() {
    var todosUl = document.querySelector('ul'); //Select our ul
    todosUl.innerHTML = (''); //Making our ul empty to rewrite its content, since we run the displayTodos function each time the user make an action

    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li'); //Create a li element 
      
      var completionDiv = document.createElement('div'); 
      completionDiv.className = 'completionDiv'; 
      var box = todoLi.appendChild(completionDiv);
      
      var todoText = todo.todoText; 
      
      if(todo.completed === true) { //Verify if the todo is completed
        // todoText = /*'(x) ' + */todo.todoText; //If yes, save a way to see it with it assigned todo
        box.innerHTML = '(x) ';
        
      }else{
        // todoText = /*'( ) ' + */todo.todoText; //If no, save a different way to see it with it assigned todo
        box.innerHTML = '( ) ';
      }
      
      todoLi.id = position; //Set the id of the li as the array position for it assigned todo
      
      
      // box.appendChild(this.createToggleCompletedButton());
      todoLi.appendChild(this.createParagraph());// **************************************************************************TEST FOR SELECTING
      todoLi.querySelector('p')/* ***TEST*** */.textContent = todoText //Write in the li the content of our li
      todoLi.appendChild(this.createToggleCompletedButton()); //Write a delete button with its todo
      todoLi.appendChild(this.createDeleteButton()); //Write a delete button with its todo
      todosUl.appendChild(todoLi); //Write the li with its content in the ul
    }, this); // */!\* second argument used to having 'this' refering to the view object since its in a callback function */!\*
  },
  createParagraph() { //******************************************************************************************************TEST FOR SELECTING
    var paragraph = document.createElement('p');
    paragraph.className = 'task';
    paragraph.setAttribute('contenteditable', 'true');
    return paragraph;
  },
  createCompletionDiv() {
    var completionDiv = document.createElement('div'); 
    completionDiv.className = 'completionDiv'; 
    return completionDiv;
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button'); //Create a button
    deleteButton.textContent = 'Delete ' ; //Write the content of the button
    deleteButton.className = 'deleteButton'; //Add a class to this button
    return deleteButton; //Return the full button 
  },
  createToggleCompletedButton: function() {
    var toggleCompletedButton = document.createElement('button'); //Create a button
    toggleCompletedButton.textContent = 'Toggle Complete' ; //Write the content of the button
    toggleCompletedButton.className = 'toggleCompleteButton'; //Add a class to this button
    return toggleCompletedButton; //Return the full button 
  },
  setUpEventListeners: function() {
    var todoUl = document.querySelector('ul'); //Select our ul
        
    todoUl.addEventListener('click', function(event) { //Listen click on the UL
      var elementClicked = event.target; //Determine what was the element clicked on
      if (elementClicked.className === 'deleteButton') { //If the element clicked on have 'deleteButton' as a class name
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id)); //Execute deleteTodo function with specifying the position 
                                                                     // by taking the id as a string and parsing it as an number
      }
      if (elementClicked.className === 'toggleCompleteButton') { //If the element clicked on have 'toggleCompleteButton' as a class name
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id)); //Execute toggleCompleted function with specifying the position 
                                                                          // by taking the id as a string and parsing it as an number
        
      }      
    }, this);
    
    todoUl.addEventListener('input', function(event) { //Listen input changes in the UL
      var inputChange = event.target;
      var position = parseInt(inputChange.parentNode.id);
      var text = inputChange.textContent;      
      // console.log(inputChange);
      todoList.changeTodo(position , text);
    });
    
    var addInput = document.querySelector('#addTodoTextInput');
    addInput.addEventListener('keyup', function(event) { //Listen input changes in the UL
      var inputKeyUp = event;
      var key = event.key;

      if ( key === 'Enter') {
        handlers.addTodo();
      }
    });
  }
};

view.setUpEventListeners(); //Execute the eventListener