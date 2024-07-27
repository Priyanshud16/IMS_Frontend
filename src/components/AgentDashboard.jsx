import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AgentDashboard() {
    const [data, setData] = useState([]);
    const [newItem, setNewItem] = useState({ name: '' });

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get("https://imsback-1.onrender.com/api/data", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://imsback-3.onrender.com/api/data/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setData(data.filter(item => item._id !== id));
        } catch (error) {
            console.error('Failed to delete data', error);
        }
    }

    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://imsback-1.onrender.com/api/data", newItem, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setData([...data, response.data]);
            setNewItem({ name: '' }); // Reset the form input
        } catch (error) {
            console.error('Failed to add data', error);
        }
    }

    return (
        <div>
            <h2>Agent Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    required
                />
                <button type="submit">Add Data</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>
                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AgentDashboard;
