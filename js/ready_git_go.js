$(document).ready(() => {
  console.log('HELLO');
  $('#command-input').focus()

  $('.terminal').click(() => {
    $('#command-input').focus()
  })

  $('#command-input').keyup( e => {
    if(e.which === 13){
      $(e.target).addClass('hidden')
      console.log('INPUT CHANGED', e.target.value);
      $('#terminal-command-list').append(`<li>${e.target.value}</li>`)

      if (e.target.value.slice(0,3) === 'git'){
        $('#terminal-command-list').append(`<div>${e.target.value} is a valid function </div>`)
      } else if (e.target.value === 'clear') {
        $('#terminal-command-list').empty()
      } else if (e.target.value === '') {
        
      } else {
        $('#terminal-command-list').append(`<div class='invalid'>${e.target.value} is not a valid function </div>`)
      }
      // console.log('enter');
      $('#terminal-command-list').
      animate({scrollTop: $('#terminal-command-list').
      prop('scrollHeight')}, 50)
      e.target.value = ''
      $(e.target).removeClass('hidden')
      $('#command-input').focus()
    }

  })
})
