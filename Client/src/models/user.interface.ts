// src/app/models/user.interface.ts

// Define the interface for your User object, mirroring your backend's Users table
export interface User {
  id: number;          // Corresponds to id (PK) in DB
  name: string;        // Corresponds to name in DB
  email: string;       // Corresponds to email in DB
  
}
