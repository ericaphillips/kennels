import React from "react"
import { Route } from "react-router-dom"
import { LocationProvider } from "./location/LocationProvider"
import { AnimalProvider } from "./animal/AnimalProvider"
import { CustomerProvider } from "./customer/CustomerProvider"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { LocationList } from "./location/LocationList"
import { AnimalList } from "./animal/AnimalList"
import { CustomerList } from "./customer/CustomerList"
import { EmployeeList } from "./employee/EmployeeList"
import { EmployeeForm } from "./employee/EmployeeForm"
import { AnimalForm } from "./animal/AnimalForm"

export const ApplicationViews = (props) => {
    return (
        <>
            <LocationProvider>
                {/* Render the location list when http://localhost:3000/ */}
                <Route exact path="/">
                    <LocationList />
                </Route>
            </LocationProvider>

            <AnimalProvider>
                <LocationProvider>
                    <CustomerProvider>
                {/* Render the animal list when http://localhost:3000/animals */}
                        <Route exact path="/animals" render={
                        props => <AnimalList {...props} />
                        } />
                        <Route exact path ="/animals/create" render={
                        props => <AnimalForm {...props} />
                        } />
                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>

            <CustomerProvider>
                {/* Render the customer list when http://localhost:3000/customers */}
                <Route path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>
        <AnimalProvider>
            <EmployeeProvider>
                <LocationProvider>
                {/* Render the employee list when http://localhost:3000/employees */}
                {/* history.push() method makes the history object available to employeeList*/}
                <Route exact path="/employees" render={
                props => <EmployeeList {...props} />
                } />
                 {/* responds when URL changes to employees/create on button click */}
                <Route exact path="/employees/create" render={
                props => <EmployeeForm {...props} />
                } />
                </LocationProvider>
            </EmployeeProvider>
            </AnimalProvider>
        </>
    )
}