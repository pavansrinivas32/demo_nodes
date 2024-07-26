const mongo = require('mongoose');

const PostSchema =new mongo.Schema({
    title:{
        type:String,
        required:"Title is reuired",
        minlength:4,
        maxlength:150
    },
    body:{
        type:String,
        required:"Body is reuired",
        minlength:10,
        maxlength:2000
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports =mongo.model("tasks",PostSchema);