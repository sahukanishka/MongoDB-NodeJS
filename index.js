const mongoose = require('mongoose');

//mongodb connect 

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log("connected to mongodb..."))
    .catch(err => console.log("Not connected to momgo ",err))


//Schema of the db

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date : {type: Date, default: Date.now },
    isPublished: Boolean

});


//class of the schema 

const Course = mongoose.model('Course',courseSchema);

// async object of the schema to save data 
async function createCourse(){
    const course = new Course({
        name: "Python Course",
        author: 'kanix',
        tags: ['py','backend'],
        isPublished: true 
    });
    //priniting values 
    const result = await course.save();
    console.log(result);
}

// get the data from the db with filters

async function getCourse(){
    const course = await Course
    .find({author:"kanix",isPublished:true})
    .limit(10)
    .sort({name:1})
    .select({name:1,tags:1})
    console.log(course);
     
}
//comparison operator 

// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
//lte (less than or equal to)
//in  (in)
//nin (not in )

async function getCoursewithfilter(){
    const course = await Course
    //.find({author:"kanix",isPublished:true})
    .find({price: {$gt : 10}})
    .limit(10)
    .sort({name:1})
    .select({name:1,tags:1})
    console.log(course);
     
}


// logical operator 

//or 
//and
async function getCoursefilter(){
    const course = await Course
    //.find({author:"kanix",isPublished:true})
    .find()
    .or([{author:'Mosh'},{isPublished:true}])
    .limit(10)
    .sort({name:1})
    .select({name:1,tags:1})
    console.log(course);
     
}

//regular expression to find the data in db 
// .count is used to count the number of returing documents 
async function getDataCourse(){
    const course = await Course
    // find the name that start with "kanix" 
    .find({author: /^Kanix/ })
    
    //find the name that ends with "sahu"
    // last 'i' is used if we want case in insensitive 
    .find({author:/sahu$/i})


    // last 'i' is used if we want case in insensitive 
    //that contain word = "somestring"
.find({author: /.*string.*/i})

    .select({name:1,tags:1});
    console.log(course)
}




//updating document in mongodb
//two way to do this 

//first way 
//update the doucment by retriving it 

async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) return ;

    course.isPublished =true;
    course.author = "Author name";

    const result = await course.save();
    console.log(result);
}

 


//second way to update directly in database

async function updateCourseDirect(id){
    const course = await Course.findByIdAndUpdate({_id:id},{
        $set: {
            author: 'jack bhai',
            isPublished: false
        }
    },{new:true});
    console.log(course);
}


updateCourseDirect('602f812172380d2cbc5b15f1')