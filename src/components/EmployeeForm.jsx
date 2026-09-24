import { useEffect, useState } from "react";

function EmployeeForm({
                          onAddEmployee,
                          onUpdateEmployee,
                          editingEmployee,
                          onCancelEdit
                      }) {

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        department: "",
        salary: ""
    });

    useEffect(() => {

        if (editingEmployee) {

            setEmployee({
                name: editingEmployee.name,
                email: editingEmployee.email,
                department: editingEmployee.department,
                salary: editingEmployee.salary
            });

        } else {

            setEmployee({
                name: "",
                email: "",
                department: "",
                salary: ""
            });
        }

    }, [editingEmployee]);

    function handleChange(e) {

        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (editingEmployee) {

            await onUpdateEmployee({
                id: editingEmployee.id,
                ...employee
            });

        } else {

            await onAddEmployee(employee);

            setEmployee({
                name: "",
                email: "",
                department: "",
                salary: ""
            });
        }
    }

    return (
        <section className="employee-form">

            <h2>
                {editingEmployee
                    ? "Edit Employee"
                    : "Add Employee"}
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Employee Name"
                    value={employee.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={employee.department}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    value={employee.salary}
                    onChange={handleChange}
                    required
                />

                <button type="submit">

                    {editingEmployee
                        ? "Update Employee"
                        : "Add Employee"}

                </button>

                {editingEmployee && (

                    <button
                        type="button"
                        onClick={onCancelEdit}
                    >
                        Cancel
                    </button>

                )}

            </form>

        </section>
    );
}

export default EmployeeForm;