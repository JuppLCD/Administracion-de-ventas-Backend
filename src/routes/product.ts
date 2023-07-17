import { Router } from 'express';

import { ProductController } from '../controllers/product';
import authJwt from '../middlewares/authJwt';

const router = Router();

router.use(authJwt); // ! De momento cualquier usuario puede realizar las consultas

router.get('/', ProductController.getAll);
router.get('/:productId', ProductController.getById);
router.get('/category/:categoryId', ProductController.getAllByCategory);
router.post('/store', ProductController.store); // ! TENGO QUE REALIZAR LAS VALIDACIONES CORRESPONDIENTES
router.post('/search', ProductController.search); // ! TENGO QUE REALIZAR LAS VALIDACIONES CORRESPONDIENTES
router.put('/:productId', ProductController.update); // ! TENGO QUE REALIZAR LAS VALIDACIONES CORRESPONDIENTES
router.delete('/:productId', ProductController.delete);

export { router };
