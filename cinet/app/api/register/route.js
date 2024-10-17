import bcrypt from "bcrypt"; // Import bcrypt
import { NextResponse } from "next/server";
import connectMongoDB from "./../../../lib/mongodb"; // Ensure correct path to mongodb.js
import User from "./../../../models/user"; // Ensure correct path to user.js

export async function POST(request) {
  try {
    await connectMongoDB(); // Connect to MongoDB
    const body = await request.json(); // Parse incoming JSON data

    const { firstname, lastname, studentId, year, email, password } = body;

    // Basic validation
    if (!firstname || !lastname || !studentId || !year || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [{ studentId }, { email }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Student ID or Email already in use." },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user document
    const newUser = new User({
      firstname,
      lastname,
      studentId,
      year,
      email,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save(); // Save the user to MongoDB

    console.log("User registered:", newUser);

    return NextResponse.json(
      { message: "Signup successful!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling signup:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
