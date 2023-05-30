// Search Flights RoundTrip
async function searchFlightRoundTrip(
  depDate,
  retDate,
  destCode,
  oriCode,
  adults,
  children
) {
  const url = `https://priceline-com-provider.p.rapidapi.com/v2/flight/roundTrip?sid=iSiX639&adults=${adults}&departure_date=${depDate}%2C%20${retDate}&destination_airport_code=${destCode}%2C${oriCode}&origin_airport_code=${oriCode}%2C${destCode}&children=${children}&convert_currency=ARS`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9aafa7d569msh778b47f98a52115p1b0b56jsn4330c11f991a",
      "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let results = result.getAirFlightRoundTrip.results.result.itinerary_data;
    console.log(results);
    for (const itinerary_key in results) {
      let itinerary = results[itinerary_key];
      let price = itinerary.price_details.baseline_base_fare;
      let accepted_cc = itinerary.price_details.accepted_credit_cards;

      let slice_data = itinerary.slice_data.slice_0;
      let airline = slice_data.airline;
      let arrival = slice_data.arrival;
      let departure = slice_data.departure;
      let flight_data = slice_data.flight_data;
      let info = slice_data.info;

      let liResult = resultsUl.appendChild(document.createElement("li"));

      // Price Info
      let pPrice = liResult.appendChild(document.createElement("p"));
      pPrice.innerText = price + " $";

      // Airline Info (Name, code, logo,)
      let divAirlineInfo = liResult.appendChild(document.createElement("div"));
      let pAirlineName = divAirlineInfo.appendChild(
        document.createElement("p")
      );
      let logoAirline = divAirlineInfo.appendChild(
        document.createElement("img")
      );
      pAirlineName.innerText = airline.name;
      logoAirline.src = airline.logo;

      async function createInfo(state) {
        // Arrival-Departure Info (airport, datetime)
        let divInfo = liResult.appendChild(document.createElement("div"));

        // Arrival-reparture airport Info (airport city, airport country, airport name, airtport code)
        let divAirport = divInfo.appendChild(document.createElement("div"));
        let pAirportName = divAirport.appendChild(document.createElement("p"));
        let pAirportCode = divAirport.appendChild(document.createElement("p"));
        let pAirportCity = divAirport.appendChild(document.createElement("p"));
        let pAirportCountry = divAirport.appendChild(
          document.createElement("p")
        );
        pAirportCity.innerText = state.airport.city;
        pAirportCountry.innerText = state.airport.country;
        pAirportName.innerText = state.airport.name;
        pAirportCode.innerText = state.airport.code;

        //Arrival-Departure datetime info (date, time)
        let divDate = divInfo.appendChild(document.createElement("div"));
        let pDate = divDate.appendChild(document.createElement("p"));
        let pTime = divDate.appendChild(document.createElement("p"));
        pDate.innerText = state.datetime.date_display;
        pTime.innerText = state.datetime.time_12h;
      }

      await createInfo(arrival);
      await createInfo(departure);
    }
  } catch (error) {
    console.error(error);
  }
}

async function searchFlightOneWay(
  depDate,
  oriCode,
  destCode,
  adults,
  children
) {
  const url = `https://priceline-com-provider.p.rapidapi.com/v2/flight/departures?adults=${adults}&sid=iSiX639&departure_date=${depDate}&origin_airport_code=${oriCode}&destination_airport_code=${destCode}&convert_currency=ARS&children=${children}&currency=ARS`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9aafa7d569msh778b47f98a52115p1b0b56jsn4330c11f991a",
      "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    let results = result.getAirFlightDepartures.results.result.itinerary_data;
    console.log(results);
    for (const itinerary_key in results) {
      let itinerary = results[itinerary_key];
      let price = itinerary.price_details.baseline_base_fare;
      let accepted_cc = itinerary.price_details.accepted_credit_cards;

      let slice_data = itinerary.slice_data.slice_0;
      let airline = slice_data.airline;
      let arrival = slice_data.arrival;
      let departure = slice_data.departure;
      let flight_data = slice_data.flight_data;
      let info = slice_data.info;

      let liResult = resultsUl.appendChild(document.createElement("li"));

      // Price Info
      let pPrice = liResult.appendChild(document.createElement("p"));
      pPrice.innerText = price + " $";

      // Airline Info (Name, code, logo,)
      let divAirlineInfo = liResult.appendChild(document.createElement("div"));
      let pAirlineName = divAirlineInfo.appendChild(
        document.createElement("p")
      );
      let logoAirline = divAirlineInfo.appendChild(
        document.createElement("img")
      );
      pAirlineName.innerText = airline.name;
      logoAirline.src = airline.logo;

      async function createInfo(state) {
        // Arrival-Departure Info (airport, datetime)
        let divInfo = liResult.appendChild(document.createElement("div"));

        // Arrival-reparture airport Info (airport city, airport country, airport name, airtport code)
        let divAirport = divInfo.appendChild(document.createElement("div"));
        let pAirportName = divAirport.appendChild(document.createElement("p"));
        let pAirportCode = divAirport.appendChild(document.createElement("p"));
        let pAirportCity = divAirport.appendChild(document.createElement("p"));
        let pAirportCountry = divAirport.appendChild(
          document.createElement("p")
        );
        pAirportCity.innerText = state.airport.city;
        pAirportCountry.innerText = state.airport.country;
        pAirportName.innerText = state.airport.name;
        pAirportCode.innerText = state.airport.code;

        //Arrival-Departure datetime info (date, time)
        let divDate = divInfo.appendChild(document.createElement("div"));
        let pDate = divDate.appendChild(document.createElement("p"));
        let pTime = divDate.appendChild(document.createElement("p"));
        pDate.innerText = state.datetime.date_display;
        pTime.innerText = state.datetime.time_12h;
      }

      await createInfo(arrival);
      await createInfo(departure);
    }
  } catch (error) {
    console.error(error);
  }
}

const form = document.getElementById("myForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  console.log(formObject);
  if (formObject.itinerary_type_opt == "one_way"){
    console.log("one_way");
    searchFlightOneWay(
      depDate = formObject.startDate,
      destCode = arrivalAir.dataset["code"],
      oriCode=departureAir.dataset["code"],
      adults=formObject.adults,
      children=formObject.children,
    )
  } else if (formObject.itinerary_type_opt == "round_trip") {
    searchFlightRoundTrip(
      depDate = formObject.startDate,
      retDate = formObject.endDate,
      oriCode = departureAir.dataset["code"],
      destCode = arrivalAir.dataset["code"],
      adults = formObject.adults,
      children = formObject.children,
    )
  }
  // searchFlight(
  //   depDate=formObject.startDate,
  //   retDate=formObject.endDate,
  //   destCode=arrivalAir.dataset["code"],
  //   oriCode=departureAir.dataset["code"],
  //   adults=formObject.adults,
  //   children=formObject.children,
  //   );
});



function date() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDateMin = `${year}-${month}-${day}`;
  const formattedDateMax = `${year}-${month}-${parseInt(day) + 1}`;

  calendarStartDate.min = formattedDateMin;
  calendarEndDate.min = formattedDateMax;
}

// let autoComSet = document.getElementById("autoCom1");
let departureAir = document.getElementById("origen");
let arrivalAir = document.getElementById("destino");
let calendarStartDate = document.getElementById("startDate");
let calendarEndDate = document.getElementById("endDate");

let cantidadPersonas = document.getElementById("cantidad");

let cantidadAdultos = document.getElementById("adultos");
let cantidadInfante = document.getElementById("infantes");

let resultsUl = document.getElementById("results");

// Search inputs
const inputOrigen = document.getElementById("origen");
const inputDestino = document.getElementById("destino");
let timeoutInput1, timeoutInput2;
let time;

inputOrigen.addEventListener("input", () => {
  clearTimeout(timeoutInput1);
  timeoutInput1 = setTimeout(() => {
    console.log("----");
    const value = inputOrigen.value;
    const tagId = inputOrigen.id;
    const ulComp = document.getElementById("autoCom1");
    if (value.length > 2) {
      // ulComp.style.display = "block";
      getLocation(value, tagId, ulComp);
    } else{
      ulComp.style.display = "none";
    }
  }, 500);
});

inputDestino.addEventListener("input", () => {
  clearTimeout(timeoutInput2);
  timeoutInput2 = setTimeout(() => {
    console.log("----");
    const value = inputDestino.value;
    const tagId = inputDestino.id;
    const ulComp = document.getElementById("autoCom2");
    if (value.length > 2) {
      getLocation(value, tagId, ulComp);
    }
  }, 600);
});



// Get country name
async function getCountry(id) {
  const url_country = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${id}`;
  const options_country = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "08ea73b384msh06eb6029ee92cb9p1c2484jsne5a2b1b3adf7",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url_country, options_country);
    if (response.status == 200) {
      const result = await response.json();
      return `, ${result.data.name}`;
    } else return "";
  } catch (error) {
    console.error(error);
  }
}

function getOrigin(event, tagId) {
  // console.log(event, tagId);
  let tag = document.getElementById(tagId);
  tag.value = event.target.innerText;
  tag.dataset["code"] = event.target.dataset["code"];
  event.target.parentElement.parentElement.classList.remove("active")
  console.log(event);
}

// Search Locations
async function getLocation(value, tag, ul) {
  ul.style.display = "block";

  const url = `https://priceline-com-provider.p.rapidapi.com/v2/flight/autoComplete?string=${value}&regions=true&spellcheck=true&airports=true&cities=true&pois=true&hotels=true`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9aafa7d569msh778b47f98a52115p1b0b56jsn4330c11f991a",
      "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let similitudes = result.getAirAutoComplete.results.getSolr.results;
    if (similitudes.status_code == 100) {
      if (!similitudes.data) {
        ul.innerText = "No matching results found.";
      } else {
        ul.innerText = "";
        if (similitudes.data.airport_data) {
          // console.log(similitudes.data);
          let aeropuertos = similitudes.data.airport_data;
          for (let aeropuerto in aeropuertos) {
            let nombreAeropuerto = aeropuertos[aeropuerto].airport;
            let ciudad = aeropuertos[aeropuerto].city;
            let iata = aeropuertos[aeropuerto].iata;
            let codigoPais = aeropuertos[aeropuerto].country_code;
            ul.innerHTML += `<li data-code="${iata}" onclick="getOrigin(event, '${tag}')">${ciudad}, ${codigoPais} - ${nombreAeropuerto} (${iata})</li> <br>`;
          }
        }
        // if (similitudes.data.city_data) {
        //   let ciudades = similitudes.data.city_data;
        //   for (let ciudad in ciudades) {
        //     let nombre = ciudades[ciudad].city;
        //     let cityID = ciudades[ciudad].id;
        //     let nombrePais = ciudades[ciudad].country;
        //     let codigoPais = ciudades[ciudad].country_code;
        //     ul.innerHTML += `<li data-code="${cityID}" onclick="getOrigin(event, '${tag}')">${nombre}, ${nombrePais} - ${codigoPais}</li> <br>`;
        //   }
        // }
      }
    } else if (similitudes.status_code == 500) {
      ul.innerText = "No matching results found.";
    }
  } catch (error) {
    console.error(error);
  }
}

function start() {
  date();
}

window.addEventListener("load", start);
