
const Pet = require('../models/pets');

const Adoption = require('../models/adoptions');
const User = require('../models/User');



async function index(req, res) {
    let pets = await Pet.find({})
    // console.log('user', req.user);
    // let user = await User.findById(req.user.id)
    // let adopted = user.petsAdopted
    // console.log(pets.filter(n => !adopted.includes(n)))
    res.render('pets/index', {pets, currentUser: req.user});
  }

async function getAddPet(req, res) {
res.render('pets/new', {currentUser: req.user});
}

async function postAddPet(req, res) {
console.log(req.body);
const pet = await Pet.create(req.body)
console.log(pet);
res.redirect('/pets/index')
}

async function showPet(req, res) {
    console.log(req.query.id);
    let onePet = await Pet.findById(req.query.id)
    res.render('pets/show', {pet: onePet, currentUser: req.user});
}

async function getAdoptionPet(req, res) {
    let onePet = await Pet.findById(req.params.id)
    let user = await User.findById(req.user.id)
    user.petsAdopted.push(onePet.id)
    await user.save()
    res.redirect('/pets/adopted')
    // res.render('pets/adoption', {currentUser: req.user});
    }

async function getAdoptedPets(req, res) {
    let user = await User.findById(req.user.id).populate('petsAdopted')
    console.log(user);
    res.render('pets/adopted', {pets: user.petsAdopted})
    }

async function deletePet (req, res)  {
        await Pet.findByIdAndDelete(req.params.id)
        await User.updateOne({
            _id:req.user.id
        },
        {
            $pull: {
                petsAdopted:req.params.id
            }
        }
        )
        res.redirect('/pets/index')

    }

    async function getAdoptionForm(req, res) {
        res.render('pets/adoption', {currentUser: req.user});
        }

    async function getEditForm(req, res) {
        let petEdit = await Pet.findById(req.params.id)
        console.log(petEdit);
        res.render('pets/edit', {pet: petEdit, currentUser: req.user});
        }


     function updatePet(req, res) {
        Pet.findByIdAndUpdate(req.body.id, req.body, function (err, pet) {
        if (err) return res.send(err.message);
        res.redirect(`/pets/show?id=${pet.id}`);
        });
    }


module.exports = {
    index,
    getAddPet,
    postAddPet,
    showPet,
    getAdoptionPet,
    getAdoptedPets,
    deletePet,
    getAdoptionForm,
    getEditForm,
    updatePet
}