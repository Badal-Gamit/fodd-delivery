const exress=require('express');
const {createMenuController,getMenuController,getMenuImageController, DeleteMenuController, queryController}=require('../Controller/MenuController')


const  router=exress.Router()
const multer=require('multer')
const storage=multer.memoryStorage()
const upload=multer({storage:storage})

router.post('/upload',upload.single('image'),createMenuController)
router.get('/fetch-menu',getMenuController)
router.post('/query',queryController)
router.delete('/delete-menu/:id',DeleteMenuController)
router.get('/image-one/:id',getMenuImageController)

module.exports=router