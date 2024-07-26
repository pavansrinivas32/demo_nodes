const moment = require('moment');
const tasks = require('../models/schema')


exports.getall = (req, res) => {
    const allTasks = tasks.find()
        // .select("_id title body")
        .then(allTasks => {
            res.status(200).json({ Tasks: allTasks })
        })
        .catch(err => console.log(err));
}

// exports.createPost = (req, res) => {
//     const Task = new tasks(req.body);

//     // Set the createdAt field with the current time formatted
//     Task.createdAt = moment().format('YYYY-MM-DD hh:mm:ss A');

//     Task.save()
//         .then(data => {
//             // Format the createdAt date before sending the response
//             data.createdAt = moment(data.createdAt).format('YYYY-MM-DD hh:mm:ss A');
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the post."
//             });
//         });
// };

exports.createPost = (req, res) => {
    const Task = new tasks(req.body);

    // console.log("post created:", req.body);
    Task.save(Task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
}

exports.deletePost = (req, res) => {
    const id = req.params.id; // Get the ID from request parameters

    tasks.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            }
            res.send({
                message: "Post was deleted successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete Post with id=" + id
            });
        });
};

// Update a post by ID
exports.updatePost = (req, res) => {
    const id = req.params.id; // Get the ID from request parameters

    // Validate request body
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    tasks.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found!`
                });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Post with id=" + id
            });
        });
};

exports.deleteAllPosts = (req, res) => {
    tasks.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Posts were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all posts."
            });
        });
};



// exports.createPost = (req, res) => {
//     const Task =new tasks(req.body);

//     // console.log("post created:", req.body);
//     Task.save((err,result)=>{
//         if(err){
//             return res.status(400).json({
//                 error:err
//             });
//         }
//         res.status(200).json({
//             post:result
//         })
//     })

// }