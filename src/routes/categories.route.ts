import { Router } from "express";

import { CategoriesController } from "../controllers/categories.controllers";
import { createCategorySchema } from "../dtos/categories.dto";
import { CategoriesFactory } from "../factories/categories.factory";
import { validator, ParamsType } from "../middleware/validator.middleware";

export const categoriesRoutes = Router();

const controller = new CategoriesController(
    CategoriesFactory.getServiceInstance()
);

categoriesRoutes.get('/', controller.index.bind(controller));

categoriesRoutes.post(
    '/',
    validator({
        schema: createCategorySchema,
        type: ParamsType.BODY,
    }),
    controller.create.bind(controller)
);