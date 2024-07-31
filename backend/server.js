const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/simple-form-builder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api', formRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
