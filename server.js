const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); 

const app = express();  
const PORT = process.env.PORT || 5000;
const User = require('./models/User');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI ,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// <-----------------Basic Post Request Save User Data (NAME , EMAIL AND PASSWORD-------------------->

/* 
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user );
});
*/
app.get('/', (req, res) => {
  res.send('server is running');
});


app.post('/users', async (req, res) => {
                    try {
                      const user = new User(req.body);
                      await user.save();
                      res.status(201).send(user);  
                    } catch (error) {
                      res.status(400).send({ error: error.message });
                    }
                  });



              app.post("/usersinsertmany", async (req, res) => {
                try {
                  const users = await User.insertMany(req.body); 
                  res.status(201).send(users);
                } catch (error) {
                  res.status(400).send({ error: error.message });
                }
              });

 



// <-----------------Basic GET Request ALL User Data Show  (NAME , EMAIL AND PASSWORD-------------------->

// app.get('/users', async (req, res) => {
//   const users = await User.find();
//   res.send(users);
// });

                  app.get('/users', async (req, res) => {
                    try {
                      const users = await User.find();
                      res.status(200).send(users);
                    } catch (error) {
                      res.status(500).send({ error: 'Server error' });
                    }
                  });

        app.get("/users/:id", async (req, res) => {
          try {
                 const id = req.params.id;
                 const user = await User.findById(id);
    
           if (!user) {
            return res.status(404).send({ message: "User not found" });
            }

              res.status(200).send(user);
             } catch (error) {
                  res.status(500).send({ error: 'Server error' });
              }
          });


// <-----------------Basic UPDATE Request CHANGE User Data  (NAME , EMAIL AND PASSWORD-------------------->


// app.put('/users/:id', async (req, res) => {
//   const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.send(user);
// });


                  app.put('/users/:id', async (req, res) => {
                    try {
                      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
                      if (!user) return res.status(404).send({ error: 'User not found' });
                      res.send(user);
                    } catch (error) {
                      res.status(400).send({ error: error.message });
                    }
                  });

 app.patch('/users/:id', async (req, res) => {
                    try {
                      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
                      if (!user) return res.status(404).send({ error: 'User not found' });
                      res.send(user);
                    } catch (error) {
                      res.status(400).send({ error: error.message });
                    }
                  });

// <-----------------Basic Post Request Delete User Data (NAME , EMAIL AND PASSWORD-------------------->


// app.delete('/users/:id', async (req, res) => {
//   const user = await User.findByIdAndDelete(req.params.id);
     
//   res.send(user);
// });

                  app.delete('/users/:id', async (req, res) => {
                    try {
                      const user = await User.findByIdAndDelete(req.params.id);
                      if (!user) return res.status(404).send({ error: 'User not found' });
                      res.send(user);
                    } catch (error) {
                      res.status(500).send({ error: 'Server error' });
                    }
                  });

// Server Start 5000 port Url: http:localhost:5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

