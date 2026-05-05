// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//     {
//         email: {
//            type: String, 
//            required: true,
//            unique: true,
//         },
//         fullName: {
//             type: String,
//             required: true,
//         },
//         password: {
//             type: String,
//             required: true,
//             minlength: 6,
//         },
//         profilePic: {
//             type: String,
//             default: "",
//         },
//     },
//     { timestamps: true}
// );

// const User = mongoose.model("User", userSchema); 

// export default User;




import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: function () {
                return !this.googleId; // ✅ required only if NOT Google user
            },
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },

        // ✅ ADDED (Google fields)
        googleId: {
            type: String,
            default: null,
        },

    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;