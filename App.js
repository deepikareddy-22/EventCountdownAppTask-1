import React, { useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = formData;
      setUsers(updatedUsers);
      setEditingIndex(null);
    } else {
      setUsers([...users, formData]);
    }
    setFormData({ name: "", email: "" });
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = users.filter((_, i) => i !== index);
    setUsers(filtered);
  };

  return (
    <div className="container">
      <h2>User CRUD with useState</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingIndex !== null ? "Update" : "Add"}</button>
      </form>

      <ul>
        {users.length === 0 ? (
          <p>No users added.</p>
        ) : (
          users.map((user, index) => (
            <li key={index}>
              <strong>{user.name}</strong> ({user.email})
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
