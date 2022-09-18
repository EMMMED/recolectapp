const collect = require("../usecases/collectUsecase");
const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router()

router.use(authMiddleware);

router.get("/", async (request, response) => {
  try {
    const { business } = request.query;

    let getCollect;
    let message;
    if (!business) {
      getCollect = await collect.getCollects();
      message = 'Mostrando recolecciones'
    } else if (!!business) {
      getCollect = await collect.getCollectByBusinessId(business)
      message = ''
    }
    response.json({
      ok: true,
      message: "Get Collect by Bussines",
      getCollect: getCollect,
    });
  } catch (error) {
    response.status(400);
    response.json({
      ok: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const getCollectById = await collect.getCollectById(request.params.id);
    console.log(collect.waste_amount);
    response.json({
      ok: true,
      message: "get collects by id",
      getCollectById: getCollectById,
    });
  } catch (error) {
    response.status(400);
    response.json({
      ok: false,
      message: error.message,
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const newCollect = await collect.createCollect(request.body);
    response.json({
      status: true,
      message: "Collect Created",
      newCollect: newCollect,
    });
  } catch (error) {
    response.status(400);
    response.json({
      ok: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const deleteCollectById = await collect.deleteCollectById(
      request.params.id
    );
    response.json({
      ok: true,
      message: "Collect Deleted",
      deleteCollectById: deleteCollectById,
    });
  } catch (error) {
    response.status(400);
    response.json({
      ok: false,
      message: error.message,
    });
  }
});

module.exports = router;
