console.log('client.js');

$(document).ready(function () {
  console.log('Test Clicker');
  // Establish Click Listeners
  setupClickListeners()
  // load existing todo on page load
  getTodo();

  // $('#listtodo').on('click', '.deletetodoBtn', deletetodo)

  // $('#listtodo').on('click', '.completedBtn', completedBtn)
}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // using a test object
    let todoSend = {
      todo: $('#todoIn').val(),
    };
    // call todo with the new obejct
    saveTodo(todoSend);
  });
}

function getTodo() {
  // console.log('in getTodo'); -- it works
  // ajax call to server to get todo list
  $.ajax({
    method: 'GET',
    url: '/todo'
  }).then(function (response) {
    // console.log('getTodo GET works!', response); --it works
    //empty out the todo table
    $('#listTodo').empty();

    // for(let todo of response){
    //   console.log('loops work!', todo);
    // } - loops work!!
    function completedCSS(){
      $('#completedBtn').body.style.backgroundColor = "pink";
    }
    
    //loop through the todo list from response
    //  and render onto the DOM
    for(let todo of response) {
      if (todo.completed === false) {
        $('#listTodo').append(`
          <tr data-id=${todo.id}>
            <td>${todo.toDo}</td>
            <td>
              <button class="completedBtn">Complete</button>
            </td>
            <td>
              <button class="deletetodoBtn">Delete</button>
            </td>
          </tr>
        `)
      }
      else {
        $('#listTodo').append(`
        <tr data-id=${todo.id}>
          <td>${todo.toDo}</td>
          <td>
            ${completedCSS()}
          </td>
          <td>
            <button class="deleteKoalaBtn">Delete</button>
          </td>
        </tr>
      `)
      }

    }
  })
}; // end getTodo

function saveTodo(newTodo) {
  console.log('in todo', newTodo);
  // ajax call to server to get todo 
  $.ajax({
    method: 'POST',
    url: "/todo",
    data: newTodo
  }).then(function (response) {
      console.log(response);
      getTodo();
      $('#todoIn').val('');
      
    }).catch(function (error) {
    console.log('The "/todo" ajax post request failed with error: ', error);
  })
}

// function deletetodo() {
//   //Grab the data-id from the row this button is in
//   let idToDelete = $(this).parent().parent().data('id');

//   $.ajax({
//     method: 'DELETE',
//     url: `/todo/${idToDelete}`
//   }).then(function (response) {
//     //Call on todo to update the DOM
//     getTodo();
//   }).catch(function(error) {
//     //Alert the user of the issue
//     alert('There was an error deleting this To Do List')
//     //Log the error in the console log
//     console.log(`Error Deleting ${idToDelete} error --> ${error}`);
//   })
// }

// function completedBtn() {
//   //Grab the data-id from the row this button is in
//   let idToUpdate = $(this).parent().parent().data('id');

//   $.ajax({
//     method: 'PUT',
//     url: `/todo/${idToUpdate}`,
//     data: {
//       completed: true
//     }
//   }).then(function (response) {
//     //When completed works update the DOM
//     getTodo();
//   }).catch(function(error) {
//     //Alert the user of the issue
//     alert('There was an error updating the To Do List');
//     //Log the error in the console log
//     console.log(`Error To Do List on ${idToUpdate}, error --> ${error}`);
//   })
// }