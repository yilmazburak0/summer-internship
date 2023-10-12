import Menu from 'models/Menu';
import {menuRole} from 'enums/menu';
import {userRole} from 'enums/user';
import ErrorResponse from 'helpers/errorResponse';
import errors from 'enums/errors';

export const createMenu = async (req, res) => {
  if (req.user.role === userRole.ADMIN) {
    await Menu.deleteMany().lean();
    const menuler = await Menu.insertMany(menuRole);
    res.send(menuler);
  } else throw new ErrorResponse(errors.UN_AUTHORIZED);
};

export const getMenu = async (req, res) => {
  res.send(await Menu.findOne({role: req.user.role}).lean());
};
