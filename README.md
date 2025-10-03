# home-task

# Wallet Connection Feature – MetaMask Integration

# Overview

This project implements a functional “Connect Wallet” button that integrates with MetaMask. It allows users to connect their Ethereum wallet, view their account address, and manage the connection state in the app.

# Features Implemented

Modal interface to select and connect wallets (currently supports MetaMask only).

Detects if MetaMask is installed.

Requests wallet connection using window.ethereum API.

Displays the connected account address (e.g., 0xabc...123) in the modal and updates the main button.

# Handles errors gracefully:

Shows a message if MetaMask is not installed.

Handles user rejection of connection requests.

Stores the connected account in React state (local state/context) for UI updates.

# Technical Details

Framework: React + TypeScript

Wallet Integration: window.ethereum API

State Management: React local state (or context if required)

Error Handling: Async/await used with try/catch for connection requests

# How It Works

Initial State:

The button shows Connect Wallet if no wallet is connected.

User Clicks Button:

A modal opens showing available wallets (MetaMask).

MetaMask Selected:

Checks if window.ethereum is available.

Requests account connection using ethereum.request({ method: 'eth_requestAccounts' }).

On success, updates UI with the connected wallet address.

On failure or if MetaMask is missing, displays an appropriate message.

Connected State:

Button updates to display the connected wallet address.

Installation / Running Locally
# Install dependencies
npm install

# Run the development server
npm run dev

Notes

This implementation focuses on front-end wallet connection only; no smart contract or blockchain transaction logic is included.

The wallet connection logic is modular and can be extended to support other wallets in the future.
