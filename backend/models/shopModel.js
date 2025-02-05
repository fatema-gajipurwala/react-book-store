import mongoose from 'mongoose';


const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  owner: { type: String },
  phone: { type: String },
  description: { type: String },
  address: { type: String, required: true },
},
{
  timestamps: true,
}
);

const shopModel = mongoose.model('Shop', shopSchema);

export default shopModel;
