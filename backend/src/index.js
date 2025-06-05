require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.post('/data', [
  body('name').isString().notEmpty(),
  body('value').isNumeric()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Handle data here
  res.json({ message: 'Data received' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Backend running securely' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
