import React, { useContext, useRef, useEffect } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "./AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"

export const AnimalForm = (props) => {
    const { addAnimal } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    /*
    create references that can be attached to the input fields
    in the form. These are the initial values of ref in useRef.
    useRef keeps track of inputs and changes ref based on inputs.
    
    This allows you to get value of input fields later when save is clicked.

    no document.querySelector in React
    */
   const animal = useRef(null)
   const location = useRef(null)
   const customer = useRef(null)
   const breed = useRef(null)

   //Get animals and locations on initialization for drop downs

   useEffect(() => {
       getLocations().then(getCustomers)
   }, [])

   const makeNewAppointment = () => {
       //locationId and animalId are references attached to input fields
       //must parseInt to make sure foreign keys are integers

       const locationId = parseInt(location.current.value)
       const customerId = parseInt(customer.current.value)

       if (locationId === 0) {
           window.alert("Please select a location")
       } else {
            addAnimal({
                name: animal.current.value,
                breed: breed.current.value,
                customerId,
                locationId
            })
        .then(() => props.history.push("/animals"))
       }
   }

    return (
        <form className="animalForm">
            <h2 className="animalForm__title">Make Appointment</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalName">Pet's name:</label>
                    <input type="text" id="animalName" ref={animal} required autoFocus className="form-control" placeholder="Pet's name" />
                </div>
            </fieldset>
            <fieldset>
                <div classNAme="form-group">
                    <label htmlFor="animalBreed">Pet's breed</label>
                    <input type="text" id="animalBreed" ref={breed} required autoFocus className="form-control" placeholder="Pet's breed" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="customer">Pet's owner</label>
                    <select defaultValue="" name="customer" ref={customer} id="animalCustomer" className="form-control" >
                        <option value="0">Who is making the appointment?</option>
                        {customers.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                        </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Appointment Location</label>
                    <select defaultValue="" name="location" ref={location} id="animalLocation" className="form-control" >
                        <option value="0">Where is this appointment?</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                        </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    makeNewAppointment()
                }}
                className="btn btn-primary">
                    Save Appointment
                    </button>
        </form>
    )   
}