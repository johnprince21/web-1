// import
const User = require('../../models/User.Model');
const { sendOTP } = require('../../mailjet');

// Router
const forgotRouter = require("express").Router();

// Temporary storage for OTP
const otpStore = new Map();


//send OTP to the email
forgotRouter.post('/', async (req, res) => { 
    try {
        const { email } = req.body;
        
        // check if the email is provided
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // get data from server
        const user = await User.findOne({ email });

        //check if user exixts
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        //Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        //store OTP with expiry (5 minutes)
        otpStore.set(otp, { email, expireAt: Date.now() + 5 * 60 * 1000 });

        //send OTP via email
        await sendOTP(email, otp);

        res.status(200).json({
            message: 'OTP sent successfully',
            success: true,
            data: otp
        });

    } catch (err) {
        return res.status(500).json({
            message: 'Server Error',
            error: err.message
        });
    }
});

// verify OTP
forgotRouter.post('/validate', (req, res) => {
    try {
        const { otp } = req.body;

        // check if otp is provided
        if (!otp) {
            return res.status(400).json({ error: 'OTP is required' });
        }

        // Retrieve stored data for the OTP
        const storedOtpData = otpStore.get(otp);

        // Check if OTP exists and is still valid
        if (!storedOtpData) {
            return res.status(401).json({ message: "OTP not found or expired" });
        }

        const { expireAt } = storedOtpData;

        // Check if OTP is expired
        if (Date.now() > expireAt) {
            otpStore.delete(otp);
            return res.status(401).json({ message: "OTP has expired" });
        }

        // OTP is valid
        otpStore.delete(otp);

        return res.status(200).json({
            message: "OTP validated successfully",
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Server Error',
            error: err.message
        });
    }
});

module.exports = forgotRouter;