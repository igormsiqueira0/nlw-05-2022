import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';
import { SubmitFeedback } from './use-cases/submitFeedback';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
	const { type, comment, screenshot } = req.body;

	const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
	const nodemailerMailAdapter = new NodemailerMailAdapter();

	const submitFeedbackUseCase = new SubmitFeedback(
		prismaFeedbacksRepository,
		nodemailerMailAdapter
	);

	await submitFeedbackUseCase.init({
		type,
		comment,
		screenshot,
	});

	return res.status(201).send();
});
