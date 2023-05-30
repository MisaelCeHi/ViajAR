var navigationElement = document.getElementById("header");

fetch("./nav.html")
  .then(response => response.text())
  .then(data => {
    navigationElement.innerHTML = data;
    // console.log(data);
  })
  .catch(error => {
    console.error("Error fetching navigation file:", error);
  });
