
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/employees");
                const data = await response.json();
                setEmployees(data)

            } catch (error) {
                console.error("Error fetching eployees: ".error.message)
            }
        }
        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
                method: "DELETE",
            });
            if(response.ok){
                setEmployees((preventEmployees) =>
                    preventEmployees.filter((employee)=> employee.id !== employeeId)
                )
            }

            console.log(`Employee with ID${employeeId} deleting successfully!`)
        } catch (error) {
            console.error("Error deleting employee: ".error.message)
        }
    }

    const handleUpdate = (employeeId) => {
        navigate(`/employee/${employeeId}`);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center">Employees</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.department}</td>
                                <td>
                                    <Button variant="outline-secondary" onClick={() => handleUpdate(employee.id)}>Update</Button>{" "}
                                    <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}</tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
export default Dashboard;