import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;

        const mongoAddress = 'mongodb+srv://sorazora14:hunter1201@cluster0.nazop5r.mongodb.net/meetups?retryWrites=true&w=majority';
        const client = await MongoClient.connect(mongoAddress);
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup was inserted successfully!' });
    };
};

export default handler;