import { Router } from 'express';
import UploadController from '../controllers/upload';
import ClearCacheController from "../controllers/clear";
import ListController from "../controllers/list";
import DownloadController from "../controllers/download";
import CategoriesController from "../controllers/categories";
import ItemsController from "../controllers/items";
// import AuthController from "../controllers/auth";

const Routes = Router();

// Routes.post('/auth', AuthController.auth);

Routes.get('/list', ListController.listAll);
Routes.get('/categories/:categoryId/items', ItemsController.getCategoryItems);
Routes.get('/items', ItemsController.getAllItems);
Routes.get('/download/*', DownloadController.downloadFile);
Routes.get('/categories', CategoriesController.getAllCategories);

Routes.post('/categories', CategoriesController.createNewCategories);
Routes.post('/items', ItemsController.createNewItems);
Routes.post('/multiUpload', UploadController.multiUpload);
// Routes.post('/upload', UploadController.uploadOne);
// Routes.post('/clearCache', ClearCacheController.clearCache);

export default Routes;
