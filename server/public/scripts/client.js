console.log('client.js');

$(document).ready(function () {
  console.log('Test Clicker');
  // Establish Click Listeners
  setupClickListeners()
  // load existing toDo on page load
  getTodo();

  $('#listToDo').on('click', '.deleteToDoBtn', deleteToDo)

  $('#listToDo').on('click', '.completedBtn', completedBtn)
}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // using a test object
    let toDoSend = {
      toDo: $('#toDoIn').val(),
    };
    // call toDo with the new obejct
    saveToDo(toDoSend);
  });
}

function getTodo() {
  console.log('in getTodo');
  // ajax call to server to get toDo list
  $.ajax({
    method: 'GET',
    url: '/toDo'
  }).then(function (response) {
    //empty out the toDo table
    $('#listToDo').empty();

    //loop through the toDo list from response
    //  and render onto the DOM
    for(let toDo of response) {
      if (toDo.completed === false) {
        console.log('Looping the toDo', toDo);
        $('#listToDo').append(`
          <tr data-id=${toDo.id}>
            <td>${toDo.toDo}</td>
            <td>
              <button class="completedBtn">Complete</button>
            </td>
            <td>
              <button class="deleteToDoBtn">Delete</button>
            </td>
          </tr>
        `)
      }
      else {
        $('#listToDo').append(`
        <tr data-id=${toDo.id}>
          <td>${toDo.toDo}</td>
          <td>
            
          </td>
          <td>
            <button class="deleteKoalaBtn">Delete</button>
          </td>
        </tr>
      `)
      }

    }
  })
} // end getTodo

function saveToDo(newToDo) {
  console.log('in toDo', newToDo);
  // ajax call to server to get toDo 
  $.ajax({
    method: 'POST',
    url: "/toDo",
    data: newToDo
  }).then(function (response) {
      console.log(response);
      getTodo();
      $('#toDoIn').val('');
      
    }).catch(function (error) {
    console.log('The "/toDo" ajax post request failed with error: ', error);
  })
}

function deleteToDo() {
  //Grab the data-id from the row this button is in
  let idToDelete = $(this).parent().parent().data('id');

  $.ajax({
    method: 'DELETE',
    url: `/toDo/${idToDelete}`
  }).then(function (response) {
    //Call on toDo to update the DOM
    getTodo();
  }).catch(function(error) {
    //Alert the user of the issue
    alert('There was an error deleting this To Do List')
    //Log the error in the console log
    console.log(`Error Deleting ${idToDelete} error --> ${error}`);
  })
}

function completedBtn() {
  //Grab the data-id from the row this button is in
  let idToUpdate = $(this).parent().parent().data('id');

  $.ajax({
    method: 'PUT',
    url: `/toDo/${idToUpdate}`,
    data: {
      completed: true
    }
  }).then(function (response) {
    //When completed works update the DOM
    getTodo();
  }).catch(function(error) {
    //Alert the user of the issue
    alert('There was an error updating the To Do List');
    //Log the error in the console log
    console.log(`Error To Do List on ${idToUpdate}, error --> ${error}`);
  })
}