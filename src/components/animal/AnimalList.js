import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { Animal } from "./Animal"
import "./Animal.css"

export const AnimalList = (props) => {
    //this state changes when getAniamsl is invoked below
    const { animals, getAnimals } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    /* component is mounted to the DOM, React renders 
    blank HTML first, then gets data, then re-renders
    */
   useEffect(() => {
       console.log("AnimalList: First render before data")
       getLocations()
       .then(getCustomers)
       .then(getAnimals)
   }, [])
    /*
        This effect is solely for learning purposes. The effect
        it is responding to is that the animal state changed.
    */
//    useEffect(() => {
//        console.log("AnimalList after state changed")
//        console.log(animals)
//    }, [animals])
    return (
        <div className="animals">
            <h1>Animals</h1>
            <button onClick={() => props.history.push("/animals/create")}>
                Make Appointment
            </button>
            <article className="animalList">
            {
            animals.map(ani => {
               const owner = customers.find(c => c.id === ani.customerId)
               const clinic = locations.find(l => l.id === ani.locationId)
               return <Animal key={ani.id} 
               location={clinic}
               customer={owner}
               animal={ani} />
               })
            }
            </article>
            </div>
    )
        }