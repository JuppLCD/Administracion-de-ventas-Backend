import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

import { PersonServices } from '../services/person';

export class PersonController {
	static getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const people = await PersonServices.getAll();

			res.json({
				people,
			});
		} catch (err) {
			next(err);
		}
	};

	static getAllProviders = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const providers = await PersonServices.getAllProviders();

			res.json({
				providers,
			});
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	static getAllClients = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const clients = await PersonServices.getAllClients();

			res.json({
				clients,
			});
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	static getById = async (req: Request, res: Response, next: NextFunction) => {
		const { personId } = req.params;

		try {
			if (isNaN(Number(personId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:personId)');
			}

			const person = await PersonServices.getById(Number(personId));

			res.json({
				person,
			});
		} catch (err) {
			next(err);
		}
	};

	static store = async (req: Request, res: Response, next: NextFunction) => {
		const newPerson = req.body;

		try {
			const person = await PersonServices.store(newPerson);

			res.json({
				person,
			});
		} catch (err) {
			next(err);
		}
	};

	static update = async (req: Request, res: Response, next: NextFunction) => {
		const { personId } = req.params;
		const fieldsToUpdate = req.body;

		try {
			if (isNaN(Number(personId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:personId)');
			}
			const person = await PersonServices.update(Number(personId), fieldsToUpdate);

			res.json({
				person,
			});
		} catch (err) {
			next(err);
		}
	};

	static delete = async (req: Request, res: Response, next: NextFunction) => {
		const { personId } = req.params;

		try {
			if (isNaN(Number(personId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:personId)');
			}
			await PersonServices.destroy(Number(personId));

			res.status(200).send();
		} catch (err) {
			next(err);
		}
	};
}
