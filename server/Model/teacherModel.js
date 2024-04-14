const mongoose= require ('mongoose');

const TeacherSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: String

    }
);
const TeacherModel = mongoose.model("Teacher",TeacherSchema);
module.exports= TeacherModel