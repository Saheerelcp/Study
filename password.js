// const express = require('express');
// const mongoose = require('mongoose');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const Customer = require('./models/Customer');  // Your customer schema





// const app = express();

// app.use(express.json());

// // Forgot Password Route (Step 2)
// app.post('/forgot-password', async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await Customer.findOne({ email }) || await Seller.findOne({ email });
//         if (!user) return res.status(404).json({ message: 'User not found.' });

//         const resetToken = crypto.randomBytes(32).toString('hex');
//         const tokenExpiry = Date.now() + 3600000;  // 1 hour expiry

//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpires = tokenExpiry;
//         await user.save();

//         const resetURL = `http://localhost:5002/reset-password/${resetToken}`;
//         // Create a transporter
//         const transporter = nodemailer.createTransport({
//             service: process.env.EMAIL_SERVICE, // e.g. 'gmail'
//             auth: {
//                 user: process.env.EMAIL_USER,    // Your email
//                 pass: process.env.EMAIL_PASS      // Your email password
//             }
//         });
//         const mailOptions = {
//             to: user.email,
//             from: 'giveandtakestartup@gmail.com',
//             subject: 'Password Reset Request',
//             text: `Click this link to reset your password: ${resetURL}`
//         };

//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ message: 'Reset email sent.' });

//     } catch (error) {
//         res.status(500).json({ message: 'Error in password reset.' });
//     }
// });
// transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//         console.log('Error sending email: ', err);
//         return res.status(500).json({ message: 'Error sending email' });
//     }
//     console.log('Email sent: ', info.response);  // Log the response for successful email
//     res.status(200).json({ message: 'Password reset email sent successfully.' });
// });


// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
