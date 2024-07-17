// src/controllers/paymentController.js
import { Payment, Transaction } from './model'

export const createPayment = async (req, res) => {
    try {
        const { userId, amount, paymentMethod } = req.body;

        const payment = new Payment({
            userId,
            amount,
            paymentMethod,
        });

        await payment.save();

        return res.status(201).json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const processPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }

        // Logic to process the payment
        payment.status = 'completed';
        await payment.save();

        const transaction = new Transaction({
            paymentId: payment._id,
            type: 'payment',
            amount: payment.amount,
            status: 'completed',
        });

        await transaction.save();

        res.status(200).json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const getPaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }

        res.status(200).json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const handleRefund = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }

        // Logic to handle the refund
        payment.status = 'refunded';
        await payment.save();

        const transaction = new Transaction({
            paymentId: payment._id,
            type: 'refund',
            amount: payment.amount,
            status: 'completed',
        });

        await transaction.save();

        res.status(200).json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
