// Counts the number of characters typed in and changes their color
$(document).ready(function() {
  
  $('textarea').on('input', function (event) {
    let len = $(this).val().length
    let $counter= $(this).parent('form').find('.counter')
    
    updateCountdown($counter, len)
  })
  
})

function updateCountdown($counter, len) {
  let charsLeft = 140 - len
  $counter.text(charsLeft)
  $counter.css('color', 'black')
  if (charsLeft < 0) {
    $counter.css('color', 'red')
  }
  
};
