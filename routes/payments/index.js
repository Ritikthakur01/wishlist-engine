import express from 'express';
import { createPayment, processPayment, getPaymentStatus, handleRefund } from './controller.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               amount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       500:
 *         description: Server error
 */
router.post('/', createPayment);

/**
 * @swagger
 * /payments/{paymentId}/process:
 *   post:
 *     summary: Process an existing payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.post('/:paymentId/process', processPayment);

/**
 * @swagger
 * /payments/{paymentId}:
 *   get:
 *     summary: Get the status of a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Payment status retrieved successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.get('/:paymentId', getPaymentStatus);

/**
 * @swagger
 * /payments/{paymentId}/refund:
 *   post:
 *     summary: Handle a payment refund
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Refund processed successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.post('/:paymentId/refund', handleRefund);

export default router;
