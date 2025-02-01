import { Router } from 'express';

import { TransactionsController } from '../controllers/transactionscontroller';
import {
  createTransactionSchema,
  getDashboardSchema,
  getFinancialEvolutionSchema,
  indexTransactionsSchema,
} from '../dtos/transactions.dto';
import { TransactionsFactory } from '../factories/transactions.factory';
import { ParamsType, validator } from '../middleware/validator.middleware';

export const transactionsRoutes = Router();

const controller = new TransactionsController(
  TransactionsFactory.getServiceInstance(),
);

transactionsRoutes.post(
  '/',
  validator({
    schema: createTransactionSchema,
    type: ParamsType.BODY,
  }),
  controller.create.bind(controller),
);

transactionsRoutes.get(
  '/',
  validator({
    schema: indexTransactionsSchema,
    type: ParamsType.QUERY,
  }),
  controller.index.bind(controller),
);

transactionsRoutes.get(
  '/dashboard',
  validator({
    schema: getDashboardSchema,
    type: ParamsType.QUERY,
  }),
  controller.getDashboard.bind(controller),
);

transactionsRoutes.get(
  '/financial-evolution',
  validator({
    schema: getFinancialEvolutionSchema,
    type: ParamsType.QUERY,
  }),
  controller.getFinancialEvolution.bind(controller),
);