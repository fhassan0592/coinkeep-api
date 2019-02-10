import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    createdAt: {
        type: String,
        default: Date.now()
    }
});

AuthSchema.pre('save', function(next) {
    let auth = this;
    if (!auth.isModified('password')) return next();
    bcrypt.genSalt(process.env.SALT_ROUNDS, (err, hash) => {
        if (err) return next(err);
        bcrypt.hash(auth.password, salt, null, (err, hash) => {
            if (err) return next(err);
            auth,password = hash;
            return next();
        });
    });
});

AuthSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}


export default mongoose.model('Auth', AuthSchema);
