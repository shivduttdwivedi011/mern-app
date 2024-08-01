const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://shivdutt_dwivedi:Qwerty0@cluster0.zr6ks8i.mongodb.net/simple-form-builder?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use('/api', formRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
