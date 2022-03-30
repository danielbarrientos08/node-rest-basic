const { Router } = require('express');
const {  userGet, userPost, userDelete, userPatch, userPut, userUpdate } = require('../controllers/users');

const router = Router()

router.get('/', userGet);
router.put('/:id', userPut);
router.post('/', userPost);
router.post('/', userUpdate);
router.patch('/', userPatch);
router.delete('/', userDelete);


module.exports = router