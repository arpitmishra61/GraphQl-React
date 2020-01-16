import React, { Component ,Fragment} from 'react'
import {Link} from 'react-router-dom'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
const LAUNCH_QUERY=gql`
query LaunchQuery($flight_number:Int!){
    launch(flight_number:$flight_number){
    flight_number
    launch_year
    launch_success
    mission_name
    launch_date_local
    rocket{
        rocket_name
        rocket_type
        rocket_id
    }
}
    
  }`

export default class Details extends Component {
    render(){
    
let flight_number=this.props.match.params.flight_number
    flight_number=parseInt(flight_number)
   
    return (
        <div className="container my-4 missionDetail">
            <Query query={LAUNCH_QUERY} variables={{flight_number}}>
{({loading,error,data})=>{
    if(loading)
    return <h1 className="bg-primary text-light p-2">Loading..</h1>
   
    if(error) return 'error'
    return <Fragment >
        <h1 className="text-light mb-0">Mission:{data.launch.mission_name}</h1>
        <Link className="btn btn-primary mt-1 btn-sm" to="/">Go Back</Link>
        <hr/>
             <div className="card container p-3 mb-4 ">
                 <h4 className="text-light bg-primary p-3 mb-0">Launch Details</h4>
                 <li className="list-group-item list-group-item-warning"><p>Rocket Number:{data.launch.flight_number}</p></li>
                  <li className="list-group-item list-group-item-light"><p>Launch Year:{data.launch.launch_year}</p>  </li>
                <li className="list-group-item list-group-item-secondary "><p>
                 Mission Success:  {data.launch.launch_success ? "YES" : "NO"}
                   </p>  </li>
               
   
            </div> 

             <div className="card container p-3 ">
                 <h4 className="mb-0 bg-info text-light p-3">Rocket Details</h4>
                 <li className="list-group-item list-group-item-success"><p>Rocket ID:{data.launch.rocket.rocket_id}</p></li>
                  <li className="list-group-item list-group-item-danger"><p>Launch Year:{data.launch.rocket.rocket_name}</p>  </li>
                <li className="list-group-item list-group-item-primary "><p>
                 Rocket Type:  {data.launch.rocket.rocket_type}
                   </p>  </li>
               
   
            </div> 


    </Fragment> }} 


            </Query>
            
            
        </div>
    )
}}
