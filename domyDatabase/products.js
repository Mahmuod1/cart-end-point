const Product = require('../model/product')
const product1 = new Product('Disney Store Disney Princess Costume Collection For Kids', '428411449216', "Girl's clothing", 8, 100, [29, 24, 22])
const freeProduct = new Product('Disney Store Toy Story 4 Reusable Shopper, Medium', 1, 'free on cart above 100', 100, 0, 'none')
const product2 = new Product('Disney Store Disney Princess Dress For Kids', '423281964838', `Girl's clothing`, 5, 25, ['2 Y', '4 Y', '7-8 Y', '5 Y'])
class Products {
    constructor(products) {
        this.products = products
        this.newProduct;
    }
    create(...product) {
        this.newProduct = new Product(...product)
        return new Promise((resolve, reject) => {
            const productExisting = this.isExisting(this.newProduct.id)
            if (productExisting) reject({
                error: "this product is already exists cannot add new one"
            })
            else {
                this.products.push(this.newProduct)
                resolve(this.newProduct)
            }
        })
    }

    isExisting(id) {
        return this.products.some(product => product.id == id)
    }
    findOneById(id) {
        return new Promise((resolve, reject) => {
            const product = this.products.filter((product) => product.id == id)
            if (product.length) resolve(product[0])
            else reject({
                error: 'cannot found this Product'
            })
        })
    }
    updateItemInStock(id,updatedQty){
        return new Promise((resolve,reject)=>{
            const productIndex=this.products.findIndex(product=>product.id==id)
            if(productIndex!=-1){
this.products[productIndex].quantity=updatedQty
resolve(this.products[productIndex])
            }else{
                reject({error:'cannot found this product'})
            }
        })
    }
    checkSize(id,selectedSize){
       return new Promise((resolve,reject)=>{
        this.findOneById(id).then(product=>{
              const isExistingSize= product.size.some(size=>size==selectedSize)
              if(isExistingSize) resolve(product)
              else reject({error:`this size doesn't exists in stock`})
        }).catch(e=>{
            reject(e)
        })
       })
    }
}

module.exports = new Products([product1, product2, freeProduct])