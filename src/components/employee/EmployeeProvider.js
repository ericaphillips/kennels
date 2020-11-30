import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const EmployeeContext = React.createContext()

//provider establishes what data can be used 
//return statement establishes what data can be used
export const EmployeeProvider = (props) => {
    const [employees, setEmployees] = useState ([])

    const getEmployees = () => {
        return fetch("http://localhost:8088/employees")
        .then(response => response.json())
        .then(setEmployees)
    }

    const addEmployee = employee => {
        return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then(getEmployees)
    }

    //return a context provider which has employee state,
    //addEmployee function, and getEmployee functions as keys
    //any child element can access these since they're in the return

    return (
        <EmployeeContext.Provider value={{
            employees, addEmployee, getEmployees
        }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}