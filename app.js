const express = require('express')
const mongoose = require("./db_connection")
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    age: Number
});

const Contact = mongoose.model('contactlist', contactSchema);

app = express()
app.use(express.json());
const port = 8000

app.get('/all', (req, res) => {
    Contact.find()
        .then(contacts => {
            res.json(contacts);
        })
        .catch(err => {
            console.error('Error fetching contacts:', err);
            res.status(500).json({ error: 'Server error' });
        });
})

app.get("/contact/:id", (req, res) => {
    let { id } = req.params;
    Contact.findById(id)
        .then(contact => {
            if (!contact) {
                return res.status(404).json({ error: 'Contact not found' });
            }
            res.json(contact);
        })
        .catch(err => {
            console.error('Error fetching contact:', err);
            res.status(500).json({ error: 'Server error' });
        });
})

app.get("/plus_18", (req, res) => {
    Contact.find({ age: { $gt: 18 } })
        .then(contacts => {
            res.json(contacts);
        })
        .catch(err => {
            console.error('Error fetching contacts:', err);
            res.status(500).json({ error: 'Server error' });
        });
})

app.get("/plus_18_contains_ah", (req, res) => {
    Contact.find({ age: { $gt: 18 }, $or: [{ fname: { $regex: /ah/, $options: 'i' } }, { lname: { $regex: /ah/, $options: 'i' } }] })
        .then(contacts => {
            res.json(contacts);
        })
        .catch(err => {
            console.error('Error fetching contacts:', err);
            res.status(500).json({ error: 'Server error' });
        });
})

app.get("/update_seif_to_anis", (req, res) => {
    Contact.findOneAndUpdate({ lname: 'Seif' }, { lname: 'Anis' })
        .then(contacts => {
            res.json(contacts);
        })
        .catch(err => {
            console.error('Error fetching contacts:', err);
            res.status(500).json({ error: 'Server error' });
        });
})

app.get("/del_age_less_5", (req, res)=>{
    Contact.deleteMany({ age: { $lt: 5 } })
    .then(contacts => {
        res.json(contacts);
    })
    .catch(err => {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ error: 'Server error' });
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

