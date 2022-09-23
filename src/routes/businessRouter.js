const business = require("../usecases/businessUsecase");
const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", async (request, response) => {
  try {
    const newBusiness = await business.createBusiness(request.body)

    response.json({
      status: true,
      message: "Nuevo Negocio",
      newBusiness: newBusiness,
    })
  } catch (error) {
    response.status(400);
    response.json({
      ok: false,
      message: error.message,
    })
  }
})

router.get("/", async (request, response) => {
  try {
    const { user } = request.query
    let message
    let getBussines

    if (!user) {
      getBussines = await business.getBussines()
      message = "Mostrando todos los negocios"
    } else if (!!user) {
      getBussines = await business.getBusinessByClientId(user)
      message='Mostrando negocios por usuario'
    }
    response.json({
      ok: true,
      message: message,
      getBussines: getBussines,
    })
  } catch (error) {
    response.status(400)
    response.json({
      ok: false,
      message: error.message,
    })
  }
})

router.get("/:id", async (request, response) => {
  try {
    const getBusinessById = await business.getBusinessByBusinessId(
      request.params.id
    );
    response.json({
      ok: true,
      message: "Mostrando negocio por id",
      getBusinessById: getBusinessById,
    });
  } catch (error) {
    response.status(400)
    response.json({
      ok: false,
      message: error.message,
    })
  }
})

router.patch("/:id", async (request, response) => {
  try {
    const updateBusiness = await business.updateBusiness(request.params.id, request.body)
    
    response.json({
      ok: true,
      message: "Negocio actualizado",
      updateBusiness: updateBusiness,
    });
  } catch (error) {
    response.status(400);
    response.json({
      ok: false,
      message: error.message,
    })
  }
})

router.delete("/:id", async (request, response) => {
  try {
    const deleteBusinessById = await business.deleteBusiness(request.params.id)
    response.json({
      ok: true,
      message: "Negocio eliminado",
      deleteBusinessById: deleteBusinessById,
    })
  } catch (error) {
    response.status(400);
    response.json({
      ok: false,
      message: error.message,
    })
  }
})

module.exports = router;
