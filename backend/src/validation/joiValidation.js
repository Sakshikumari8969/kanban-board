const joi = require("joi")
const {taskStatus}=require("../constants")
const{DOING,DONE,REVIEW,TESTING,TODO}=taskStatus

exports.userJoi = joi.object({
    name: joi.string().trim().required().regex(/^[a-zA-Z.]+$/).message("Please enter valid name"),
    email: joi.string().trim().required().email().message("Please enter valid email"),
    password: joi.string().trim().required().min(8).max(15),
    phone: joi.string().trim().required().regex(/^((91)|(\+91)|0?)[6789]{1}\d{9}$/).message(" Please enter valid phone number")

});

exports.loginJoi = joi.object({
    email: joi.string().trim().required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).message("please enter valid email"),

    password: joi.string().trim().required().min(8).max(15).message("please enter valid password")

});

exports.taskCreateBodySchema=joi.object({
    title:joi.string().required(),
    status:joi.string().trim().required().valid(TODO, DOING, REVIEW, TESTING, DONE),
    description:joi.string().required(),
    board:joi.string().required()
});

exports.taskUpdateJoi=joi.object({
    title:joi.string().optional(),
    status:joi.string().trim().optional().valid(TODO, DOING, REVIEW, TESTING, DONE),
    description:joi.string().optional(),
    members:joi.string().optional()
})

exports.boardCreateDataValidator=joi.object({
    boardName:joi.string().trim().required()
    
});


// exports.boardUpdateJoi=joi.object({
//     boardName:joi.string().trim().optional(),
    
// });

// exports.commentCreateJoi=joi.object({
    
//     comment:joi.string().required(),
   
// });

// exports.commentUpdateJoi=joi.object({
//     comment:joi.string().optional()
// });



