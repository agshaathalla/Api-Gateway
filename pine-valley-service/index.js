const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const PORT = 9001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const doctors = JSON.parse(fs.readFileSync('pineValley.json'))

app.get('/', (req, res) => {
	res.send('hello world');
});


app.post('/pine-valley/doctors', (req, res, next) => {
    const body = req.body;

    const filteredDoctor = body.doctorType 
        ? doctors.doctor.filter(doctor => doctor.doctorType === body.doctorType && doctor.status === 'Available') 
        : doctors.doctor.filter(doctor => doctor.status === 'Available');

    res.status(200).json({
        doctors: filteredDoctor
    })
});

app.post('/pine-valley/book', (req, res) => {
    const doctor = doctors.doctor.find(doctor => doctor.id === req.body.id);

    if (!doctor) {
        return res.status(404).json({
            message: "Doctor not found."
        });
    }

    if (doctor.status === "Booked") {
        return res.status(409).json({
            message: "Doctor is already booked."
        });
    }

    doctor.status = "Booked";

    res.status(200).json({
        message: 'Doctor booked successfully',
        doctor: doctor
    });
});

app.listen(PORT, () => {
	console.log(`Pine Valley Hospital Service listening at http://localhost:${PORT}`);
});