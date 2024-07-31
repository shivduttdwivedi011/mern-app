import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormView = ({ formId, onClose }) => {
    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/form/${formId}`);
                setForm(response.data);
            } catch (error) {
                console.error('Error fetching form:', error);
            }
        };
        fetchForm();
    }, [formId]);

    if (!form) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>View Form</h2>
            <button onClick={onClose}>Close</button>
            <h3>{form.title}</h3>
            <div>
                {form.fields.map((field, index) => (
                    <div key={index}>
                        <label>{field.type}</label>
                        <input type={field.type} value={field.value} readOnly />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormView;
