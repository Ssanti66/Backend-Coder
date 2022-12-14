import express from "express"
import productRouter from "./routes/product.router.js"
import cartsRouter from "./routes/carts.router.js"

const app = express()

const PORT = 8082

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products/", productRouter)

app.use("/api/carts/", cartsRouter)







app.listen(PORT, () =>console.log(`Listening on port ${PORT}`))