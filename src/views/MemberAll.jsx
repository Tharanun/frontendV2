import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const MemberAll = () => {
  const [member, setMember] = useState([]);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: "",
    tel: "",
    email: "",
  });
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/member/memberAll');
      const sortedMember = response.data.sort((a, b) => a.id - b.id);
      setMember(sortedMember);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (memberId) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(`http://localhost:8080/member/delete/${memberId}`);
          console.log(response);
          fetchData(); // Reload data after deletion
          Swal.fire('Member deleted successfully!', '', 'success');
        } else if (result.isDenied) {
          Swal.fire('You canceled the deletion.', '', 'info');
        }
      });
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleUpdate = (member) => {
    setEditingMemberId(member.id);
    setEditFormData({
      username: member.username,
      tel: member.tel,
      email: member.email,
      // Set other fields accordingly
    });
  };
  
  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e, memberId) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/member/update/${memberId}`, {
        ...editFormData,
      });
      console.log(response);

      setEditingMemberId(null);
      setEditFormData({
        username: "",
        tel: "",
        email: "",
      });
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
      console.log('API Error:', error.response.data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-base-content">Member List</h2>
      <ul>
        {member.map((member) => (
          <li
            key={member.id}
            className={`border p-4 my-4 rounded ${
              member.id % 2 === 0 ? 'bg-base-100' : 'bg-base-300'
            }`}
          >
            <h3 className="text-xl font-bold text-blue-700">{member.username}</h3>
            <p className="text-green-600">Tel: {member.tel}</p>
            <p className="text-purple-600">Email: {member.email}</p>
            <div className="mt-4 space-x-2">
              <button
                className="btn btn-primary"
                onClick={() => handleUpdate(member)}
              >
                Update
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleDelete(member.id)}
              >
                Delete
              </button>
            </div>
            {editingMemberId === member.id && (
              <form
                className="mt-4 space-y-2"
                onSubmit={(e) => handleEditSubmit(e, editingMemberId)}
              >
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={editFormData.username}
                  onChange={handleEditChange}
                  className="input mx-4"
                />
                <input
                  type="text"
                  name="tel"
                  placeholder="Tel"
                  value={editFormData.tel}
                  onChange={handleEditChange}
                  className="input mx-4"
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  className="input mx-4"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit Update
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberAll;
