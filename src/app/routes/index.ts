import { Router } from 'express';
import UploadController from '../controllers/upload';
import ClearCacheController from "../controllers/clear";
import ImageController from "../controllers/list";
import DownloadController from "../controllers/download";
import CategoriesController from "../controllers/categories";
import ItemsController from "../controllers/items";
import ImagesController from "../controllers/images";
// import AuthController from "../controllers/auth";

const Routes = Router();

// Routes.post('/auth', AuthController.auth);

Routes.get('/images', ImagesController.listAll);
Routes.get('/categories/:categoryId/items', ItemsController.getCategoryItems);
Routes.get('/items', ItemsController.getAllItems);
Routes.get('/download/*', DownloadController.downloadFile);
Routes.get('/categories', CategoriesController.getAllCategories);

Routes.post('/categories', CategoriesController.createNewCategories);
Routes.post('/categories/:categoryId/edit', CategoriesController.editCategory);
Routes.post('/categories/:categoryId/delete', CategoriesController.deleteCategory);
Routes.post('/items', ItemsController.createNewItems);
Routes.post('/items/:itemId/edit', ItemsController.editItem);
Routes.post('/items/:itemId/delete', ItemsController.deleteItem);
Routes.post('/multiUpload', UploadController.multiUpload);

// Routes.post('/upload', UploadController.uploadOne);
// Routes.post('/clearCache', ClearCacheController.clearCache);

export default Routes;
