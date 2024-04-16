const mongoose= require ('mongoose');

const StudentSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: String

    }
);
const StudentModel = mongoose.model("Student",StudentSchema);
module.exports= StudentModel