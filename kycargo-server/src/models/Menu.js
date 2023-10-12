import mongoose from 'mongoose';
import ShortId from 'shortid';

const MenuSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
    default: ShortId.generate,
  },
  role: {
    type: String,
  },
  menus: {
    type: Array,
  },
});

const Menu = mongoose.model('Menu', MenuSchema);
export default Menu;
