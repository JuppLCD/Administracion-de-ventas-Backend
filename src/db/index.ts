import { sequelize } from './connection';

// Models
import roleSchema from '../models/role';
import userSchema from './../models/user';
import categorySchema from '../models/category';
import productSchema from '../models/product';
import personSchema from '../models/person';

const RoleModel = roleSchema(sequelize);
const UserModel = userSchema(sequelize);
const CategoryModel = categorySchema(sequelize);
const ProductModel = productSchema(sequelize);
const PersonModel = personSchema(sequelize);

// Associations Model User
UserModel.belongsTo(RoleModel, { foreignKey: 'role_id' });
RoleModel.hasMany(UserModel, { foreignKey: 'role_id' });

// Associations Model Product
ProductModel.belongsTo(CategoryModel, { foreignKey: 'category_id' });
CategoryModel.hasMany(ProductModel, { foreignKey: 'category_id' });

export default async function connectToDB() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		return sequelize;
	} catch (err) {
		console.error('Unable to connect to the database: ', err);
	}
}

export { RoleModel, UserModel, CategoryModel, ProductModel, PersonModel };
