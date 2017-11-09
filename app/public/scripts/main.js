$('#logout_button').click(e => {
  $.ajax({
    url: '/logout',
    method: 'POST',
    complete: () => {
      document.location.href = '/'
    }
  })
})
