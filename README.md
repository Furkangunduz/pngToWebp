# Image Format Converter

A Node.js command-line tool that converts images between different formats in bulk. This script can process all images of a specified format
in a directory and convert them to your desired output format.

## Features

- Bulk image conversion
- Supports multiple image formats (JPEG, PNG, WebP, TIFF, GIF, AVIF, HEIF)
- Preserves original files
- Parallel processing for better performance
- Error handling for individual files
- Command-line interface with format validation

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install the required dependencies:

```bash
npm install
```

## Usage

Basic command structure:

```bash
node convertImages.js <folder-path> --input <input-format> --output <output-format>
```

Example:

```bash
node convertImages.js ./my-images --input png --output webp
```

### Parameters

- `<folder-path>`: Path to the directory containing your images
- `--input` or `-i`: Input format of the images (e.g., png, jpg)
- `--output` or `-o`: Desired output format (e.g., webp, jpeg)

### Supported Formats

- JPEG/JPG
- PNG
- WebP
- TIFF
- GIF
- AVIF
- HEIF

## Examples

Convert all PNG files to WebP:

```bash
node convertImages.js ./photos --input png --output webp
```

Convert all JPEG files to AVIF:

```bash
node convertImages.js ./images --input jpeg --output avif
```

## Error Handling

The script includes error handling for:

- Invalid directory paths
- Unsupported file formats
- Individual file conversion failures
- Missing command-line arguments

## Notes

- Original files are preserved during conversion
- Converted files are saved in the same directory as the originals
- The script processes files in parallel for better performance
- If a conversion fails for a specific file, the script will continue processing other files

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
