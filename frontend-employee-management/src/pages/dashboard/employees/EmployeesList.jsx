import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const EmployeesList = ({ employees }) => {
    const [ updatedEmployees, setUpdatedEmployees] = useState(employees);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchdepartments = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/departments`,{
                     headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
                })

                if(!response.ok){
                    throw new Error("failed to fetch departmetns ")
                }

                const data = response.json();
                setDepartments(data)
            } catch (error) {
                toast.error("Failed to fetch departmetns ", {
                    description: error,
                })
            }
        }
    })
  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead >#</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead >Department</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {updatedEmployees.map((employee, index) => (
          <TableRow key={index}>
            <TableCell >{index + 1}</TableCell>
            <TableCell>{employee.user_name}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.status}</TableCell>
            <TableCell>{employee.department_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </>
  )
}

export default EmployeesList