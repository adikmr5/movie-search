import React from 'react'
import { Navigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import HomePage from './HomePage'


export default function PrivateRoute({component: RouteComponent, roles}) {
    const {currentUser} = useAuth()
    // return (
    //     <Route 
    //     {...rest}
    //     render={props =>{
    //         currentUser ? <Component {...props}/> : <Navigate to="/login" />
    //     }}>
            
    //     </Route>
    // )
    if(currentUser)
    {
        return<HomePage/>
    }
    return <Navigate to="/login"/>
}
