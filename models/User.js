const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
 name: {
   type: String,
  //  required: true 
  },
  email: { 
    type: String, 
    // required: true, 
    unique: true,
    match: /.+\@.+\..+/ 
  },
  password:{
        type: String,
        required: true
    },
    zipcode:{
      type:String ,
      // required : true, 
      match : /^[0-9]{6}(?:-[0-9]{5})?$/ 
    },
      phone:{
        type: String ,
        // required : true,s 
        match : /^[0-9]{10}(?:-[0-9]{5})?$/ 
      },
});

module.exports = mongoose.model('User', UserSchema);

 

















































// // UPDATE
// app.put('/users/:id', async (req, res) => {
//   const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.send(user);
// });

// // DELETE
// app.delete('/users/:id', async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.send({ message: 'User deleted' });
// });