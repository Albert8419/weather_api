import algosdk from "algosdk";

// Algorand configuration
// Setting the Algorand token used for authentication
const algodToken = "a".repeat(64);

// Setting the server URL for the Algorand node
const server: string = "http://localhost";

// Setting the port for communication with the Algorand node
const port: string = "4001";

// Setting the mnemonic passphrase for the account
const mnemonic: string ="session recall clarify journey fashion rural steel clay brick yard winner major chuckle hospital soldier file tumble monster jeans ball differ person butter able setup";

// Function to get the Algorand client
export function getClient(): algosdk.Algodv2 {
    // Create a new Algodv2 client using the configured token, server, and port
    let client = new algosdk.Algodv2(algodToken, server, port);
    return client;
}

// Function to get the Algorand account
export function getAccount(): algosdk.Account {
    // Derive the Algorand account from the mnemonic passphrase
    let account = algosdk.mnemonicToSecretKey(mnemonic);
    return account;
}

// AQI API configuration
// Setting the base URL for the AQI API
export const apiConfig = {
    baseUrl: 'https://api.waqi.info',
    // Set the token for authentication with the AQI API
    token: 'e1e26600861c3e38c921da095baad05c07d509cd'
};

