import { DataTypes } from 'sequelize';

import { DOCUMENT_TYPE, TYPE_PERSON } from '../config';

import type { Sequelize } from 'sequelize';
import type { IPersonModel } from '../types/models/person.interface';

export default function personSchema(sequelize: Sequelize) {
	return sequelize.define<IPersonModel>(
		'Person',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},

			type_person: {
				type: DataTypes.ENUM(...TYPE_PERSON),
				allowNull: false,
			},
			document_number: {
				type: DataTypes.STRING,
			},
			document_type: {
				type: DataTypes.ENUM(...DOCUMENT_TYPE),
			},

			phone: {
				type: DataTypes.STRING,
			},
			address: {
				type: DataTypes.STRING,
			},
			name: {
				type: DataTypes.STRING,
			},
		},
		{
			// Other model options go here
			timestamps: false,
		}
	);
}
