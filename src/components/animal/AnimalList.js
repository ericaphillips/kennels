import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { Animal } from "./Animal"
import "./Animal.css"

export const AnimalList = () => {
    //this state changes when getAniamsl is invoked below
    const { animals, getAnimals } = useContext(AnimalContext)

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
   useEffect(() => {
       console.log("AnimalList after state changed")
       console.log(animals)
   }, [animals])

   return (
       <div className="animals">
           {
               animals.map(ani => <Animal key={ani.id} animal={ani} />)
           }
       </div>
   )
}