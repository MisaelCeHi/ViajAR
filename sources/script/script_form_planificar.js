const itinerary_type = document.querySelectorAll(".itinerary_type");
const endDate_container = document.querySelector("#endDate-container");

// const itinerary_type_one_woy = document.getElementById("one_way");
itinerary_type.forEach(type => {
    type.addEventListener("click", (e) => {
        if (e.target.id == "round_trip") {
        //   console.log("round_trip");
        endDate_container.style.display = "block";
        endDate_container.lastElementChild.ariaRequired = true;
        endDate_container.lastElementChild.required = true;
      } else if(e.target.id == "one_way") {
        endDate_container.style.display = "none";
        endDate_container.lastElementChild.ariaRequired = false;
        endDate_container.lastElementChild.required = false;
      }
    });
});


// Personas section
document.addEventListener("click", (e) => {
    // const btnDone = document.querySelector("#button-done");
    (e.target.id === "button-done") ? e.target.parentElement.parentElement.parentElement.classList.toggle("active"):{};
    console.log(e);

    const isDropdownLink = e.target.matches("[data-dropdown-link]");
    if (!isDropdownLink && e.target.closest("[data-dropdown]") != null) {
        divPersonasDone();
        return
    }
    
    let currentDropdown;
    if (isDropdownLink){
        currentDropdown = e.target.closest("[data-dropdown]");
        currentDropdown.classList.toggle("active");
        // console.log(currentDropdown);
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if(dropdown === currentDropdown) return
        dropdown.classList.remove("active");    
    })
})
  

function divPersonasDone() {
    let totalAdultos = cantidadAdultos.value;
    let totalInfante = cantidadInfante.value;
    cantidadPersonas.value = `Adultos: ${totalAdultos}${
      totalInfante != 0 ? " - Niños: " + totalInfante : ""
    }`;
}