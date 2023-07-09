import { DataTypes } from 'sequelize';

import type { Sequelize } from 'sequelize';
import type { IPersonModel } from '../types/person.interface';

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

			document_number: {
				type: DataTypes.INTEGER,
			},
			document_type: {
				type: DataTypes.STRING,
			},
			type_person: {
				type: DataTypes.STRING,
			},

			phone: {
				type: DataTypes.STRING,
			},
			address: {
				type: DataTypes.STRING,
			},
		},
		{
			// Other model options go here
			timestamps: false,
		}
	);
}
