import bcrypt from "bcryptjs";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS!);

// Encrypts a plain text string using bcrypt
export async function encrypt(plainText: string): Promise<string> {
    if (!SALT_ROUNDS || isNaN(SALT_ROUNDS)) {
        throw new Error("SALT_ROUNDS environment variable is not set or invalid.");
    }
    return await bcrypt.hash(plainText, SALT_ROUNDS);
}

// Compares a plain text string with a hashed string
export async function decrypt(plainText: string, hash: string): Promise<boolean> {
    if (!SALT_ROUNDS || isNaN(SALT_ROUNDS)) {
        throw new Error("SALT_ROUNDS environment variable is not set or invalid.");
    }
    return await bcrypt.compare(plainText, hash);
}
