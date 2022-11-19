const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      first: {
        required: true,
        type: String,
      },
      last: String,
    },
    email: {
      required: true,
      type: String,
      validate: {
        validator: async function (email) {
          const user = await this.constructor.findOne({ email });
          return !user;
        },
        message: "The specified email address is already in use.",
      },
    },
    password: {
      type: String,
      default: () => {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()+=+:;<=>";
        const charactersLength = characters.length;
        let result = "";
        for (let i = 0; i < 10; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verified_at: {
      type: Date,
      default: null,
    },
    permissions: {
      type: String,
      default: null,
    },
    age: Number,
  },
  {
    virtuals: {
      fullName: {
        get() {
          return this.name.first + " " + this.name.last;
        },
        set(v) {
          this.name.first = v.split(" ")[0];
          this.name.last = v.split(" ").slice(1).join(" ");
        },
      },
    },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("User", userSchema);
