const router= require("express").Router()
const User= require("../models/user")
const List=require("../models/list")

//create
router.post("/addTask",async (req,res)=>{
    try {
        
        const {title, body, id}= req.body;
        const existingUser= await User.findOne({_id: id});
        if(existingUser){
         const list= new List({title, body, user:existingUser})
         await list.save().then(()=>res.status(200).json({list}))
         existingUser.list.push(list);
         existingUser.save();
        }
 
     } catch (error) {
         console.log(error)
         return res.status(400).json({
            success:false,
            message:"something went wrong while creating new todo"
         })
     }


})


//



//read
router.get("/getTask/:id", async (req,res)=>{
    try {
        
       
       const list= await List.find({user:req.params.id}).sort({createdAt:-1});
  
       if(list.length!=0)
       {
      return res.status(200).json({
        success:true,
        message:`All todos for user id:${req.params.id}`,
        list:list
     })
    }
    else{
        return res.status(200).json({
            
            message:`no todos found for this id:${req.params.id}`,
            
         })

    }
      
        
 
     } catch (error) {
         console.log(error)
         return res.status(400).json({
            success:false,
            message:"something went wrong while updating todo"
         })
     }

      })





//update
router.put("/updateTask/:id", async (req,res)=>{
    try {
        
    //     const {title, body, id}= req.body;
    //     const existingUser= await User.findOne({id});
    //     if(existingUser){
    //     await List.findByIdAndUpdate(req.params.id,{title,body});
    //   //  List.save();
    //   return res.status(200).json({
    //     success:true,
    //     message:`todo updated for id:${req.params.id}`
    //  })
      
    //     }


    const { title, body } = req.body;
    const updatedTodo = await List.findByIdAndUpdate(req.params.id, { title, body }, { new: true });

    if (!updatedTodo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: `Todo updated for id: ${req.params.id}`,
        updatedTodo
    });

 
     } catch (error) {
         console.log(error)
         return res.status(400).json({
            success:false,
            message:"something went wrong while updating todo"
         })
     }

      })








//delete

// router.delete("/deleteTask/:id", async (req,res)=>{
//     try {
        
//         const {id}= req.body;
//         const existingUser= await User.findOne({_id: id},
//             {$pull:{list:req.params.id}});
//         if(existingUser){
//         await List.findByIdAndDelete(req.params.id);
//       //  List.save();
//       return res.status(200).json({
//         success:true,
//         message:`todo deleted for id:${req.params.id}`
//      })
      
//         }
 
//      } catch (error) {
//          console.log(error)
//          return res.status(400).json({
//             success:false,
//             message:"something went wrong while deleting todo"
//          })
//      }

//       })




//delete2
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        // Find and delete the task
        const deletedTask = await List.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }

        // Remove the task reference from the user's list
        await User.findByIdAndUpdate(
            deletedTask.user,
            { $pull: { list: taskId } }
        );

        return res.status(200).json({
            success: true,
            message: `Todo deleted successfully with ID: ${taskId}`,
        });

    } catch (error) {
        console.error("Error deleting todo:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the todo",
        });
    }
});






module.exports= router;