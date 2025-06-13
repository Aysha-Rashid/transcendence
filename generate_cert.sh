#!/bin/bash

# Load .env file
if [ -f ".env" ]; then
    source .env
else
    echo "Error: .env file not found."
    exit 1
fi
# Check if openssl is installed
if ! command -v openssl &> /dev/null; then
    echo "Error: openssl is not installed. Please install it and try again."
    exit 1
fi

# Generate certificates if they don’t exist
if [ -f "$KEY_FILE" ] && [ -f "$CERT_FILE" ]; then
    echo "Certificates already exist. Skipping generation."
else
    echo "Generating certificates..."
    mkdir -p "$CERT_DIR"
    if ! openssl req -x509 -newkey rsa:2048 -days 365 -nodes \
        -keyout "$KEY_FILE" -out "$CERT_FILE" -subj "//CN=localhost"; then
        echo "Error: Certificate generation failed."
        exit 1
    fi
    chmod 644 "$CERT_DIR"/*.pem
    echo "Certificates generated successfully."
fi