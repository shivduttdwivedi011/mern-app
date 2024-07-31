import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormEdit = ({ formId, refreshForms }) => {
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([]);

    useEffect(() => {
        const fetchForm = async () => {
            const response = await axios.get(`http://127.0.0.1:5000/api/form/${formId}`);
            setTitle(response.data.title);
            setFields(response.data.fields);
        };
        fetchForm();
    }, [formId]);

    const handleFieldChange = (index, value) => {
        const newFields = [...fields];
        newFields[index].value = value;
        setFields(newFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://127.0.0.1:5000/api/form/${formId}`, { title, fields });
        refreshForms();
    };

    return (
        <div className="container">
            <h2>Edit Form</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Form Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                {fields.map((field, index) => (
                    <div key={index}>
                        <label>{field.type}</label>
                        <input 
                            type={field.type} 
                            value={field.value} 
                            onChange={(e) => handleFieldChange(index, e.target.value)} 
                        />
                    </div>
                ))}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default FormEdit;
