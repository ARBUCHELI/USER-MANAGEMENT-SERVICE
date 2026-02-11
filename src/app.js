/**
 * @fileoverview Main application entry point for the User Management Service.
 * This file initializes the Express server, connects to MongoDB, and sets up
 * routing and error handling middleware.
 * 
 * @module app
 * @requires dotenv
 * @requires express
 * @requires ./config/db
 * @requires ./config/server
 * @requires ./routes/userRoutes
 * @requires ./utils/errorHandler
 */

// Load environment variables from .env file into process.env
require('dotenv').config()

// Import required modules
const express = require('express')
const connectDB = require('./config/db')
const initServer = require('./config/server')
const userRoutes = require('./routes/userRoutes')
const errorHandler = require('./utils/errorHandler')

// Initialize Express application with middleware (CORS, body-parser)
const app = initServer()

// Establish connection to MongoDB database
connectDB()

// Mount user routes at /api/users endpoint
// All user-related API endpoints will be prefixed with /api/users
app.use('/api/users', userRoutes)

// Global error handling middleware - must be registered last
app.use(errorHandler)

// Server configuration
const PORT = process.env.PORT || 5000

// Start the HTTP server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
