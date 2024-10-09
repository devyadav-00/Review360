import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { 
        type: String, 
        enum: [
            'Manager', 
            'Software Developer', 
            'Software Developer Tester', 
            'Data Analyst', 
            'Data Scientist', 
            'Project Manager', 
            'HR Specialist', 
            'UI/UX Designer', 
            'DevOps Engineer', 
            'System Administrator', 
            'Product Manager', 
            'Marketing Analyst'
        ], 
        required: true 
    },
    salary: { type: Number, required: true },
    remarks: { type: String },
    managed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Assuming a manager is also a User
    image: { type: String }
});

const User = mongoose.model('User', userSchema);

export default User;