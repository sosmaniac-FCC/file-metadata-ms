$(() => {
  $.get("/update", (response) => {
    const el = document.getElementById("input-field");
    
    if (typeof response[0] != "undefined") {
      if (typeof response == "object" && response[0].iteration > 0) {
        try {
          el.innerHTML = "Size of " + response[0].file.originalname + " is " + response[0].file.size + " bytes";
        }
        catch (e) {
          el.innerHTML = "Null submission!";
        }
      }
      else {
        el.innerHTML = "Welcome!";
      }
    }
    else {
      el.innerHTML = "Welcome!";
    }
  });
});
