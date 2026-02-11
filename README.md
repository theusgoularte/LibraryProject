# Personal Library Manager

A streamlined web application to manage a personal book collection. This project uses a Node.js backend to interact with a MySQL database and a clean, compact frontend.

## Database Schema

The application uses a MySQL database named **Library**. Use the following script to set up your environment:


CREATE DATABASE IF NOT EXISTS Library;
USE Library;

DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    status_reading VARCHAR(50) DEFAULT 'Reading',
    rate INT DEFAULT 0
);

## Project Structure

   - server.js: Express server handling API requests (GET, POST, DELETE).

   - main.html: Entry point containing the book registration form.

   - library.html: Dashboard where the collection is displayed.

   - script.js: Logic for form submissions, API calls, and UI updates.

   - style.css: Compact styling for a focused user interface.

## Setup and Installation

# 1. Prerequisites

Ensure you have Node.js and MySQL Server installed.

# 2. Backend Setup

 Open your terminal and navigate to the project folder:
 cd sitelivro
# 3. Run: npm install express mysql2 cors 

and then node server.js
