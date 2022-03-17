const router = require('express').Router();
const { append } = require('express/lib/response');
var methodOverRide = require('method-override');
const {body} = require('express-validator');



router.use(methodOverRide('_method'));

// router.use(express.urlencoded({extended: true}));

// import authentication controller
const authCntrl = require('../controllers/auth');

// routes for authentication

router.get('/auth/signup', authCntrl.auth_signup_get);
router.post('/auth/signup', [
    body('firstName').isLength({min: 5, max: 99}).withMessage('First Name must be at least 5 chars long').notEmpty().withMessage('Firwst name cannot be null'),
    body('lastName').isLength({min: 5}),
    body('emailAddress').isLength(),
    body('password').isLength({min: 5})
], authCntrl.auth_signup_post);

router.get('/auth/signin', authCntrl.auth_signin_get);
router.post('/auth/signin', authCntrl.auth_signin_post);
router.get('/auth/logout', authCntrl.auth_logout_get);

        




module.exports = router;