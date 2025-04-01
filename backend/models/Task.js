const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dueDate: { type: Date },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    category: {type:String, enum: ["Work", "Personal"], default: "Personal"}
}, { timestamps: true });


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
