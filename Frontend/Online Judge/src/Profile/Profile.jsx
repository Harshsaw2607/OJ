import React,{useContext} from 'react'
import UserContext from '../Context/UserContext'

function Profile() {

    const {user}=useContext(UserContext)
    console.log("user i profile = ",user)

    // if (user.UserEmail) {
    //     return (<div>Welcome {user.UserEmail}</div>)
    // }

//   return (
    
//     <div>
        
//     </div>
//   )
}

export default Profile