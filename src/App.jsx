import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

import {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
} from "./services/employeeService";

function App() {

    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [sortBy, setSortBy] = useState("id");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function loadEmployees() {

        try {

            setLoading(true);
            setError("");

            const data = await getEmployees(
                page,
                5,
                sortBy
            );

            setEmployees(data.content);
            setTotalPages(data.totalPages);

        } catch (error) {

            console.error(error);
            setError(error.message);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {
        loadEmployees();
    }, [page, sortBy]);


    async function handleAddEmployee(employee) {

        try {

            setError("");

            await addEmployee(employee);

            await loadEmployees();

        } catch (error) {

            setError(error.message);
        }
    }


    async function handleUpdateEmployee(employee) {

        try {

            setError("");

            await updateEmployee(employee);

            setEditingEmployee(null);

            await loadEmployees();

        } catch (error) {

            setError(error.message);
        }
    }


    async function handleDeleteEmployee(id) {

        if (!window.confirm(
            "Are you sure you want to delete this employee?"
        )) {
            return;
        }

        try {

            setError("");

            await deleteEmployee(id);

            await loadEmployees();

        } catch (error) {

            setError(error.message);
        }
    }


    return (
        <>
            <Navbar />

            <main>

                <EmployeeForm
                    onAddEmployee={handleAddEmployee}
                    onUpdateEmployee={handleUpdateEmployee}
                    editingEmployee={editingEmployee}
                    onCancelEdit={() =>
                        setEditingEmployee(null)
                    }
                />

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <EmployeeList
                    employees={employees}
                    onEdit={setEditingEmployee}
                    onDelete={handleDeleteEmployee}
                    loading={loading}
                />

                <div className="pagination">

                    <button
                        disabled={page === 0}
                        onClick={() =>
                            setPage(page - 1)
                        }
                    >
                        Previous
                    </button>

                    <span>
                        Page {page + 1} of {totalPages}
                    </span>

                    <button
                        disabled={
                            page >= totalPages - 1
                        }
                        onClick={() =>
                            setPage(page + 1)
                        }
                    >
                        Next
                    </button>

                </div>

                <div className="sorting">

                    <label>
                        Sort by:
                    </label>

                    <select
                        value={sortBy}
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            setPage(0);
                        }}
                    >

                        <option value="id">
                            ID
                        </option>

                        <option value="name">
                            Name
                        </option>

                        <option value="salary">
                            Salary
                        </option>

                        <option value="department">
                            Department
                        </option>

                    </select>

                </div>

            </main>
        </>
    );
}

export default App;