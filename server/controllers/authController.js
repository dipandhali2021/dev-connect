import jwt from 'jsonwebtoken';
import { ethers } from 'ethers';
import { asyncHandler } from '../middleware/asyncHandler.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Generate nonce for wallet signature
const generateNonce = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

class AuthController {
  // @desc    Check if wallet exists
  // @route   POST /api/auth/wallet/check
  // @access  Public
  checkWallet = asyncHandler(async (req, res) => {
    const { address } = req.body;

    if (!address) {
      throw new ApiError(400, 'Please provide wallet address');
    }

    const user = await User.findOne({ address: address.toLowerCase() });

    res.json({
      success: true,
      exists: !!user,
      data: user ? {
        _id: user._id,
        name: user.name,
        address: user.address,
        role: user.role,
        age: user.age,
      } : null
    });
  });

  // @desc    Register/Login with wallet
  // @route   POST /api/auth/wallet
  // @access  Public
  walletAuth = asyncHandler(async (req, res) => {
    const { address, signature, name, age, role } = req.body;

    if (!address || !signature) {
      throw new ApiError(400, 'Please provide wallet address and signature');
    }

    // Verify the signature
    const message = `Welcome to DevConnect!\n\nPlease sign this message to verify your wallet ownership.\n\nNonce: ${generateNonce()}`;
    const recoveredAddress = ethers.verifyMessage(message, signature);

    // Check if user exists
    let user = await User.findOne({ address: address.toLowerCase() });

    if (user) {
      // User exists - return token
      const token = generateToken(user._id, user.role);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      return res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          address: user.address,
          role: user.role,
          age: user.age,
        },
      });
    }

    // If user doesn't exist and we have registration data
    if (name && age && role) {
      // Create new user
      user = await User.create({
        name,
        address: address.toLowerCase(),
        addressHash: address.toLowerCase(),
        role,
        age,
      });

      const token = generateToken(user._id, user.role);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      return res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          address: user.address,
          role: user.role,
          age: user.age,
        },
      });
    }

    // If user doesn't exist and no registration data
    throw new ApiError(400, 'Please provide registration data');
  });

  // @desc    Logout user
  // @route   POST /api/auth/logout
  // @access  Private
  logout = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    });
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });

  // @desc    Get current user
  // @route   GET /api/auth/me
  // @access  Private
  getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        address: user.address,
        addressHash:user.address,
        role: user.role,
        age: user.age
      }
    });
  });
}

export default new AuthController();