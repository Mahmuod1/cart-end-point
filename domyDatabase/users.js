const User=require('../model/user.js')
const ahmed= new User('ahmed','ahmed@ahmed.com','123456')
const ali = new User('ali','ali@ali.com','001122')
const mahmuod = new User('mahmuod','mahmuod@mahmuod.com','987654')
const users=[ahmed,ali,mahmuod]
class Users{
    constructor(users){
        this.users=users
        this.newUser=new User
this.searchedUser;
    }
    create(...user){
this.newUser=new User (...user)
        const createNewUser= new Promise((resolve,reject)=>{
            const isExisting= this.isExisting(this.newUser.email)
            if(isExisting){
                return reject({error:'user is already existing'})
            }
             this.users.push(this.newUser)
             return resolve(this.findOneByEmail(this.newUser.email))
        })
       return createNewUser
    }
    isExisting(email){
return this.users.some(user=>user.email==email)
    }
            findOneByEmail(email){
        return new Promise((resolve,reject)=>{
          const user=  this.users.filter((user)=>user.email==email)
          if(user.length)resolve(user)
          else reject({error:'cannot found this user'})
        })
    }
    addToCart(email,updatedData){
     return  new Promise((resolve,reject)=>{
            this.findOneByEmail(email).then(user=>{
                const totalPrice= updatedData.price*updatedData.selectedQty
              const userCart= {...updatedData,price:totalPrice}
                   const userIndex = this.users.findIndex(user=>user.email==email)
                   this.users[userIndex].cart.push(userCart)
                resolve(userCart)
            }).catch(error=>{
                reject(error)
            })
        })
       
    }
}
const UsersSchema=new Users(users)
module.exports=UsersSchema
    












