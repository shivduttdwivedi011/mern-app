import React from 'react';

const FormList = ({ forms, onDelete, onEdit, onView }) => {
    return (
        <div className="container">
            <h2>Forms List</h2>
            <ul>
                {forms.map((form) => (
                    <li key={form._id} style={{ backgroundColor: 'white', padding: '10px', marginBottom: '10px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}>
                        {form.title}
                        <button onClick={() => onEdit(form._id)}>Edit</button>
                        <button onClick={() => onDelete(form._id)}>Delete</button>
                        <button onClick={() => onView(form._id)}>View</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FormList;
