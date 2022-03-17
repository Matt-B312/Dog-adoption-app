var express = require('express');
var router = express.Router();
var petsCtrl = require('../controllers/pets');
const pets = require('../models/pets');


// router.get('/pets/buster', petsCtrl.view)
router.get('/pets/index', petsCtrl.index)

router.get('/pets/add', petsCtrl.getAddPet)

router.post('/pets/add', petsCtrl.postAddPet)

router.get('/pets/show', petsCtrl.showPet)

router.get('/pets/adoption/:id', petsCtrl.getAdoptionPet)

router.get('/pets/adopted', petsCtrl.getAdoptedPets)

router.delete('/pets/delete/:id', petsCtrl.deletePet)

router.get('/pets/adoption', petsCtrl.getAdoptionForm)

router.get('/pets/edit/:id', petsCtrl.getEditForm)

router.put('/pets/update', petsCtrl.updatePet)



module.exports = router;