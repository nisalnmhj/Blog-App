import  mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  comment: [
    {
      text: String,
    },
  ],
});
export const Blog = mongoose.model('Blogs', blogSchema);
