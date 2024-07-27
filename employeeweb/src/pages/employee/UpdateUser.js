import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, SetFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        SetFormData({
            ...formData,
            [name]:value,
        })
    };
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const data = await response.json();
                SetFormData(data)
                console.log(`employee ${id} succefuly fetched!`)
            } catch (error) {
                console.error(`Error fetching employee ${id}: `, error.message)
            }
        }
        fetchEmployee();
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Employee created: ", data)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="center-form">
                <h1>Edit employee</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="department"
                            placeholder="Enter department name"
                            value={formData.department}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">Edit Employee</Button>
                </Form>
            </div>
        </>
    )
}

export default UpdateUser;