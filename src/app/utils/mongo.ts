/* eslint-disable no-var */
import { MongoClient, MongoClientOptions } from 'mongodb'; 

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const options: MongoClientOptions = {
    serverSelectionTimeoutMS: 30000, // 30 seconds
};

let client: MongoClient;

const connectWithRetry = (retries = 3, delayMs = 5000): Promise<MongoClient> => {
    client = new MongoClient(uri, options);

    return new Promise((resolve, reject) => {
        const attemptConnection = (attempt = 1) => {
        client.connect()
            .then(resolve)
            .catch((err) => {
            console.error(`MongoDB connection attempt ${attempt} failed:`, err.message);
            if (attempt < retries) {
                setTimeout(() => attemptConnection(attempt + 1), delayMs);
            } else {
                reject(new Error(`Failed to connect to MongoDB after ${retries} attempts.`));
            }
            });
        };

        attemptConnection();
    });
};

if (!global._mongoClientPromise) {
    global._mongoClientPromise = connectWithRetry();
}

const clientPromise = global._mongoClientPromise;

export default clientPromise;
