import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { LocationContext } from "./LocationProvider"
import { Location } from "./Location"
import { Link } from "react-router-dom"
import "./Location.css"

export const LocationList = () => {
    // This state changes when `getLocations()` is invoked below
    const { locations, getLocations } = useContext(LocationContext)
    const { employees, getEmployees } = useContext(EmployeeContext)
    const { animals, getAnimals } = useContext(AnimalContext)

    useEffect(() => {
        // console.log("LocationList: Initial render before data")
        getLocations().then(getEmployees).then(getAnimals)
    }, [])


    return (
        <div className="locations">
        {
            locations.map(location => {
                location.employees = employees.filter(e => e.locationId === location.id)
                location.animals = animals.filter(a => a.locationId === location.id)

                return <article key={`location--${location.id}`} className="card Location" style={{ width: `18rem` }}>
                    <section className="card-body">

                        <Link className="card-link"
                            to={{
                                pathname: `/locations/${location.id}`,
                                state: { chosenLocation: location}
                            }}>
                                <h2 className="card-title">{location.name}</h2>
                            </Link>
                    </section>
                    <section>
                        {`${location.employees.length} ${location.employees.length === 1 ? "employee" : "employees"}`}
                    </section>
                    <section>
                            {`${location.animals.length} ${location.animals.length === 1 ? "animal" : "animals"}`}
                    </section>
                    </article>
            })
        }
        </div>
    )
}