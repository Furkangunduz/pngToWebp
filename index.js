const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const supportedFormats = ['jpeg', 'jpg', 'png', 'webp', 'tiff', 'gif', 'avif', 'heif'];

const argv = yargs(hideBin(process.argv))
  .option('input', {
    alias: 'i',
    type: 'string',
    demandOption: true,
    describe: 'Input format (e.g., png, jpg)',
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    demandOption: true,
    describe: 'Output format (e.g., webp, jpeg)',
  })
  .check((argv) => {
    if (!supportedFormats.includes(argv.input.toLowerCase()) || !supportedFormats.includes(argv.output.toLowerCase())) {
      throw new Error(`Unsupported format. Supported formats are: ${supportedFormats.join(', ')}.`);
    }
    return true;
  }).argv;

async function convertImages(directoryPath, inputFormat, outputFormat) {
  try {
    if (!fs.existsSync(directoryPath)) {
      console.log('Directory does not exist.');
      return;
    }

    const files = await fs.readdir(directoryPath);

    const inputFiles = files.filter((file) => path.extname(file).toLowerCase() === `.${inputFormat}`);

    if (inputFiles.length === 0) {
      console.log(`No ${inputFormat.toUpperCase()} files found in the directory.`);
      return;
    }

    const conversionPromises = inputFiles.map(async (inputFile) => {
      const filePath = path.join(directoryPath, inputFile);
      const outputFilePath = path.join(directoryPath, inputFile.replace(`.${inputFormat}`, `.${outputFormat}`));

      try {
        await sharp(filePath)[outputFormat]().toFile(outputFilePath);

        console.log(`Converted: ${inputFile} -> ${outputFilePath}`);
      } catch (error) {
        console.error(`Error converting ${inputFile}: ${error.message}. Skipping this file.`);
      }
    });

    await Promise.all(conversionPromises);

    console.log(`All ${inputFormat.toUpperCase()} files have been converted to ${outputFormat.toUpperCase()} format.`);
  } catch (error) {
    console.error('Error processing the directory:', error);
  }
}

const folderPath = process.argv[2];

if (!folderPath) {
  console.log('Please provide a folder path as an argument.');
  console.log('Usage: node convertImages.js <folder-path> --input <input-format> --output <output-format>');
} else {
  const inputFormat = argv.input.toLowerCase();
  const outputFormat = argv.output.toLowerCase();
  convertImages(folderPath, inputFormat, outputFormat);
}
