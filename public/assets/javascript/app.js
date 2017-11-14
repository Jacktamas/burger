$(document).ready(function(){

  $.fn.extend({
    animateCss: function (animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
      return this;
    }
  });

  $("#createBurger").on("click", function() {
    var newBurger = {
      burger: $(".burger-name").val().trim()
    };
    if(newBurger.burger !== ''){
      $('.burger-name').css('border-color', '');
      // Send the POST request.
      $.ajax("/burgers", {
        type: "POST",
        data: newBurger
      }).then(function(results) {
        if(results.id && results.burger_name){
          location.reload();
        }
      });
    }
    else {
      $('.burger-name')
      .animateCss('shake')
      .css('border-color', 'red');
    }
  });

  $(".updateBurger").on("click", function() {
    var id = $($(this)).attr('data-burgerid');
    var burgerName = $($(this)).attr('data-burgername');


    var updatedBurger = {
      burgerId: id,
      burgerName: burgerName
    };

    // Send the PUT request.
    $.ajax("/burgers/"+ id, {
      type: "PUT",
      data: updatedBurger
    }).then(function(response) {
      if(response){
        location.reload();
      }
    });
  });
})
