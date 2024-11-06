const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uri = 'mongodb://127.0.0.1:27017/cvProject'

async function connect() {
    const client = await MongoClient.connect(uri,
        { useNewUrlParser: true, useUnifiedTopology: false });
    console.log('MongoDB connected');
    return client.db();
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    }
});

// Filter files to only allow images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image/')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// Set up multer middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Registration
app.post('/api/addcvseeker', async (req, res) => {
    const db = await connect();
    const { username, email, password, lastlogin } = req.body;
    const isexisted = await db.collection('cvseekerlist').findOne({ email: email });
    if (isexisted != null) {
        res.send(true);
    } else {
        const result = await db.collection('cvseekerlist').insertOne({ username, email, password, lastlogin });
        res.json(result);
    }
});

// Registered User login
app.post('/api/logincvseeker', async (req, res) => {
    const db = await connect();
    const { email, password, currentlogin } = req.body;
    const finduser = await db.collection('cvseekerlist').findOne({ email: email });
    if (finduser) {
        if (password === finduser.password) {
            db.collection('cvseekerlist').updateOne({ email: email }, { $set: { lastlogin: currentlogin } },
                function (err) {
                    if (err) throw err;
                    console.log('Document updated successfully.');
                });
            res.send({ message: "Login Successfull", user: finduser })
        } else {
            res.send("Password didn't match.")
        }
    } else {
        res.send("User not registered.")
    }
});

// Find account
app.post('/api/findcvseeker', async (req, res) => {
    const db = await connect();
    const { email } = req.body;
    const forgot = await db.collection('cvseekerlist').findOne({ email: email });
    if (forgot) {
        res.send(forgot);
    } else {
        res.send(false)
    }
});

// Admin login
app.post('/api/loginadmin', async (req, res) => {
    const db = await connect();
    const { adminUsername, adminPassword, admincurrentLogin } = req.body;
    const finduser = await db.collection('adminlist').findOne({ username: adminUsername });
    if (finduser) {
        if (adminPassword === finduser.password) {
            db.collection('adminlist').updateOne({ username: adminUsername }, { $set: { lastlogin: admincurrentLogin } },
                function (err) {
                    if (err) throw err;
                    console.log('Document updated successfully.');
                });
            res.send({ message: "Login Successfull", user: finduser })
        } else {
            res.send("Password didn't match.")
        }
    } else {
        res.send("User not registered.")
    }
});

// Add Contact/ Feedback
app.post('/api/addcontact', async (req, res) => {
    const db = await connect();
    const { username, email, subject, selectedType, comment, dateSubmit } = req.body;
    const result = await db.collection('contactlist').insertOne({ username, email, subject, selectedType, comment, dateSubmit });
    res.json(result);
});

app.post('/api/addwork', async (req, res) => {
    const db = await connect();
    const { jobtitle, location, yearstart, yearend, description, ownerId } = req.body;
    const result = await db.collection('worklist').insertOne({ jobtitle, location, yearstart, yearend, description, ownerId });
    res.json(result);
});

app.post('/api/addeducation', async (req, res) => {
    const db = await connect();
    const { qualification, location, yearstart, yearend, modules, ownerId } = req.body;
    const result = await db.collection('educationlist').insertOne({ qualification, location, yearstart, yearend, modules, ownerId });
    res.json(result);
});

app.post('/api/addskill', async (req, res) => {
    const db = await connect();
    const { skillname, skillicon, skilllevel, ownerId } = req.body;
    const result = await db.collection('skilllist').insertOne({ skillname, skillicon, skilllevel, ownerId });
    res.json(result);
});

app.post('/api/addlanguage', async (req, res) => {
    const db = await connect();
    const { languagename, languageicon, languagelevel, ownerId } = req.body;
    const result = await db.collection('languagelist').insertOne({ languagename, languageicon, languagelevel, ownerId });
    res.json(result);
});

app.post('/api/addhobby', async (req, res) => {
    const db = await connect();
    const { hobbyname, hobbyicon, hobbylevel, ownerId } = req.body;
    const result = await db.collection('hobbylist').insertOne({ hobbyname, hobbyicon, hobbylevel, ownerId });
    res.json(result);
});

// Show specific admin profile using username
app.get('/api/adminprofile/:username', async (req, res) => {
    const db = await connect();
    const username = req.params.username;
    const adminData = await db.collection('adminlist').find({ username: username }).toArray();
    res.send(adminData);
});

// Show specific admin profile using id
app.get('/api/adminsearchid/:id', async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const adminData = await db.collection('adminlist').find({ _id: objectId }).toArray();
    res.send(adminData);
});

// Add new admin
app.post('/api/addadmin', async (req, res) => {
    const db = await connect();
    const { username, password, lastlogin } = req.body;
    const isexisted = await db.collection('adminlist').findOne({ username: username });
    if (isexisted != null) {
        res.send(true);
    } else {
        const result = await db.collection('adminlist').insertOne({ username, password, lastlogin });
        res.json(result);
    }
});


// Show specific work detail using id
app.get('/api/worksearchid/:id', async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const workData = await db.collection('worklist').find({ _id: objectId }).toArray();
    res.send(workData);
});

// Show specific education detail using id
app.get('/api/educationsearchid/:id', async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const educationData = await db.collection('educationlist').find({ _id: objectId }).toArray();
    res.send(educationData);
});

// Show specific skill detail using id
app.get('/api/skillsearchid/:id', async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const skillData = await db.collection('skilllist').find({ _id: objectId }).toArray();
    res.send(skillData);
});

// Show specific language detail using id
app.get('/api/languagesearchid/:id', async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const languageData = await db.collection('languagelist').find({ _id: objectId }).toArray();
    res.send(languageData);
});

// Show specific hobby detail using id
app.get('/api/hobbysearchid/:id', async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const hobbyData = await db.collection('hobbylist').find({ _id: objectId }).toArray();
    res.send(hobbyData);
});


// Edit admin profile using id
app.post('/api/editadmin/:id', async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const { adminUsername, adminPassword } = req.body;
    const adminData = db.collection('adminlist').updateOne({ _id: objectId }, { $set: { username: adminUsername, password: adminPassword } },
        function (err) {
            if (err) throw err;
            console.log('Document updated successfully.');
        });
    res.send(adminData)
});

// Edit user profile using id
app.post('/api/updateprofile/:id', upload.single('selectedFile'), async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const file = req.file;
    const { username, firstname, lastname, email, address, phone, occupation, color, password } = req.body;
    if (!file) {
        return res.status(400).json({ message: 'Please upload a file.' });
    }
    const imageUrl = req.protocol + '://' + req.get('host') + '/' + file.path;
    const seekerData = db.collection('cvseekerlist').updateOne({ _id: objectId },
        { $set: { username: username, firstname: firstname, lastname: lastname, email: email, address: address, phone: phone, occupation: occupation, file: file, imageUrl: imageUrl, color:color, password: password } },
        function (err) {
            if (err) throw err;
            console.log('Document updated successfully.');
        });
    res.send(seekerData)
});

// Edit work using id
app.post('/api/updatework/:id', async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const { jobtitle, yearstart, yearend, location, description } = req.body;
    const seekerData = db.collection('worklist').updateOne({ _id: objectId },
        { $set: { jobtitle: jobtitle, yearstart: yearstart, yearend: yearend, location: location, description: description } },
        function (err) {
            if (err) throw err;
            console.log('Document updated successfully.');
        });
    res.send(seekerData)
});

// Edit education using id
app.post('/api/updateeducation/:id', async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const { qualification, yearstart, yearend, location, modules } = req.body;
    const seekerData = db.collection('educationlist').updateOne({ _id: objectId },
        { $set: { qualification: qualification, yearstart: yearstart, yearend: yearend, location: location, modules: modules } },
        function (err) {
            if (err) throw err;
            console.log('Document updated successfully.');
        });
    res.send(seekerData)
});

// Edit skill using id
app.post('/api/updateskill/:id', async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const { skillname, skillicon, skilllevel } = req.body;
    const seekerData = db.collection('skilllist').updateOne({ _id: objectId },
        { $set: { skillname: skillname, skillicon: skillicon, skilllevel: skilllevel } },
        function (err) {
            if (err) throw err;
            console.log('Document updated successfully.');
        });
    res.send(seekerData)
});

// Edit language using id
app.post('/api/updatelanguage/:id', async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const { languagename, languageicon, languagelevel } = req.body;
    const seekerData = db.collection('languagelist').updateOne({ _id: objectId },
        { $set: { languagename: languagename, languageicon: languageicon, languagelevel: languagelevel } },
        function (err) {
            if (err) throw err;
            console.log('Document updated successfully.');
        });
    res.send(seekerData)
});

// Edit hobby using id
app.post('/api/updatehobby/:id', async (req, res) => {
    const db = await connect();
    const _id = req.params.id;
    const objectId = new ObjectId(_id);
    const { hobbyname, hobbyicon, hobbylevel } = req.body;
    const seekerData = db.collection('hobbylist').updateOne({ _id: objectId },
        { $set: { hobbyname: hobbyname, hobbyicon: hobbyicon, hobbylevel: hobbylevel } },
        function (err) {
            if (err) throw err;
            console.log('Document updated successfully.');
        });
    res.send(seekerData)
});

// Show specific user profile
app.get('/api/profile/:id', async (req, res) => {
    const db = await connect();
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const personalData = await db.collection('cvseekerlist').find({ _id: objectId }).toArray();
    res.send(personalData);
});

app.get('/api/work/:id', async (req, res) => {
    const db = await connect();
    const id = req.params.id;
    const personalData = await db.collection('worklist').find({ ownerId: id }).toArray();
    res.send(personalData);
});

app.get('/api/skill/:id', async (req, res) => {
    const db = await connect();
    const id = req.params.id;
    const personalData = await db.collection('skilllist').find({ ownerId: id }).toArray();
    res.send(personalData);
});

app.get('/api/education/:id', async (req, res) => {
    const db = await connect();
    const id = req.params.id;
    const personalData = await db.collection('educationlist').find({ ownerId: id }).toArray();
    res.send(personalData);
});

app.get('/api/language/:id', async (req, res) => {
    const db = await connect();
    const id = req.params.id;
    const personalData = await db.collection('languagelist').find({ ownerId: id }).toArray();
    res.send(personalData);
});

app.get('/api/hobby/:id', async (req, res) => {
    const db = await connect();
    const id = req.params.id;
    const personalData = await db.collection('hobbylist').find({ ownerId: id }).toArray();
    res.send(personalData);
});

app.get('/api/countcvseeker', async (req, res) => {
    try {
      const db = await connect();
      const cvseekerCount = await db.collection('cvseekerlist').countDocuments({});
      res.json({ count: cvseekerCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get('/api/countadmin', async (req, res) => {
    try {
      const db = await connect();
      const adminCount = await db.collection('adminlist').countDocuments({});
      res.json({ count: adminCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get('/api/countslideshow', async (req, res) => {
    try {
      const db = await connect();
      const slideshowCount = await db.collection('slideshowlist').countDocuments({});
      res.json({ count: slideshowCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get('/api/countfeedback', async (req, res) => {
    try {
      const db = await connect();
      const feedbackCount = await db.collection('contactlist').countDocuments({});
      res.json({ count: feedbackCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


app.post('/api/deletework', async (req, res) => {
    const db = await connect();
    const { _id } = req.body;
    const objectId = new ObjectId(_id);
    const result = await db.collection('worklist').deleteOne({ _id: objectId });
    res.send(result);
});

app.post('/api/deleteeducation', async (req, res) => {
    const db = await connect();
    const { _id } = req.body;
    const objectId = new ObjectId(_id);
    const result = await db.collection('educationlist').deleteOne({ _id: objectId });
    res.send(result);
});

app.post('/api/deleteskill', async (req, res) => {
    const db = await connect();
    const { _id } = req.body;
    const objectId = new ObjectId(_id);
    const result = await db.collection('skilllist').deleteOne({ _id: objectId });
    res.send(result);
});

app.post('/api/deletelanguage', async (req, res) => {
    const db = await connect();
    const { _id } = req.body;
    const objectId = new ObjectId(_id);
    const result = await db.collection('languagelist').deleteOne({ _id: objectId });
    res.send(result);
});

app.post('/api/deletehobby', async (req, res) => {
    const db = await connect();
    const { _id } = req.body;
    const objectId = new ObjectId(_id);
    const result = await db.collection('hobbylist').deleteOne({ _id: objectId });
    res.send(result);
});

// Show all Feedback
app.get('/api/showfeedbacklist', cors(), async (req, res) => {
    const db = await connect();
    const result = await db.collection('contactlist').find().toArray();
    res.send(result);
});

// Delete Feedback
app.post('/api/deletefeedback', async (req, res) => {
    const db = await connect();
    const { _id } = req.body;
    const objectId = new ObjectId(_id);
    const result = await db.collection('contactlist').deleteOne({ _id: objectId });
    res.send(result);
});

// Delete Feedback
app.post('/api/deleteslideshow', async (req, res) => {
    const db = await connect();
    const { _id } = req.body;
    const objectId = new ObjectId(_id);
    const result = await db.collection('slideshowlist').deleteOne({ _id: objectId });
    res.send(result);
});

// Delete Admin
app.post('/api/deleteadmin', async (req, res) => {
    const db = await connect();
    const { _id } = req.body;
    const objectId = new ObjectId(_id);
    const adminCount = await db.collection('adminlist').countDocuments();
    if (adminCount <= 1) {
        res.send(false)
    } else {
        const result = await db.collection('adminlist').deleteOne({ _id: objectId });
        res.send(result);
    }
});

// Delete CVSeeker
app.post('/api/deletecvseeker', async (req, res) => {
    try {
      const { _id } = req.body;
      if (!_id) {
        return res.status(400).json({ message: 'Missing ID parameter' });
      }
      const db = await connect();
      const objectId = new ObjectId(_id);
      const result1 = await db.collection('worklist').deleteMany({ ownerId: objectId });
      const result2 = await db.collection('educationlist').deleteMany({ ownerId: objectId });
      const result3 = await db.collection('skilllist').deleteMany({ ownerId: objectId });
      const result4 = await db.collection('languagelist').deleteMany({ ownerId: objectId });
      const result5 = await db.collection('hobbylist').deleteMany({ ownerId: objectId });
      const result6 = await db.collection('cvseekerlist').deleteOne({ _id: objectId });
      if (result6.deletedCount === 0) {
        return res.status(404).json({ message: 'Item not found in collection cvseekerlist' });
      }
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


// Show all Seeker list
app.get('/api/showseekerlist', cors(), async (req, res) => {
    const db = await connect();
    const result = await db.collection('cvseekerlist').find().toArray();
    res.send(result);
});

// Show all employee list
app.get('/api/showemployeelist', cors(), async (req, res) => {
    const db = await connect();
    const result = await db.collection('adminlist').find().toArray();
    res.send(result);
});

// Show all slideshow list
app.get('/api/showslideshowlist', cors(), async (req, res) => {
    const db = await connect();
    const result = await db.collection('slideshowlist').find().toArray();
    res.send(result);
});

// Handle file upload request
app.post('/api/addslideshow', upload.single('imgfile'), async (req, res) => {
    const file = req.file;
    const { caption } = req.body;
    if (!file) {
        return res.status(400).json({ message: 'Please upload a file.' });
    }
    const imageUrl = req.protocol + '://' + req.get('host') + '/' + file.path;
    const db = await connect();
    const result = await db.collection('slideshowlist').insertOne({ caption, file, imageUrl });
    res.json(result);
});

app.listen(port, () => console.log(`Server started on port ${port}`));


