const { time } = require('console');
const express = require('express');
const app = express();
const port = 9002;
const fs = require('fs');

const doctors = JSON.parse(fs.readFileSync('grandOak.json'));

app.get('/', (req, res) => {
    res.send('Grand Oak Hospial Service');
});

app.use(express.json());

app.get('/grand-oak/doctors', (req, res) => {
    const filteredDoctors = doctors.doctor.filter(doctor => doctor.status === 'Available');
    res.status(200).json(filteredDoctors);
});

app.get('/grand-oak/doctors/:doctorType', (req, res) => {
    const type = req.params.doctorType;
    const filteredDoctors = doctors.doctor.filter(doctor => doctor.doctorType === type && doctor.status === 'Available');
    res.status(200).json(filteredDoctors);
});

app.post('/grand-oak/book/', (req, res) => {
    const id = req.body.id;
    const doctor = doctors.doctor.find(doctor => doctor.id === id);
    if (doctor) {
        if (doctor.status === 'Available') {
            doctor.status = 'Booked';
            res.status(200).json({
                message: 'Doctor booked successfully',
                doctor: {
                    name: doctor.name,
                    time: doctor.time,
                    status: doctor.status,
                    hospital: doctor.hospital,
                    doctorType: doctor.doctorType
                }
            });
        } else {
            res.status(409).json({
                message: 'Doctor is already booked'
            });
        }
    } else {
        res.status(404).json({
            message: 'Doctor not found'
        });
    }
});

app.listen(port, () => {
    console.log(`Grand Oak Hospital Service listening at http://localhost:${port}`);
});