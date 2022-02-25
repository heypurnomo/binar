const BiodataController = require('../controller/biodataController');
const biodataRouter = require('express').Router();

biodataRouter.get('/', BiodataController.viewAll)
biodataRouter.get('/create', BiodataController.createForm)
biodataRouter.post('/create', BiodataController.create)
biodataRouter.get('/update/:id', BiodataController.updateForm)
biodataRouter.post('/update/:id', BiodataController.update)
biodataRouter.get('/delete/:id', BiodataController.delete)
biodataRouter.get('/:id', BiodataController.viewOne)

module.exports = biodataRouter