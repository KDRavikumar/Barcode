const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/forms', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Define schemas and models
const formSchema = new mongoose.Schema({
  Sender: Object,
  Receiver: Object,
  Shipment: Object,
  Barcode: Object,
});

const FormData = mongoose.model('FormData', formSchema);

// Define API routes
app.post('/api/forms', async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(201).send(formData);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/forms/:id', async (req, res) => {
  try {
    const formData = await FormData.findById(req.params.id);
    res.send(formData);
  } catch (err) {
    res.status(404).send('Form data not found');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
