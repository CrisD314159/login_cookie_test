import { Router } from "express";
import { checkAuthStatus, login, logout, privateService, publicService } from "../controller/controller.js";
import { checkAuth } from "../middleware/middleware.js";

export default function GetRouter(){
  const routes = Router();

  routes.post('/login', login)
  routes.post('/logout',logout)
  routes.get('/public', publicService)
  routes.get('/private', checkAuth, privateService)
  routes.get('/check-auth', checkAuth, checkAuthStatus)

  return routes;
}