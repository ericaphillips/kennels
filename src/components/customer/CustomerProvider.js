import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const CustomerContext = React.createContext()

//provider establishes what data can be used 
//return statement establishes what data can be used
export const CustomerProvider = (props) => {
    const [customers, setCustomers] = useState ([])

    const getCustomers = () => {
        return fetch("http://localhost:8088/customers")
        .then(response => response.json())
        .then(setCustomers)
    }

    const addCustomer = customer => {
        return fetch("http://localhost:8088/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(getCustomers)
    }

    //return a context provider which has customer state,
    //addCustomer function, and getCustomers functions as keys
    //any child element can access these since they're in the return

    return (
        <CustomerContext.Provider value={{
            customers, addCustomer, getCustomers
        }}>
            {props.children}
        </CustomerContext.Provider>
    )
}