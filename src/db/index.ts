import { sequelize } from './connection';

// Models
import roleSchema from '../models/role';
import userSchema from './../models/user';
import categorySchema from '../models/category';
import productSchema from '../models/product';
import personSchema from '../models/person';
import productEntreySchema from '../models/product_entry';
import productEntreyDetailSchema from '../models/product_entry_detail';

const RoleModel = roleSchema(sequelize);
const UserModel = userSchema(sequelize);
const CategoryModel = categorySchema(sequelize);
const ProductModel = productSchema(sequelize);
const PersonModel = personSchema(sequelize);
const ProductEntryModel = productEntreySchema(sequelize);
const ProductEntryDetailModel = productEntreyDetailSchema(sequelize);

// Associations Model User
UserModel.belongsTo(RoleModel, { foreignKey: 'role_id' });
RoleModel.hasMany(UserModel, { foreignKey: 'role_id' });

// Associations Model Product
ProductModel.belongsTo(CategoryModel, { foreignKey: 'category_id' });
CategoryModel.hasMany(ProductModel, { foreignKey: 'category_id' });

// Associations Model Product_Entry
ProductEntryModel.belongsTo(UserModel, { foreignKey: 'user_id' });
UserModel.hasMany(ProductEntryModel, { foreignKey: 'user_id' });
ProductEntryModel.belongsTo(PersonModel, { foreignKey: 'provider_id' });
PersonModel.hasMany(ProductEntryModel, { foreignKey: 'provider_id' });

// Associations Model Product_Entry_Detail
ProductEntryDetailModel.belongsTo(ProductEntryModel, { foreignKey: 'product_entry_id' });
ProductEntryModel.hasMany(ProductEntryDetailModel, { foreignKey: 'product_entry_id' });
ProductEntryDetailModel.belongsTo(ProductModel, { foreignKey: 'product_id' });
ProductModel.hasMany(ProductEntryDetailModel, { foreignKey: 'product_id' });

export default async function connectToDB() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		return sequelize;
	} catch (err) {
		console.error('Unable to connect to the database: ', err);
	}
}

export { RoleModel, UserModel, CategoryModel, ProductModel, PersonModel, ProductEntryModel, ProductEntryDetailModel };
