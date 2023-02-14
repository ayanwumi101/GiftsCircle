const { PrismaClient } = require("@prisma/client");
const express = require("express");
const ResponseDTO = require("../DTO/Response");
const {
  ChangePassword,
  GetUser,
  GetUsers,
  DeleteUser,
} = require("../Services/Users");
const EnsureAuthenticated = require("../Utils/EnsureAuthenticated");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/:id", EnsureAuthenticated, async (req, res) => {
  try {
    let data = await GetUser(req.params.id);
    if (data) {
      return res.status(200).send({ user: data });
    }
    return res.status(400).send({ msg: "User not found" });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.get("/users/GetAll", async (req, res) => {
  try {
    let data = await GetUsers();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

router.delete("/:id", EnsureAuthenticated, async (req, res) => {
  try {
    await DeleteUser(req.params.id);
    return res
      .status(200)
      .send({ msg: `user with id ${req.params.id} deleted successfully` });
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Record not found" });
  }
});

router.post("/changePassword",EnsureAuthenticated, async (req, res) => {
  try {
    let data = await ChangePassword(req.body);
    if (data) {
      res
        .status(201)
        .send(ResponseDTO("Success", "Password changed successfully"));
    }
    return res.status(400).send(ResponseDTO("Failed", "Password is Incorrect"));
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    return res.status(400).send({ msg: "Request Failed" });
  }
});

module.exports = router;
