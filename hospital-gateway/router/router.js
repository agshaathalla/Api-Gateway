import axios from "axios";
import { Router } from "express";

const API_PINE_VALLEY = "http://localhost:9001/pine-valley";
const API_GRAND_OAK = "http://localhost:9002/grand-oak";

const router = Router();

router.get("/", (req, res) => {
    res.send("Express X Typescript: Hello world");
});

router.get("/doctors", async (req, res) => {
    const data = [];
    const grandOakData= await axios.get(`${API_GRAND_OAK }/doctors`).then(res => {
            return res;
        }).catch(error=>res.status(500).send(`Error ${error}`));
    const pineValleyData= await axios.post(`${API_PINE_VALLEY}/doctors`, {doctorType:""}).then(res => {
            return res;
        }).catch(error=>res.status(500).send(`Error ${error}`));


    data.push(...pineValleyData.data.doctors);
    data.push(...grandOakData.data);    
    
    res.status(200).send(data);
});

router.get("/doctors/:doctorType", async (req, res) => {
    const data = [];
    const grandOakData= await axios.get(`${API_GRAND_OAK }/doctors/${req.params.doctorType}`).then(res => {
            return res;
        }).catch(error=>res.status(500).send(`Error ${error}`));
    const pineValleyData= await axios.post(`${API_PINE_VALLEY}/doctors`, {doctorType:req.params.doctorType}).then(res => {
            return res;
        }).catch(error=>res.status(500).send(`Error ${error}`));


    data.push(...pineValleyData.data.doctors);
    data.push(...grandOakData.data);    
    
    res.status(200).send(data);
});

router.post("/book", (req, res) => {
    const id = req.body.id;
    const hospital = req.body.hospital;
    switch (hospital){
        case "Pine Valley":
            axios.post(`${API_PINE_VALLEY}/book`, {id: id})
                .then(response => {
                    return res.status(200).send(response.data);
                }).catch(error => {
                    return res.status(500).send(error);
                });
            break;
        case "Grand Oak":
            axios.post(`${API_GRAND_OAK}/book`, {id: id})
                .then(response => {
                    return res.status(200).send(response.data);
                }).catch(error => {
                    return res.status(500).send(error);
                });
            break;
        default:
            return res.status(400).send("Invalid hospital");
    }
});

export default router;