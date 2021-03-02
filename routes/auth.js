var express = require('express');

//controllers
import {showMessage} from '../controllers/auth.js';


const router = express.Router();

router.get('/:message', showMessage);

  module.exports = router;