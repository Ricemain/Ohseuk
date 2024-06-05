window.onload = function() {

  var imageUpload = document.getElementById("imageUpload");
  var imagePreview = document.querySelector(".image-preview");
  var selectedImage = document.getElementById("selectedImage");

  imageUpload.addEventListener("change", function(event) {
      var file = event.target.files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
          selectedImage.src = event.target.result;
          imagePreview.style.display = "block";
      };

      reader.readAsDataURL(file);
  });

  selectedImage.addEventListener("click", function() {
      var backgroundImage = selectedImage.src;
      document.body.style.backgroundImage = "url('" + backgroundImage + "')";
  });


  var inputText = document.getElementById("inputText");
  var inputField = document.getElementById("inputField");

  inputText.addEventListener("click", function(event) {
      inputText.style.display = "none";
      inputField.style.display = "block";
      inputField.focus();
  });

  inputField.addEventListener("input", function(event) {
      if (inputField.value === "") {
          inputField.style.display = "none";
          inputText.style.display = "block";
      }
  });
};
