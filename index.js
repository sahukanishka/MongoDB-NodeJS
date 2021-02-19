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
    .find({author:"kanix",isPublished:true})
    .limit(10)
    .sort({name:1})
    .select({name:1,tags:1})
    console.log(course);
     
}
