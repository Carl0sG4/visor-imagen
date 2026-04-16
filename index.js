const locationMap = [
  // PORTUGAL
  { name: "Braga", latitude: 41.5454, longitude: -8.4265 },
  { name: "Guimarães", latitude: 41.4444, longitude: -8.2962 },
  { name: "Porto", latitude: 41.1579, longitude: -8.6291 },
  { name: "Coimbra", latitude: 40.2033, longitude: -8.4103 },
  { name: "Lisbon", latitude: 38.7223, longitude: -9.1393 },
  { name: "Setúbal", latitude: 38.5244, longitude: -8.8882 },
  { name: "Évora", latitude: 38.5714, longitude: -7.9135 },

  // NORTE ESPAÑA
  { name: "Vigo", latitude: 42.2406, longitude: -8.7207 },
  { name: "Oviedo", latitude: 43.3619, longitude: -5.8494 },
  { name: "Gijón", latitude: 43.5322, longitude: -5.6611 },
  { name: "Santander", latitude: 43.4623, longitude: -3.8099 },
  { name: "Bilbao", latitude: 43.2630, longitude: -2.9350 },
  { name: "San Sebastián", latitude: 43.3183, longitude: -1.9812 },

  // INTERIOR ESPAÑA
  { name: "León", latitude: 42.5987, longitude: -5.5671 },
  { name: "Valladolid", latitude: 41.6523, longitude: -4.7245 },
  { name: "Zaragoza", latitude: 41.6488, longitude: -0.8891 },
  { name: "Madrid", latitude: 40.4168, longitude: -3.7038 },
  { name: "Toledo", latitude: 39.8628, longitude: -4.0273 },

  // ESTE / SUR ESPAÑA
  { name: "Barcelona", latitude: 41.3851, longitude: 2.1734 },
  { name: "Valencia", latitude: 39.4699, longitude: -0.3763 },
  { name: "Alicante", latitude: 38.3452, longitude: -0.4810 },
  { name: "Murcia", latitude: 37.9922, longitude: -1.1307 },
  { name: "Granada", latitude: 37.1773, longitude: -3.5986 },
  { name: "Cordoba", latitude: 37.8882, longitude: -4.7794 },
  { name: "Sevilla", latitude: 37.3891, longitude: -5.9845 },
  { name: "Cádiz", latitude: 36.5271, longitude: -6.2886 },
  { name: "Gibraltar", latitude: 36.1408, longitude: -5.3536 },

  // BALEARES
  { name: "Palma (Mallorca)", latitude: 39.5696, longitude: 2.6502 },
  { name: "Pollensa (Mallorca)", latitude: 39.8770, longitude: 3.0160 },
  { name: "Ibiza Town", latitude: 38.9067, longitude: 1.4206 },
  { name: "Eivissa Old Town", latitude: 38.9089, longitude: 1.4328 },
  { name: "Menorca", latitude: 39.9496, longitude: 4.1100 },
  { name: "Ciutadella (Menorca)", latitude: 40.0015, longitude: 3.8414 },

  // CANARIAS
  { name: "Tenerife Town", latitude: 28.4636, longitude: -16.2518 }, // Santa Cruz
  { name: "Puerto de la Cruz", latitude: 28.4133, longitude: -16.5450 },
  { name: "San Cristóbal de La Laguna", latitude: 28.4874, longitude: -16.3159 },
  { name: "Costa Adeje", latitude: 28.0916, longitude: -16.7291 },
  { name: "Playa de las Américas", latitude: 28.0643, longitude: -16.7304 },
  { name: "Fuerteventura Town", latitude: 28.3587, longitude: -14.0537 }, // Puerto del Rosario
  { name: "Corralejo (Fuerteventura)", latitude: 28.7260, longitude: -13.8670 },
  { name: "Arrecife (Lanzarote)", latitude: 28.9630, longitude: -13.5477 },

  // FRANCIA
  { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { name: "Lyon", latitude: 45.7640, longitude: 4.8357 },
  { name: "Marseille", latitude: 43.2965, longitude: 5.3698 },
  { name: "Nice", latitude: 43.7102, longitude: 7.2620 },
  { name: "Toulouse", latitude: 43.6047, longitude: 1.4442 },
  { name: "Bordeaux", latitude: 44.8378, longitude: -0.5792 },
  { name: "Nantes", latitude: 47.2184, longitude: -1.5536 },
  { name: "Lille", latitude: 50.6292, longitude: 3.0573 },
  { name: "Dijon", latitude: 47.3220, longitude: 5.0415 },
  { name: "Strasbourg", latitude: 48.5734, longitude: 7.7521 },
  { name: "Rennes", latitude: 48.1173, longitude: -1.6778 },
  { name: "Montpellier", latitude: 43.6119, longitude: 3.8772 },
  { name: "Brest", latitude: 48.3904, longitude: -4.4861 },

  // CENTRO EUROPA
  { name: "Geneva", latitude: 46.2044, longitude: 6.1432 },
  { name: "Zurich", latitude: 47.3769, longitude: 8.5417 },
  { name: "Munich", latitude: 48.1351, longitude: 11.5820 },
  { name: "Vienna", latitude: 48.2082, longitude: 16.3738 },
  { name: "Monaco", latitude: 43.7384, longitude: 7.4246 },

  // NORTE EUROPA
  { name: "London", latitude: 51.5072, longitude: -0.1276 },
  { name: "Brussels", latitude: 50.8503, longitude: 4.3517 },
  { name: "Amsterdam", latitude: 52.3676, longitude: 4.9041 },
  { name: "Berlin", latitude: 52.5200, longitude: 13.4050 },

  // EXTRA
  { name: "Andorra la Vella", latitude: 42.5063, longitude: 1.5218 },
];

const lookupMap = {};

// NOTE: The default baseline score that any score must be under to be considered.
const defaultBaselineScore = 5;

function populateLookupMap(baselineScore) {
  for (const location of locationMap) {
    function determineBestMatch(currentLocation, targetDirection) {
      const candidateList = locationMap.filter(
        function filterLocation(targetLocation) {
          switch (targetDirection) {
            case "north":
              return targetLocation.latitude > currentLocation.latitude;
            case "south":
              return targetLocation.latitude < currentLocation.latitude;
            case "east":
              return targetLocation.longitude > currentLocation.longitude;
            case "west":
              return targetLocation.longitude < currentLocation.longitude;
          }
        },
      );

      if (candidateList.length === 0) return currentLocation;

      let bestCandidate = null;
      let bestScore = Infinity;

      for (const targetLocation of candidateList) {
        const longitudeDelta =
          targetLocation.longitude - currentLocation.longitude;
        const latitudeDelta = targetLocation.latitude - currentLocation.latitude;

        const localScore = Math.abs(latitudeDelta) + Math.abs(longitudeDelta);

        if (localScore < bestScore)
          ((bestScore = localScore), (bestCandidate = targetLocation));
      }

      return bestScore <= baselineScore ? bestCandidate ?? currentLocation : currentLocation;
    }

    const [north, south, west, east] = [
      determineBestMatch(location, "north"),
      determineBestMatch(location, "south"),
      determineBestMatch(location, "west"),
      determineBestMatch(location, "east"),
    ];

    const { name } = location;

    Object.assign(lookupMap, { [name]: [north, south, west, east] });
  }
}

// Populate with default parameters.
populateLookupMap(defaultBaselineScore);

function normalizeLocationName(locationName) {
  return locationName
    .toLowerCase()
    .normalize("NFD") // split accents
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[()]/g, "") // remove parentheses
    .replace(/,/g, "") // remove commas
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-") // collapse multiple hyphens
    .trim();
}

function getImageFilepath(locationName) {
  return `images/${normalizeLocationName(locationName)}.png`;
}

function findLocationByName(locationName) {
  for (const locationObject of locationMap) {
    const { name: localName } = locationObject;

    if (localName === locationName) return locationObject;
  }

  return null;
}

const preloadList = [];

for (const locationObject of locationMap) {
  const { name: locationName } = locationObject;

  const imagePath = getImageFilepath(locationName);

  const preloadedImage = new Image();

  preloadedImage.src = imagePath;

  preloadList.push(preloadedImage);
}

const defaultLocationName = "Madrid";

let currentLocation = findLocationByName(defaultLocationName);

const buttonNorth = document.getElementById("button-north");
const buttonWest = document.getElementById("button-west");
const buttonSouth = document.getElementById("button-south");
const buttonEast = document.getElementById("button-east");

const imageViewport = document.getElementById("image-viewport");
const locationLabel = document.getElementById("location-label");

{
  const { name: locationName } = currentLocation;

  locationLabel.textContent = locationName;

  imageViewport.setAttribute("src", getImageFilepath(locationName));
}

function createHandler(targetDirection) {
  const buttonToDirectionIndex = {
    "button-north": 0,
    "button-south": 1,
    "button-west": 2,
    "button-east": 3,
  };

  return function moveHandler(eventObject) {
    switch (targetDirection) {
      case "button-north":
      case "button-south":
      case "button-west":
      case "button-east": {
        const directionIndex = buttonToDirectionIndex[targetDirection];

        const { name } = currentLocation;

        currentLocation = lookupMap[name][directionIndex];

        break;
      }

      default:
        console.error(`error: unknown move target '${targetDirection}'`);
        return;
    }

    const { name: locationName } = currentLocation;

    locationLabel.textContent = locationName;

    imageViewport.setAttribute("src", getImageFilepath(locationName));
  };
}

{
  function handleButton(targetButton) {
    const { id: targetId } = targetButton;

    return targetButton.addEventListener("click", createHandler(targetId));
  }

  (handleButton(buttonNorth),
    handleButton(buttonSouth),
    handleButton(buttonWest),
    handleButton(buttonEast));
}

const similarityInput = document.getElementById("similarity-input");

similarityInput.setAttribute("value",
  defaultBaselineScore
);

similarityInput.addEventListener(
  "change", (targetEvent) => populateLookupMap(parseFloat(targetEvent.target.value))
);
similarityInput.addEventListener(
  "beforeinput",
  (targetEvent) => populateLookupMap(parseFloat(targetEvent.target.value))
);
