import { Router } from 'express';
import { 
  getCuentas, 
  getCuentaById, 
  getCuentasBalance 
} from '../controllers/cuentas.controller.js';

const router = Router();

router.get('/cuentas', getCuentas);

router.get('/cuenta/:id', getCuentaById);

router.get('/cuentasBalance', getCuentasBalance);

export default router;