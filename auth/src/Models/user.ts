import mongoose from 'mongoose';

interface UserAttrs{
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<any>{
    build(attrs: UserAttrs): any;
}

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

UserSchema.statics.build = (attrs: UserAttrs)=>{
    return new User(attrs);
}

const User = mongoose.model<any,UserModel>('User', UserSchema);

export { User };

