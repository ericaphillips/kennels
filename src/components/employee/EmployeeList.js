import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { Employee } from "./Employee"
import "./Employee.css"

export const EmployeeList = () => {
    //this state changes when getEmployees is invoked below
    const { employees, getEmployees } = useContext(EmployeeContext)

    /* component is mounted to the DOM, React renders 
    blank HTML first, then gets data, then re-renders
    */
   useEffect(() => {
       console.log("EmployeeList: First render before data")
       getEmployees()
   }, [])
    /*
        This effect is solely for learning purposes. The effect
        it is responding to is that the employee state changed.
    */
   useEffect(() => {
       console.log("EmployeeList after state changed")
       console.log(employees)
   }, [employees])

   return (
       <div className="employees">
           {
               employees.map(emp => <Employee key={emp.id} employee={emp} />)
           }
       </div>
   )
}