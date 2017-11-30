$( document ).ready(function() {


var dogArray = ["Basset Hound","Labrador Retriever","Bulldog","Poodle","German Shepherd","Boxer","Dachshunds","Beagle","Yorkshire Terriers","Shih Tzu","Pug","Chihuahua"]


function summonButtons() {

        
        $("#dogButtons").empty();

        //This creates the buttons. Yay! I finally do this right.
        for (var i = 0; i < dogArray.length; i++) {

          
          var a = $("<button>");
          a.addClass("btn btn-primary")
          a.addClass("stylebutton");
          
          a.attr("data-name", dogArray[i]);
         
          a.text(dogArray[i]);
          
          $("#dogButtons").append(a);
        }
      }

       $("#add-dog").on("click", function(event) {
        
        event.preventDefault();
        
        var animal = $("#animal-input").val().trim();

        dogArray.push(animal);
        
        summonButtons();

      });

       //api and ajax stuff

       $(document).on("click", ".stylebutton",  function() {
      
      var animal = $(this).attr("data-name");

      
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=TCXcbMxbOFU6qpJQnzWmEAKfnS5PxpSS&limit=10";

      
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        
        .done(function(response) {
         
          var results = response.data;

          //Loop dealing with the images

        $("#insertImage").empty();
          
          for (var i = 0; i < results.length; i++) {

            
            var animalDiv = $("<div class='picture'>");

            
            var p = $("<p>").text("Rating: " + results[i].rating);

            
            var animalImage = $("<img>");
            
            animalImage.attr("src", results[i].images.fixed_height_still.url);

            animalImage.attr("data-still", results[i].images.fixed_height_still.url );

            animalImage.attr("data-animate", results[i].images.fixed_height.url );

            animalImage.attr("data-state", "still" );
            animalImage.fadeIn("slow");

            
            animalDiv.append(p);
            animalDiv.append(animalImage);

            
            $("#insertImage").prepend(animalDiv);
          }
        });
    });
//animation stuff
$(document).on("click", "img", function() {
     
      var state = $(this).attr("data-state");
     
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });




summonButtons();

});