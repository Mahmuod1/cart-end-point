
const Users = require('../domyDatabase/users.js')
const Products = require('../domyDatabase/products')
const requestsHandler=(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
        switch(req.method,req.url){
            case 'POST'&&'/add-to-cart':
                let body =[]
              req.on('data',data=>{
                  body.push(data)
              })
              req.on('end', () => {
                const {email,productAddedToCart}= JSON.parse(Buffer.concat(body).toLocaleString())
               
Products.findOneById(productAddedToCart.id).then(product=>{
   const checkQuantityInStock= product.quantity- productAddedToCart.selectedQty
  if(checkQuantityInStock <0) res.end(JSON.stringify({error:`this quantity doesn't exists`}))
  else{
Products.updateItemInStock(productAddedToCart.id,checkQuantityInStock).then(product=>{
    Products.checkSize(productAddedToCart.id,productAddedToCart.size).then(product=>{
        Users.addToCart(email,{...product,...productAddedToCart}).then(cart=>{
            return res.end(JSON.stringify(cart))
         }).catch(e=>{
            return res.end(JSON.stringify(e))
         })
    }).catch(e=>{
       return res.end(JSON.stringify(e))
    })
 
})
  
  }
}).catch(e=>{
    console.log(e)
})
              })
            break;
          case 'GET' &&'/find-product':
          const  bodyContent=[]
            req.on('data',chunk=>{
                bodyContent.push(chunk)
            })
            req.on('end',()=>{
                const {id} = JSON.parse(Buffer.concat(bodyContent).toLocaleString())
               Products.findOneById(id).then(product=>{
                   return res.end(JSON.stringify(product))
               }).catch(e=>res.end(JSON.stringify(e)))
            })
            break;
            case 'GET' &&'/get-user-cart':
                const  userEmail=[]
                req.on('data',chunk=>{
                    userEmail.push(chunk)
                })
                req.on('end',()=>{
                    const {email} = JSON.parse(Buffer.concat(userEmail).toLocaleString())
                Users.findOneByEmail(email).then(user=>res.end(JSON.stringify(user)))
                .catch(e=>res.end(JSON.stringify(e)))
                })
        }
    

    
    }
    exports.handler=requestsHandler