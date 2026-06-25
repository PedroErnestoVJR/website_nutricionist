const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/booking', (req, res) => {
  const { fname, lname, femail, fphone, ftype, fspec, fmsg } = req.body;

  // Basic validation
  if (!fname || !lname || !femail || !fphone) {
    return res.status(400).json({ error: 'Please fill all required fields.' });
  }

  // Log the form data (in a real application, you would save this to a database)
  console.log('New booking request:');
  console.log(`Name: ${fname} ${lname}`);
  console.log(`Email: ${femail}`);
  console.log(`Phone: ${fphone}`);
  console.log(`Type: ${ftype}`);
  console.log(`Specialty: ${fspec}`);
  console.log(`Message: ${fmsg}`);
  console.log('-----------------');

  res.status(200).json({ message: 'Booking request received successfully!' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
