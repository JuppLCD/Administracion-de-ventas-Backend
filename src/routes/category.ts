import { Router } from 'express';

import { CategoryController } from '../controllers/category';
import authJwt from '../middlewares/authJwt';

const router = Router();

router.use(authJwt); // ! De momento cualquier usuario puede realizar las consultas

router.get('/', CategoryController.getAll);
router.get('/:categoryId', CategoryController.getById);
router.post('/store', CategoryController.store); // ! TENGO QUE REALIZAR LAS VALIDACIONES CORRESPONDIENTES
router.put('/:categoryId', CategoryController.update); // ! TENGO QUE REALIZAR LAS VALIDACIONES CORRESPONDIENTES
router.delete('/:categoryId', CategoryController.delete);

export { router };
