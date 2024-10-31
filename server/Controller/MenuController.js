const  menuModel=require('../Model/foodModel')

const createMenuController=async(req,res)=>{
try {
    console.log(req.body);
    console.log(req.file);
    
     
    const {name,discription, category,price}=req.body
  const item= await  menuModel.create({name,discription,category,price,
    image:{
        data:req.file.buffer,
        contentType:req.file.mimetype
    }})
    res.status(200).json({message:"succesfully created",item})
} catch (error) {
    console.log(error);
    
    res.status(500).json({
        message:"failed to create menu",
        error
    })
}}

const getMenuController=async(req,res)=>{
try {
   const menu=await menuModel.find({}).select('-image')
   res.status(200).json({
  message:"sucess",
  menu:menu
   })
} catch (error) {

    res.status(500).json({
        message:"failed to fetch menu",
        error
    })}
}

const getMenuImageController=async(req,res)=>{
        try {  
            const id=req.params.id
           const menuImage=await menuModel.findById({_id:id}).select('image')
          if (menuImage.image) {
            res.set({
                'content-type':menuImage.image.contentType
            })
            res.send(menuImage.image.data)
          }
        } catch (error) {
          res.status(500).json({
                message:"failed to get menu image",
                error})
        }}
const DeleteMenuController=async(req,res)=>{
            try {
               const menu=await menuModel.findByIdAndDelete({_id:req.params.id}).select('-image')
               res.status(200).json({
              message:"delete sucessfully",
              menu:menu
               })
            } catch (error) {
            
                res.status(500).json({
                    message:"failed to delete food-item",
                    error
                })}
            }

const queryController=async(req,res)=>{
    try {
       const {keyword}=req.body 
        const query=await menuModel.find({
            $or:[
               {name:{$regex:keyword,$options:"i"} },
               {discription:{$regex:keyword,$options:"i"} }, 
            ]
        }).select('-image')
        res.status(200).json({
       message:"sucess",
    query
        })
     } catch (error) {
     
         res.status(500).json({
             message:"query failed",
             error
         })}
}

module.exports={createMenuController,getMenuController,getMenuImageController,DeleteMenuController,queryController}