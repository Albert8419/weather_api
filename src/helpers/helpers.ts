// Importing the Algorand SDK and configuration functions
import algosdk from "algosdk";
import { getClient, getAccount } from "../config/config.js";

/**
 * Stores AQI data on the blockchain
 * @param data The AQI data to be stored
 * @returns A Promise that resolves once the data is stored
 */
export const storeAQIData = async (data: AQIData): Promise<void> => {
    try {
        // Get client and account details
        const client = getClient();
        const account = getAccount();
        
        // Get suggested transaction parameters
        const suggestedParams = await client.getTransactionParams().do();
        
        // Encode AQI data as note
        const note = algosdk.encodeObj(data);

        // Create transaction object
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: account.addr,
            to: account.addr, // Sending the transaction to oneself
            amount: 1000, // Minimum amount
            note: note,
            suggestedParams: suggestedParams,
        });

        // Sign and send transaction
        const signedTxn = txn.signTxn(account.sk);
        const sendTxn = await client.sendRawTransaction(signedTxn).do();
        console.log("Transaction ID:", sendTxn.txId);
    } catch (error) {
        console.error("Failed to store AQI data:", error);
    }
};
