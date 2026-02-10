const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User Model
const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: { type: String, unique: true },
  address: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

// Enquiry Model
const enquirySchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  address: String,
  enquiry: String,
  date: { type: Date, default: Date.now },
});
const Enquiry = mongoose.model('Enquiry', enquirySchema);

// Register
app.post('/api/register', async (req, res) => {
  const { name, mobile, email, address, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, mobile, email, address, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { name: user.name, mobile: user.mobile, email: user.email, address: user.address } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Profile
app.put('/api/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByIdAndUpdate(decoded.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Submit Enquiry
app.post('/api/enquiry', async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json({ message: 'Enquiry submitted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Enquiries
app.get('/api/enquiries', async (req, res) => {
  const enquiries = await Enquiry.find().sort({ date: -1 });
  res.json(enquiries);
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));