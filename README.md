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

Ecxept logIn and signUP each route is authenticated and authorized. 

### User Routes
-  POST '/api/user/reg'
   1) Used for registration 

- POST '/login'
  1) user will login and wew get the userid with JWT token in response

- PUT '/api/user/:userid'
  1) used for update the details of tehe user or the admin

- DELETE '/api/user/:userid'
  1) delete the perticular with the help of userId



### Topic Routes
- POST '/api/topic/reg/:userid'
  1) used for creating of topics only Admin can create it

- PUT '/api/topic/:topicid/:userid'
  1) Delete the perticular topic with topicId and only Admin can delete it


### Rank rotes
- POST '/api/giverank'
  1) it will take userID, topicId and ranking from 1-100.

- GET '/api/rank/getRank/:userid'
  1) we will get ranks by userid, when user/admin gives userid from body it will get all the documents that match with the userid and we will populate both user details and topic details by this we can achive the final result. 
  2) It shows that perticular user details with topic and the ranking obtained for that topic.
