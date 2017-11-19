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

  function createBurger() {
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
        if(results.burger_name){
          $(window).scrollTop($('#top').offset().top);
          location.reload();
        }
      });
    }
    else {
      $('.burger-name')
      .animateCss('shake')
      .css('border-color', 'red');
    }
  }
  $(".burger-name").on("keydown", function(e){
    if(e.which === 13){
      createBurger();
    }
  });
  $("#createBurger").on("click", function(){
    createBurger();
  });

  $(".updateBurger").on("click", function(){
    var id = $($(this)).attr('data-burgerid');
    var burgerName = $($(this)).attr('data-burgername');

    var updatedBurger = {
      burgerId: id,
      burgerName: burgerName
    }

    // Send the PUT request.
    $.ajax("/burgers/"+ id, {
      type: "PUT",
      data: updatedBurger
    }).then(function(results){
      if(results){
        location.reload();
      }
    });
  });
});
