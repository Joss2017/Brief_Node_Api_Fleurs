import cors from 'cors';
import express from 'express';
import planteRouter from './routes/PlanteRoute';
import AppDataSource from './data-source';
import path from 'path';

/**-----------------Initialistion API express et connection BDD -------------------------*/

AppDataSource.initialize().then(async () => {
  const app = express();
  /**---------------Paramètre données au format JSON + mise en place CORS pour les droits+CRUD ----------------------*/
  app.use(express.json()); 
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
  );
  /**--------------------------------------------------------------------------------------*/

  /**-----------------  Adresse+Renvoi ver le fichier PlanteRoute  -------------------------*/
  app.use('/api/plantes', planteRouter);
  /**------------------------IMAGES----------------------------------------------------------*/
  app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
  /**-----------------Methode permettant d'identifier toutes les connexions -------------------------*/

  app.listen(process.env.PORT, () => {
    console.log(`L'API est en route sur l'adresse :${process.env.PORT}`);
  });
  /**--------------------------------------------------------------------------------------*/
});
