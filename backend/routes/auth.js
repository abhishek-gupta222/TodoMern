const router= require("express").Router()
const User= require("../models/user")
const bcrypt= require("bcryptjs")

//sign in

router.post("/register",async (req,res)=>{

    try{
       
        const {email, password, username}= req.body;
        const hashedpassword= bcrypt.hashSync(password)
        const user= new User({email, username, password:hashedpassword});
        await user.save().then(()=>
            res.status(200).json({
                user:user,
                success:true,
                message:"user registered successfully"
            })
        )
    }
    catch(err)
    {
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"user already exists"
        })
    }
})




//////////////////////////////////////////////////////////////////////////////

//login

router.post("/login",async (req,res)=>{

    try{
       
      const user=await User.findOne({email: req.body.email})
      if(!user)
      {
        return res.status(400).json({
            success:false,
            message:"User not registered,signup first"
        })
      }

      const isPasswordCorrect= bcrypt.compareSync(
        req.body.password, user.password
      )

      if(!isPasswordCorrect)
      {
        return res.status(400).json({
            success:false,
            message:"password is incorrect"
        })
      }

      const {password, ...others}=user._doc;
     return res.status(200).json({
        success:true,
        message:"user logged in successfully",
        others
    })

    }

    catch(err)
    {
        console.log(err)
       return res.status(500).json({
            success:false,
            message:"user already exists"
        })
    }
})


module.exports= router;





