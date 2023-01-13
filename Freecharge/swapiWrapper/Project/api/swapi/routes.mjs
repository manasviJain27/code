import { fetchAPI, fetchApiObject } from "./swapi.mjs";

const authRoutes = (router) => {
  router.get("/:type", (req, res) => fetchAPI(req, res));
  router.get("/:type/:id", (req, res) => fetchApiObject(req, res));
};

export default authRoutes;
