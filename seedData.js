const mongoose = require('mongoose');
const Lead = require('./models/Lead.js');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crm_db';

const seedLeads = [
    {
        name: "John Doe",
        email: "john@example.com",
        source: "Contact Form",
        status: "new",
        notes: [{ content: "Highly interested in the new product line." }]
    },
    {
        name: "Jane Smith",
        email: "jane@company.com",
        source: "Referral",
        status: "contacted",
        notes: [{ content: "Sent the brochure yesterday." }]
    },
    {
        name: "Bob Johnson",
        email: "bob@tech.io",
        source: "Website Chat",
        status: "converted",
        notes: [{ content: "Signed the contract!" }]
    },
    {
        name: "Alice Brown",
        email: "alice@design.co",
        source: "Contact Form",
        status: "new",
        notes: []
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for seeding');

        await Lead.deleteMany({});
        console.log('Cleared existing leads');

        await Lead.insertMany(seedLeads);
        console.log('Database seeded successfully');

        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
