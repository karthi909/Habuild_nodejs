# Habuild_nodejs

## P1 : Basic APIs and Database Integration Assignment 

### Discription of developed Assignmnet

- Tech Stack
  1) Nodejs
  2) ExpressJs
  3) MongoDB

- Packages Used 
  1) JWT(jasonWebToken) for creation of token used for Authentication and Authorization
  2) bcrypt used for encryption of data, we used for passworrd encypting and decrypting

- Database Collections
  1) User Colletion _ [both user and Admin]
```yaml
 name: {
        type:String,
        required: true,
        unique: true
    },
   email:{
    type:String,
    required: true,
    unique: true
   },
   password:{
    type:String,
    required:true
   },
   isDeleted:{
    type:Boolean,
    default:false
   },
   isAdmin:{
    type:Boolean,
    default:false
   }


}, { timestamps: true })
```
  2) Topics Collection _  [topic will be there]
```yaml
 topicName:{
        type:String,
        required:true,
        unique:true
    }, 
    isDeleted:{
        type:Boolean,
        default:false
    }

}, { timestamps: true })
```
 
  3) Rank Collection _ [hear we had connected with the user collection and topic collection]
```yaml
 name: {
        type:String,
        required: true,
        unique: true
    },
   email:{
    type:String,
    required: true,
    unique: true
   },
   password:{
    type:String,
    required:true
   },
   isDeleted:{
    type:Boolean,
    default:false
   },
   isAdmin:{
    type:Boolean,
    default:false
   }


}, { timestamps: true })
```

## Features 

- Type 
  1) There will two type of group one is User and other is admin 
  2) The user can register and login and give ranking for the perticular topics 
  3) The Admin will register and login from the same user does.
  4) we can do CURD operations for both groups and when come to ranking, we had reffeered the user collection and topic collection to Rank collection

## Routes
- '/api/user/reg'
  1) Used for registration 

- '/login'
  2) used 

- '/api/user/:userid'

- '/api/user/:userid'




- '/api/topic/reg/:userid'

- '/api/topic/:topicid/:userid'


- '/api/giverank'

- '/api/rank/getRank/:userid'

