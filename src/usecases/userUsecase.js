const User = require("../models/userModel");
const wallet = require("../usecases/walletUserUsecase");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const saltRounds = 10;

async function login(user_mail, user_password) {
  const userFound = await User.findOne({ user_mail });
  if (!userFound) throw new createError(401, "Datos invalidos");

  const isValidPassword = await bcrypt.compare(
    user_password,
    userFound.user_password
  );
  if (!isValidPassword) throw new createError(401, "Datos invalidos");
  //Expirar token
  return {
    token: jwt.sign({ id: userFound._id }),
    id: userFound._id,
  }
}

async function createUser(data) {
  const userFound = await User.findOne({
    user_mail: data.user_mail,
  })
  if (userFound) {
    throw new createError(432, "Usuario no existente");
  }
  const newUser = new User(data);

  await bcrypt.hash(newUser.user_password, saltRounds, function (err, hash) {
    newUser.user_password = hash;
    return newUser.save();
  })

  const newWallet = await wallet.createWalletUser(newUser._id);
  await User.findByIdAndUpdate(newUser._id, { walletUser: newWallet._id });

}

function getAllUser() {
  return User.find()
}

function getByIdUser(id) {
  const userFound = User.findById(id);
  if (!userFound) {
    throw new createError(404, "Usuario no existente");
  }
  return userFound;
}

function deleteUserById(id) {
  const user = User.findById(id)
  if (!user) {
    throw new createError(404, 'Usuario no existente')
  }
  return User.findByIdAndDelete(id);
}

function updateUserById(id, data) {
  return User.findByIdAndUpdate(id, data, { new: true });
}

function bussinesByUser(id) {
  return User.findById(id).populate({
    path: "business",
    select: ["business_name", "business_phone"],
  })
}

module.exports = {
  createUser,
  getAllUser,
  getByIdUser,
  bussinesByUser,
  deleteUserById,
  updateUserById,
  login,
};

/**
 * SI ME TRAIGO UN USUARIO, DEBE DE TRAERSE TODOS LOS NEGOCIOS
 * GETBUSINESSBYUSERID
 *
 * SI ME TRAIGO EL NEGOCIO, DEBE DE TRAERSE LAS COLECCIONES DE ESE NEGOCIO
 * GetCollectsByBusinnesId
 *
 *
 */
