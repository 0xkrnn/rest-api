const employeeModel = require("../model/employeeModel")

const getAllEmployee = async(req,res) => {    
    const employees = await employeeModel.find()
    res.status(200).json(JSON.stringify(employees))
}


module.exports = {
    getAllEmployee,
}