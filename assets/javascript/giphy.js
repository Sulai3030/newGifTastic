//1. create the array
$( document ).ready(function() 
{

 var animals = ["trees", "birds", "fish", "food"];

//2. create the button for each array

// Function for displaying movie data
function renderButtons() 
{

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < animals.length; i++) 
  {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("animals-btn");
    // Adding a data-attribute
    a.attr("data-name", animals[i]);
    // Providing the initial button text
    a.text(animals[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }

  //3. add a new button

// This function handles events where a movie button is clicked
//click now works but needs targeting for the specifc button (NEED TO FIX)
  $("#add-animal").on("click", function(event) 
  {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newAnimal = $("#animal-input").val().trim();

    // Adding movie from the textbox to our array
    animals.push(newAnimal);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    $("#animal-input").val("");
    console.log(animals);

  });

  //4. when user click on buttons gifys appear
// Event listener for all button elements
    // $("#buttons-view").find(".animals-btn").click( function() 
    // {

      //this needs to be fixed the buttons for gif is not correctly linked
      $("button").on("click", function() 
      {
      var buttonDiv=($("#buttons-view").children().find(".animals-btn"));

      // In this case, the "this" keyword refers to the button that was clicked
      //var person = $(this).find(buttonDiv + "[data-name'" + current +"']");
      //var person = buttonDiv.prevObject;

      var person = $(this).attr("data-name");
      //console.log($(this).person)

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .then(function(response) 
        {
         
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) 
          {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") 
            {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

               console.log(results[i].images.fixed_height_small.url);

              // Creating an image tag
              var personImage = $("<img>");



              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height_small_still.url);
              personImage.attr("data-still", results[i].images.fixed_height_small_still.url);
              personImage.attr("data-animate", results[i].images.fixed_height_small.url);
              personImage.attr("data-state", "still");
              personImage.addClass("gif");

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }

          //5. when user clicks on gify either stop or run animation
          $(".gif").on("click", function() 
          {


            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        });
    });



}

      //renderButtons();









   renderButtons(); 
});










// var animals = ["trees", "birds", "fish", "food"];
// var res = str.split(" ");
// var results;
// console.log("test");

// // function nature()
// // {
// //     var animals = ["trees", "birds", "fish", "food"];
// //     var res = str.split("<div id="gifs-appear-here">");
// //     document.getElementById("topics").innerHTML = res;
// // };

// let animals
// $("button").on("click", function() {
//     // In this case, the "this" keyword refers to the button that was clicked
//     var animals = $(this).attr("data-person");

//     // Performing our AJAX GET request
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       // After the data comes back from the API
//       .then(function(response) {
//         // Storing an array of results in the results variable
//         var results = response.data;

//         // Looping over every result item
//         for (var i = 0; i < results.length; i++) {

//             // Creating a div with the class "item"
//             var gifDiv = $("<div class='item'>");

//             // Creating an image tag
//             var personImage = $("<img>");

//             // Giving the image tag an src attribute of a proprty pulled off the
//             // result item
//             personImage.attr("src", results[i].images.fixed_height.url);

//             // Appending the paragraph and personImage we created to the "gifDiv" div we created
//             gifDiv.append(p);
//             gifDiv.append(personImage);

//             // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
//             $("#gifs-appear-here").prepend(gifDiv);
//           }
//         }
//       );
//   });
// </script>