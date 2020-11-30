import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { Employee } from "./Employee"
import "./Employee.css"

//add props as a parameter because you're apssing a property object to the epmloyee list
export const EmployeeList = (props) => {
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
        <h1>Employees</h1>
        <button onClick={() => props.history.push("/employees/create")}>
            Add Employee
        </button>
        <article className="employeeList">
            {employees.map(employee => <Employee key={employee.id} employee={employee} />)}
        </article>
    </div>
)
}