import algosdk from "algosdk";

// Algorand configuration
const algodToken = "a".repeat(64);
const server: string = "http://localhost";
const port: string = "4001";
const mnemonic: string ="depend inform blouse winner joke include school cabbage upon orphan spoon screen inspire gap hybrid liar bullet answer just excess meadow boss alert abandon magnet";

export function getClient(): algosdk.Algodv2 {
    let client = new algosdk.Algodv2(algodToken, server, port);
    return client;
}

export function getAccount(): algosdk.Account {
    let account = algosdk.mnemonicToSecretKey(mnemonic);
    return account;
}

// AQI API configuration
export const apiConfig = {
    baseUrl: 'https://api.waqi.info',
    token: 'e1e26600861c3e38c921da095baad05c07d509cd'
};
