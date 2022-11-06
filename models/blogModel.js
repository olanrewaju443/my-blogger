const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const blogState = {draft: "draft", published: "published"};

const blogSchema = new Schema({
    id: ObjectId,
    created_at: Date,
    title: {
        type: String,
        required: true,
        index: {unique: true, dropDups: true}
    },
    description: String,
    state: {
        type: String,
        required: true,
        enum: Object.values(blogState),
        default: 'draft'
    },
    read_count: {
        type: Number,
        default: 0
    },
    reading_time: {
        type: String,
    },
    tags: [String],
    body: {
        type: String,
        required: true,
    },
    timestamp: {
        created_at: { type: Date, default: Date.now},
        updated_at: { type: Date, default: Date.now},
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true,
    },
});

const blogModel = mongoose.model('blog', blogSchema);
module.exports = { blogModel, blogState};