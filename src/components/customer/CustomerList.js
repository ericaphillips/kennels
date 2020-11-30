import React, { useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import { Customer } from "./Customer"
import "./Customer.css"

export const CustomerList = () => {
    //this state changes when getCustomers is invoked below
    const { customers, getCustomers } = useContext(CustomerContext)

    /* component is mounted to the DOM, React renders 
    blank HTML first, then gets data, then re-renders
    */
   useEffect(() => {
       console.log("CustomerList: First render before data")
       getCustomers()
   }, [])
    /*
        This effect is solely for learning purposes. The effect
        it is responding to is that the customer state changed.
    */
   useEffect(() => {
       console.log("CustomerList after state changed")
       console.log(customers)
   }, [customers])

   return (
       <div className="customers">
           {
               customers.map(cus => <Customer key={cus.id} customer={cus} />)
           }
       </div>
   )
}