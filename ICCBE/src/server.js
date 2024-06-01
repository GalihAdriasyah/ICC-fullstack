import express from "express"
import { PrismaClient } from "@prisma/client"
import cors from "cors";

const app = express()
const port = 8000
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors());
app.get("/registration",async (req, res)=>{
  try {
    const response = await prisma.registration.findMany()
    res.status(200).json({
        data: response
    })

  } catch (error) {
    res.status(500).json({
        message:response.message
    })
  }
})

app.post("/registration", async(req, res)=>{
    try {
        const {fullName, nim, email, phoneNumber, address }= req.body
        const response = await prisma.registration.create({
            data: {fullName, nim, email, phoneNumber, address
            }
        })
        res.status(200).json({
            message:"berhasil mendaftar",
            data: response
        })
    
      } catch (error) {
        res.status(500).json({
            message:response.message
        })
      }


})


app.patch("/registration/:id", async(req, res)=>{
    try {
        const {fullName, nim, email, phoneNumber, address }= req.body
        const response = await prisma.registration.update({
            where: {
                id: req.params.id
            },
            data: {fullName, nim, email, phoneNumber, address
            }
        })
        res.status(201).json({
            message:"berhasil memperbarui",
            data: response
        })
    
      } catch (error) {
        res.status(500).json({
            message:response.message
        })
      }


})



app.delete("/registration/:id", async(req, res)=>{
    try {
        
        const response = await prisma.registration.delete({
            where: {
                id: req.params.id
            }
            
        })
        res.status(201).json({
            message:"berhasil menghapus",
            data: response
        })
    } catch (error) {
        res.status(500).json({
            message:response.message
        })
      }
      
})

app.get("/registration/:id", async(req,res)=>{
    try {
        
        const response = await prisma.registration.findUnique({
            where: {
                id: req.params.id
            }
            
        })
        res.status(201).json({
            message:"berhasil memanggil",
            data: response
        })
    } catch (error) {
        res.status(500).json({
            message:response.message
        })
    }
      })


app.listen(port, ()=>{
    console.log("App running on port " + port)
})
