const express = require('express');;
const SaleService = require("../Services/SaleService");
const middleware = require("./Middleware")
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const fileUpload = multer({ storage: storage });

router.get('/', SaleService.getAllSales);
router.get('/:id', SaleService.getSaleById);
router.get('/location/:adr', SaleService.getSalesByLocation);
router.post('/', middleware.verifyToken, SaleService.addSale);
router.post('/upload', middleware.verifyToken, fileUpload.array('image'), SaleService.addImagesToSale);
router.delete('/:id', middleware.verifyToken, SaleService.deleteSaleById);
router.put('/:id', middleware.verifyToken, SaleService.editSaleById);

module.exports = router;