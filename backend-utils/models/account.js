import mongoose from "mongoose";
// Define the Account schema

const accountSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    refresh_token: { type: String },
    access_token: { type: String, required: true },
    expires_at: { type: Number, required: true },
    token_type: { type: String },
    scope: { type: String },
    id_token: { type: String },
    session_state: { type: String },
    oauth_token_secret: { type: String },
    oauth_token: { type: String }
  });
  module.exports = accountSchema