const historyRouter = require('express').Router();
const HistoryController = require('../controller/historyController');

historyRouter.get('/', HistoryController.viewAll);
historyRouter.get('/create', HistoryController.createForm);
historyRouter.post('/create', HistoryController.create);
historyRouter.get('/update/:id', HistoryController.updateForm);
historyRouter.post('/update/:id', HistoryController.update);
historyRouter.get('/delete/:id', HistoryController.delete);
historyRouter.get('/:id', HistoryController.viewOne);

module.exports = historyRouter;