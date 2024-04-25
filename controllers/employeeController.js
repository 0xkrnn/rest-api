const employeeModel = require("../model/employeeModel")

const getAllEmployee = async (req, res) => {
    const employees = await employeeModel.find()
    res.status(200).json(JSON.stringify(employees))
}

const createNewEmployee = async (req, res) => {
    try {

        const { name, age, department, salary } = req.body

        console.log(name,age,department,salary);

        const exist = await employeeModel.find({ name })
        
        if (exist == null || exist.length == 0) {

            const newUser = new employeeModel({
                name,
                age,
                department,
                salary
            });

            await newUser.save()

            res.status(201).json({ "message": "user created successfully" })

        } else return res.status(400).json({ "message": "employee already exists" })


    } catch (err) {
        console.log(err)
    }
};

const updateEmployee = async (req, res) => {

   

}

const deleteAnEmployee = async (req, res) => {

    try {

        const { name } = req.body
        const exist = await employeeModel.findOne({ name })

        if (exist.length == 0) {

            await employeeModel.deleteOne({name})
            res.status(200).json({"message" : "user deleted"})

        } else return res.status(400).json({ "message": "employee already exists" })


    } catch (err) {
        console.log(err)
    }
};


module.exports = {
    getAllEmployee,
    createNewEmployee,
    updateEmployee,
    deleteAnEmployee
}