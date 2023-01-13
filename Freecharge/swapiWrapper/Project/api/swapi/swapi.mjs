/* API 1: https://swapi.dev/api/films/
API 2: http swapi.dev/api/planets/2/
API 3: https://swapi.dev/api/planets/1/?format=wookiee
API 3 built off of API 2 which is built off of API 1

What we need for api 1:
Attributes:
 - films (count = 6)
 - people (count = 82)
 - planets (count = 60)
 - species (count = 37)
 - starships (count = 36)
 - vehicles (count = 39)

What we need for api 2:
1) Attributes:
 - films
 - people
 - planets
 - species
 - starships
 - vehicles
2) Number:
 - films (count = 6)
 - people (count = 82)
 - planets (count = 60)
 - species (count = 37)
 - starships (count = 36)
 - vehicles (count = 39)

What we need for api 3:
1) Attributes:
 - films
 - people
 - planets
 - species
 - starships
 - vehicles
2) Number:
 - films (count = 6)
 - people (count = 82)
 - planets (count = 60)
 - species (count = 37)
 - starships (count = 36)
 - vehicles (count = 39)
3) Format:
 - default formatter (JSON)
 - Wookie formatter */

import got from "got";
let baseUrl = "https://swapi.dev/api/";
let arr = ["films", "people", "planets", "species", "starships", "vehicles"];

async function fetchAPI(req, res) {
  const extensionType = req.params.type;
  console.log(extensionType);
  if (!arr.includes(extensionType)) {
    res.status(400).send("Could not find page you are looking for.");
    return;
  }
  const data = await got.get(`${baseUrl}${extensionType}/`);
  console.log(data);
  res.send(data.body);
  return;
}

async function fetchApiObject(req, res) {
  const extensionType = req.params.type;
  const id = req.params.id;
  let data = "";
  console.log(extensionType, id);

  const formatType = req.query.format;
  console.log(formatType);
  if (formatType == "wookiee") {
    try {
      data = await got.get(`${baseUrl}${extensionType}/${id}/?format=wookiee`);
    } catch {
      res.status(400).send("Could not find page");
      return;
    }
    res.send(data.body);
    return;
  }

  try {
    data = await got.get(`${baseUrl}${extensionType}/${id}/`);
  } catch (e) {
    res.status(400).send("Could not find page");
    return;
  }

  res.send(data.body);
}

export { fetchAPI, fetchApiObject };
