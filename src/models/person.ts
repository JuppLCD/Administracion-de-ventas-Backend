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

			type_person: {
				type: DataTypes.ENUM('0', '1'), // natural (0) or legal (1) person
				allowNull: false,
			},
			document_number: {
				type: DataTypes.STRING,
			},
			document_type: {
				type: DataTypes.STRING,
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
