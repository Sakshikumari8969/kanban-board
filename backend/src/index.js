const express = require("express")
const router = require("./routes/route")
const mongoose = require("mongoose")
const app = express()
const cors=require("cors")

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://Sakshi:monday123@cluster0.z5dpz2x.mongodb.net/KanbanApp", { useNewUrlParser: true })
    .then(() => console.log("mongoDb is connected"))
    .catch((err) => console.log(err.message))

app.use("/", router)

app.listen(3001, () => {
    console.log("Server is running on port", 3001)
})
