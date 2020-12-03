import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
// import { LocationContext } from "../location/LocationProvider"
// import { CustomerContext } from "../customer/CustomerProvider"
import { Animal } from "./Animal"
import "./Animal.css"

export const AnimalList = ({ history }) => {
    //this state changes when getAniamsl is invoked below
    const { getAnimals, animals } = useContext(AnimalContext)
    // const { locations, getLocations } = useContext(LocationContext)
    // const { customers, getCustomers } = useContext(CustomerContext)

    /* component is mounted to the DOM, React renders 
    blank HTML first, then gets data, then re-renders
    */
   useEffect(() => {
       console.log("AnimalList: First render before data")
       getAnimals()
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
        <>
        <h1>Animals</h1>

        <button onClick={() => history.push("/animals/create")}>
            Make Reservation
        </button>
        <div className="animals">
            {
                animals.map(animal => {
                    return <Animal key={animal.id} animal={animal} />
                })
            }
        </div>
        </>
    )
        }