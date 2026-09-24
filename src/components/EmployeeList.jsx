import { useState } from "react";

function EmployeeList({
                          employees,
                          onEdit,
                          onDelete
                      }) {

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");
    const [minSalary, setMinSalary] = useState("");

    const filteredEmployees = employees.filter(employee => {

        const matchesSearch =
            employee.name
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesDepartment =
            department === "" ||
            employee.department.toLowerCase() ===
            department.toLowerCase();

        const matchesSalary =
            minSalary === "" ||
            employee.salary >= Number(minSalary);

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesSalary
        );
    });

    return (
        <section className="employee-list">

            <h2>Employee List</h2>

            <div className="filters">

                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Department..."
                    value={department}
                    onChange={(e) =>
                        setDepartment(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Minimum salary..."
                    value={minSalary}
                    onChange={(e) =>
                        setMinSalary(e.target.value)
                    }
                />

            </div>

            {filteredEmployees.length === 0 ? (

                <p>No employees found.</p>

            ) : (

                <table>

                    <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>

                    </thead>

                    <tbody>

                    {filteredEmployees.map(employee => (

                        <tr key={employee.id}>

                            <td>
                                {employee.id}
                            </td>

                            <td>
                                {employee.name}
                            </td>

                            <td>
                                {employee.email}
                            </td>

                            <td>
                                {employee.department}
                            </td>

                            <td>
                                ₹{employee.salary}
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        onEdit(employee)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        onDelete(employee.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            )}

        </section>
    );
}

export default EmployeeList;