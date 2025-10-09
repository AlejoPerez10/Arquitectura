import connectToDatabase from '/lib/mongodb';

export default async function handler(req, res) {
    try {
        await connectToDatabase();
        res.status(200).json({ message: '✅ Connected to MongoDB successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '❌ Failed to connect to MongoDB' });
    }
}
