import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormBuilder from './components/FormBuilder';
import FormList from './components/FormList';
import FormEdit from './components/FormEdit';
import FormView from './components/FormView';

const App = () => {
    const [forms, setForms] = useState([]);
    const [editingFormId, setEditingFormId] = useState(null);
    const [viewingFormId, setViewingFormId] = useState(null);

    // Fetch all forms from the server
    const fetchForms = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/forms');
            setForms(response.data);
        } catch (error) {
            console.error('Error fetching forms:', error);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []);

    // Handle form deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/form/${id}`);
            fetchForms();
        } catch (error) {
            console.error('Error deleting form:', error);
        }
    };

    // Handle form editing
    const handleEdit = (id) => {
        setEditingFormId(id);
    };

    // Handle form viewing
    const handleView = (id) => {
        setViewingFormId(id);
    };

    // Close form view modal
    const handleCloseView = () => {
        setViewingFormId(null);
    };

    return (
        <div>
            <h1>Form Builder</h1>
            <FormBuilder refreshForms={fetchForms} />
            {editingFormId && (
                <FormEdit formId={editingFormId} refreshForms={fetchForms} />
            )}
            {viewingFormId && (
                <FormView formId={viewingFormId} onClose={handleCloseView} />
            )}
            <FormList 
                forms={forms} 
                onDelete={handleDelete} 
                onEdit={handleEdit} 
                onView={handleView} 
            />
        </div>
    );
};

export default App;
