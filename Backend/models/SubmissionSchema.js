const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    result: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);