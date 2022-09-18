const user = require("../usecases/userUsecase");
const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
// const loggerMiddleware = require('../middlewares/loggerMiddleware')

const router = express.Router();

// router.use(loggerMiddleware)
// router.use(authMiddleware)

router.post("/", async (request, response) => {
  try {
    const newUSer = await user.createUser(request.body);
    const userToken = await user.login(request.body.user_mail, request.body.user_password)

    response.json({
      status: true,
      message: "Nuevo usuario",
      newUser: newUSer,
      userToken,
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
    const userAll = await user.getAllUser()

    response.json({
      ok: true,
      message: "Mostrando todos los usuarios",
      userAll: userAll,
    })
  } catch (error) {
    response.status(400);
    response.json({
      ok: false,
      message: error.message,
    })
  }
})

// router.get("/:id", async (request, response) => {
//   try {

//     const bussinesByUser = await user.bussinesByUser(request.params.id);
//     response.json({
//       message: "Mostrando negocios por usuario",
//       bussinesByUser: bussinesByUser,
//     })
//   } catch (error) {
//     response.status(400);
//     response.json({
//       ok: false,
//       message: error.message,
//     })
//   }
// })

router.get("/:id", async (request, response) => {
  try {
    const getUserById = await user.getByIdUser(request.params.id)
    response.jsonp({
      ok: true,
      message: "Mostrando usuarios por Id",
      userById: getUserById,
    })
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
    const deleteUserById = await user.deleteUserById(request.params.id)
    response.json({
      ok: true,
      message: "Usuario eliminado",
      deleteUserById: deleteUserById,
    })
  } catch (error) {
    response.status(400);
    response.json({
      ok: false,
      message: error.message,
    })
  }
})

router.patch("/:id", authMiddleware, async (request, response) => {
  try {
    const updateUser = await user.updateUserById(request.params.id, request.body)

    response.json({
      ok: true,
      message: "Usuario actualizado",
      updateUser: updateUser,
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
