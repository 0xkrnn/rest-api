const { getAllEmployee, createNewEmployee, updateEmployee, deleteAnEmployee } = require("../controllers/employeeController")

const router = require("express").Router()


router
    .get("/",getAllEmployee)
    .post("/",createNewEmployee)
    .put("/",updateEmployee)
    .delete("/",deleteAnEmployee)

module.exports = router