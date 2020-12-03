import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { AnimalSearch } from "./AnimalSearch"
// import { LocationContext } from "../location/LocationProvider"
// import { CustomerContext } from "../customer/CustomerProvider"
import { Animal } from "./Animal"
import "./Animal.css"

export const AnimalList = ({ history }) => {
    //this state changes when getAniamsl is invoked below
    const { animals, searchTerms, getAnimals } = useContext(AnimalContext)
    // const { locations, getLocations } = useContext(LocationContext)
    // const { customers, getCustomers } = useContext(CustomerContext)

    //Since no longer always displaying all animals
    const [ filteredAnimals, setFiltered ] = useState([])

   useEffect(() => {
       console.log("AnimalList: First render before data")
       getAnimals()
   }, [])
    /*
        The effect hook function will run when following 2 state changes happen:
        1. Animal state changes. Happens uppon first created, then when get animals from API
        2. When search terms change, which happens when user types something into AnimalSerach component
    */

    useEffect (() => {
        if (searchTerms !== "") {
            //if search field isn't blank, display searched animals
            const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            //if search field is empty
            setFiltered(animals)
        }
    }, [searchTerms, animals])

    return (
        <>
        <h1>Animals</h1>

        <button onClick={() => history.push("/animals/create")}>
            Make Reservation
        </button>
        <div className="animals">
            {
                filteredAnimals.map(animal => {
                    return <Animal key={animal.id} animal={animal} />
                })
            }
        </div>
        </>
    )
        }