const API_URL = "http://localhost:8080/employees";

export async function getEmployees(
    page = 0,
    size = 5,
    sortBy = "id"
) {
    const response = await fetch(
        `${API_URL}/page?page=${page}&size=${size}&sortBy=${sortBy}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch employees");
    }

    return await response.json();
}


export async function searchEmployees(name) {

    const response = await fetch(
        `${API_URL}/search?name=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
        throw new Error("Failed to search employees");
    }

    return response.json();
}


export async function addEmployee(employee) {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            ...employee,
            salary: Number(employee.salary)
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            Object.values(data).join(", ")
        );
    }

    return data;
}


export async function updateEmployee(employee) {

    const response = await fetch(
        `${API_URL}/${employee.id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: employee.name,
                email: employee.email,
                department: employee.department,
                salary: Number(employee.salary)
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            Object.values(data).join(", ")
        );
    }

    return data;
}


export async function deleteEmployee(id) {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete employee");
    }
}