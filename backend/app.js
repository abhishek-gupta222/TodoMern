const express= require("express")
const app=express();
require("dotenv").config();
const auth=require("./routes/auth")
const list=require("./routes/list")
const cors= require("cors")

const db= require("./config/db")

db.connect();

app.use(express.json());
app.use(cors())


const port=process.env.PORT || 3000;


app.get("/", (req, res)=>{
res.send("hello world");
})

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(port,()=>{
    console.log(`app is lisenting on port ${port}`);
})
