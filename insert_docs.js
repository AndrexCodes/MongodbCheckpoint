const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://machariaandrew1428:7iWIwRkFoqbc5Oec@testmongodb.pv8ylqr.mongodb.net/?retryWrites=true&w=majority&appName=TestMongoDB');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    age: Number
});

const Contact = mongoose.model('contactlist', contactSchema);
let conatcts = [
    {
        fname: "Ben",
        lname: "Moris",
        email: "ben@gmail.com",
        age: 26
    },
    {
        fname: "Keif",
        lname: "Seif",
        email: "keif@gmail.com",
        age: 15
    },
    {
        fname: "Emillie",
        lname: "Brouge",
        email: "emillie@gmail.com",
        age: 40
    },
    {
        fname: "Alex",
        lname: "Brown",
        age: 4
    },
    {
        fname: "Denzel",
        lname: "Washington",
        age: 3
    }
]

Contact.insertMany(conatcts)
.then((docs)=>{
    console.log("Contacts added successfully")
})
.catch(()=>{
    console.log("Error adding contacts")
})





