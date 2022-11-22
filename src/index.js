let express = require("express")
let mongoose = require("mongoose")
let router = require("./router/route")
let app = express()

app.use(express.json())
mongoose.connect("mongodb+srv://abhinav7877:abhinavmangal@abhinav.yhc3th4.mongodb.net/iNeuro?retryWrites=true&w=majority",{
    useNewUrlParser:true
})
.then(()=>console.log("mongoose is connected"))
.catch((error)=>console.log(error))

app.use("/",router)

let port = 3000
app.listen(port)