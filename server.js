const express = require("express");
const app = express();
const connectDB = require("./model/db")
const cors = require("cors")

require("dotenv").config()

// built-in middlewares

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(cors({
    'credentials' : true,
    'origin' : 'http://localhost:5173'
}))

connectDB()

app.use("/",require("./routes/userAuth"))

app.get("/",(req,res) => {
    console.log(req.headers );
    res.send("hello")
})

app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
})