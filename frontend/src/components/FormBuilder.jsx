import React, { useState } from 'react';
import axios from 'axios';

const FormBuilder = ({ refreshForms }) => {
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([]);

    const addField = (type) => {
        setFields([...fields, { type, value: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://mern-app-backend-pvtl.onrender.com/api/form', { title, fields });
        setTitle('');
        setFields([]);
        refreshForms();
    };

    return (
        <div className="container">
            <h2>Create Form</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Form Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <div>
                    <button type="button" onClick={() => addField('text')}>Add Text Field</button>
                    <button type="button" onClick={() => addField('number')}>Add Number Field</button>
                    <button type="button" onClick={() => addField('email')}>Add Email Field</button>
                    <button type="button" onClick={() => addField('password')}>Add Password Field</button>
                    <button type="button" onClick={() => addField('date')}>Add Date Field</button>
                </div>
                {fields.map((field, index) => (
                    <div key={index}>
                        <label>{field.type}</label>
                        <input type={field.type} value={field.value} readOnly />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormBuilder;
