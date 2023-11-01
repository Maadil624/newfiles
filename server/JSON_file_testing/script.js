const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const folderPath = path.join(process.cwd(), 'input');
const outfolderPath = path.join(process.cwd(), 'output');
const encryptionKey = 'JI00v1StL82quf8vuQvGvDn-eW4aORsR45APhujV764=';
function encryptJsonFiles(inputFolder, outputFolder) {
  // Make sure the output folder exists, create it if not
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }
  // Create a Fernet-like encryption object
  const fernet = crypto.createCipher('aes-256-cfb', encryptionKey);
  // List all JSON files in the input folder
  const jsonFiles = fs.readdirSync(inputFolder).filter((file) => file.endsWith('.json'));
  for (const jsonFile of jsonFiles) {
    // Read JSON data from the input file
    const inputFilePath = `${inputFolder}/${jsonFile}`;
    const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));
    // Convert the JSON object to a JSON string
    const jsonStr = JSON.stringify(jsonData);
    // Encrypt the JSON data
    const encryptedData = fernet.update(jsonStr, 'utf-8', 'base64');
    // Define the output file path in the output folder
    const outputFilePath = `${outputFolder}/${jsonFile}`;
    // Save the encrypted data to the output file
    fs.writeFileSync(outputFilePath, encryptedData, 'base64');
  }
}
// Usage
encryptJsonFiles(`${folderPath}`, `${outfolderPath}`);

const encryptedFolder = outfolderPath;
const decryptionFolder = path.join(process.cwd(), 'encFiles');

async function decryptJsonFiles(inputFolder, outputFolder, encryptionKey) {
  // Make sure the output folder exists, create it if not
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  // Create a Fernet-like decryption object
  const decipher = crypto.createDecipher('aes-256-cfb', encryptionKey);

  // List all JSON files in the input folder
  const jsonFiles = fs.readdirSync(inputFolder).filter((file) => file.endsWith('.json'));

  for (const jsonFile of jsonFiles) {
    // Define the input and output file paths
    const inputFilePath = `${inputFolder}/${jsonFile}`;
    const outputFilePath = `${outputFolder}/${jsonFile}`;

    try {
      // Read the encrypted data from the input file
      const encryptedData = fs.readFileSync(inputFilePath, 'base64');

      // Decrypt the data
      const decryptedData = decipher.update(encryptedData, 'base64', 'utf-8');
      // Save the decrypted data to the output file
      // console.log(decryptedData)
      let newdata
      if (decryptedData.startsWith('}') || !decryptedData.endsWith('}}')) {
        newdata = decryptedData
        if (decryptedData.startsWith('}')) {
          // console.log('132', decryptedData.startsWith('}'))
          // console.log(decryptedData)
          newdata = newdata.replace('}', '')
          // console.log(newdata)
        }
        if (!decryptedData.endsWith('}}')) {
          // console.log('140', !decryptedData.endsWith('}}'))
          newdata = newdata.concat('}')
        }
        fs.writeFileSync(outputFilePath, newdata, 'utf-8');
      } else {
        // console.log('else')
        fs.writeFileSync(outputFilePath, decryptedData, 'utf-8');
      }
      // fs.writeFileSync(outputFilePath, decryptedData, 'utf-8');

      console.log(`Decryption complete for ${jsonFile}`);
      // console.log(typeof decryptedData)
    } catch (error) {
      // fs.writeFileSync(outputFilePath, newdata, 'utf-8');
      console.error(`Error decrypting ${jsonFile}: ${error}`);
    }
  }
}

decryptJsonFiles(encryptedFolder, decryptionFolder, encryptionKey);
