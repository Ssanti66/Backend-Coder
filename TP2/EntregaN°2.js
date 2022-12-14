const fs = require ("fs");

class productManager{

    constructor(path){        
        this.path = path

        this.#init()
    }

    #init(){
        try {
            const existsFile = fs.existsSync(this.path)

            if(existsFile) return
            
            fs.writeFileSync(this.path, JSON.stringify([]))
        } catch (error) {
            console.log(error);
            
        }
    }

    
    getNextId = (list) =>{
        const count = list.length
        return (count >0) ? list[count-1].id + 1 : 1
    }

    addProduct = async(title, description, price, thumbnail, code, stock) => 
    {

        if((!title || !description || !price || !thumbnail || !code || !stock))
            {console.log("Complete todos los campos")}

            if(fs.existsSync(this.path))
            {         
                const leer = await fs.promises.readFile(this.path, "utf-8")
                const listaDeProductos = JSON.parse(leer)
                const validate = listaDeProductos.find(codigo => codigo.code == code)

                if(!validate){
                    let id = this.getNextId(listaDeProductos)
                    const nuevoProducto = {id, title, description, price, thumbnail, code, stock};
                    listaDeProductos.push(nuevoProducto)
                    await fs.promises.writeFile(this.path, JSON.stringify(listaDeProductos))
                    console.log("El producto se ha ingresado correctamente");

                }else{console.log("El producto ya fue ingresado");}             
            }if(!fs.existsSync(this.path)) { 
            const nuevoProducto = [{id:1, title, description, price, thumbnail, code, stock}];
            await fs.promises.writeFile(this.path, JSON.stringify(nuevoProducto))
            }

    }
            

    getProduct = async () => {
        
        const listadoDeProductos = JSON.parse(await fs.promises.readFile(this.path, "utf-8")) 
        //return response      
        console.log (listadoDeProductos)
        
    }

    getProductById = async (id) => {
        const listadoDeProductos = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        const producto = listadoDeProductos.find(producto => producto.id == id) 
        if ((producto)){
            console.log(`Se ha encontrado el producto de ID ${id}`);
            console.log(producto);
        }else{console.log(`Not Found`);}
    }
    
    deleteProduct = async (id) =>{
        const listadoDeProductos = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        const producto = listadoDeProductos.find(producto => producto.id == id) 
        if((producto)){ 
        const resultado = listadoDeProductos.filter(producto => producto.id != id)
         await fs.promises.writeFile(this.path, JSON.stringify(resultado))

        }else{console.log("el producto no existe");}
    }

    updateProduct = async (id, obj) =>{

        obj.id = id
        const listadoDeProductos = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))

        for (let i=0; i<listadoDeProductos.length; i++){
            if(listadoDeProductos[i].id == id){
                listadoDeProductos[i] = obj
                break
            }
        }        
        await fs.promises.writeFile(this.path, JSON.stringify(listadoDeProductos))

    }
}
    
const path = "./listadoProductos.json"
const allProducts = new productManager(path);

allProducts.getProduct()

allProducts.addProduct("remera", "muy grande", "$5000", "sin imagen", "123", 1500)




      


