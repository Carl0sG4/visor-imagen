const locationMap = [
  // Atlantic west (Portugal)
  [
    "Braga",
    "Guimarães",
    "Porto",
    "Coimbra",
    "Lisbon",
    "Setúbal",
    "Évora"
  ],

  // Western Spain
  [
    "Vigo",
    "Oviedo",
    "Gijón",
    "León",
    "Valladolid",
    "Madrid",
    "Toledo"
  ],

  // Northern / Central Spain
  [
    "Santander",
    "Bilbao",
    "San Sebastián",
    "Zaragoza",
    "Valencia",
    "Alicante",
    "Murcia"
  ],

  // Southern Spain
  [
    "Barcelona",
    "Cordoba",
    "Seville",
    "Granada",
    "Cádiz",
    "Gibraltar"
  ],

  // Balearic Islands
  [
    "Palma (Mallorca)",
    "Pollensa (Mallorca)",
    "Ciutadella (Menorca)",
    "Menorca",
    "Ibiza Town",
    "Eivissa Old Town"
  ],

  // Canary Islands
  [
    "Puerto de la Cruz",
    "San Cristóbal de La Laguna",
    "Playa de Las Americas",
    "Costa Adeje",
    "Corralejo (Fuerteventura)",
    "Arrecife (Lanzarote)",
    "Fuerteventura Town",
    "Tenerife Town"
  ],

  // Southern → Northern France
  [
    "Nice",
    "Marseille",
    "Montpellier",
    "Toulouse",
    "Bordeaux",
    "Lyon",
    "Dijon",
    "Paris",
    "Strasbourg",
    "Lille"
  ],

  // Western / Central Europe
  [
    "Nantes",
    "Rennes",
    "Brest",
    "Brussels",
    "Amsterdam",
    "Hamburg",
    "Berlin",
    "Munich",
    "Vienna",
    "Zurich",
    "Geneva",
    "Monaco",
    "Andorra la Vella"
  ]
];

function normalizeLocationName(locationName) {
  return locationName
    .toLowerCase()
    .normalize("NFD")                 // split accents
    .replace(/[\u0300-\u036f]/g, "")  // remove accents
    .replace(/[()]/g, "")             // remove parentheses
    .replace(/,/g, "")                // remove commas
    .replace(/\s+/g, "-")             // spaces → hyphens
    .replace(/-+/g, "-")              // collapse multiple hyphens
    .trim();
}

function getImageFilepath(locationName) {
  return `images/${normalizeLocationName(locationName)}.png`;
}

function findCoordinatesByName(locationName) {
  for (let locationX = 0; locationX < locationMap.length; ++locationX)
    for (let locationY = 0; locationY < locationMap[locationX].length; ++locationY) {
      const localName = locationMap[locationX][locationY];

      if (localName === locationName)
        return { locationX, locationY };
    }

  return null;
}

let {
  locationX, locationY
} = findCoordinatesByName("Gibraltar");

const buttonNorth = document.getElementById("button-north");
const buttonWest = document.getElementById("button-west");
const buttonSouth = document.getElementById("button-south");
const buttonEast = document.getElementById("button-east");

const imageViewport = document.getElementById("image-viewport");
const locationLabel = document.getElementById("location-label");

{
  const locationName = locationMap[locationX][locationY];

  locationLabel.textContent = locationName;

  imageViewport.setAttribute("src", getImageFilepath(locationName));
}

function createHandler(targetDirection) {
  return function moveHandler(eventObject) {
    let sign;

    switch (targetDirection) {
      case "button-north":
      case "button-south": {
        sign = targetDirection === "button-north" ? -1 : 1;

        const column = locationMap[locationX];
        
        locationY = Math.min(
          Math.max(locationY + sign, 0),
          column.length - 1
        );

        break;
      }

      case "button-west":
      case "button-east": {
        sign = targetDirection === "button-west" ? -1 : 1;

        locationX = Math.min(
          Math.max(locationX + sign, 0),
          locationMap.length - 1
        );

        const column = locationMap[locationX];

        locationY = Math.min(locationY, column.length - 1);

        break;
      }

      default:
        console.error(`error: unknown move target '${targetDirection}'`);
        return;
    }

    const locationName = locationMap[locationX][locationY];
    locationLabel.textContent = locationName;
    imageViewport.setAttribute("src", getImageFilepath(locationName));
  };
}

{
  function handleButton(targetButton) {
    const { id: targetId } = targetButton;

    return targetButton.addEventListener("click", createHandler(targetId));
  }

  (
    handleButton(buttonNorth),
    handleButton(buttonSouth),
    handleButton(buttonWest),
    handleButton(buttonEast)
  );
};

