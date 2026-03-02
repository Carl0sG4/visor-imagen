const locationMap = [
  // Northern Portugal / Galicia
  [
    "Braga",
    "Guimarães",
    "Porto",
    "Coimbra",
    "Vigo",
    "Lisbon",
    "Évora",
    "Setúbal"
  ],

  // Northern Spain
  [
    "Bilbao",
    "San Sebastián",
    "Santander",
    "Valladolid",
    "Oviedo",
    "Gijón",
    "León",
    "Zaragoza"
  ],

  // Central / Southern Spain
  [
    "Madrid",
    "Toledo",
    "Cordoba",
    "Seville",
    "Granada",
    "Cádiz",
    "Alicante",
    "Valencia"
  ],

  // Eastern Spain / Balearics
  [
    "Barcelona",
    "Murcia",
    "Palma (Mallorca)",
    "Pollensa (Mallorca)",
    "Ibiza Town",
    "Ciutadella (Menorca)",
    "Mahón (Menorca)",
    "Eivissa Old Town"
  ],

  // Canary Islands
  [
    "Costa Adeje",
    "Arrecife (Lanzarote)",
    "Corralejo (Fuerteventura)",
    "Puerto de la Cruz",
    "San Cristóbal de La Laguna",
    "Playa de Las Americas",
    "Fuerteventura Town",
    "Tenerife Town"
  ],

  // France South → North
  [
    "Tolouse",
    "Montpellier",
    "Marseille",
    "Nice",
    "Lyon",
    "Bordeaux",
    "Paris",
    "Strasbourg"
  ],

  // Andorra / Gibraltar / Western Europe
  [
    "Andorra la Vella",
    "Gibraltar",
    "Monaco",
    "Lille",
    "Dijon",
    "Nantes",
    "Rennes",
    "Brest"
  ],

  // Northern / Central Europe
  [
    "Brussels",
    "Amsterdam",
    "Hamburg",
    "Berlin",
    "Munich",
    "Vienna",
    "Zurich",
    "Geneva"
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
} = findCoordinatesByName("Madrid");

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
      case "button-south":
        sign = targetDirection === "button-north" ? -1 : 1;
        locationY = Math.min(
          Math.max(locationY + sign, 0),
          locationMap[locationX].length - 1
        );
        break;

      case "button-west":
      case "button-east":
        sign = targetDirection === "button-west" ? -1 : 1;
        locationX = Math.min(
          Math.max(locationX + sign, 0),
          locationMap.length - 1
        );
        break;

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

