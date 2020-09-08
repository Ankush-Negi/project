import { Request, Response } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import IRequest from '../../libs/routes/IRequest';
import * as bcrypt from 'bcrypt';

class TraineeController {
  private userRepository = new UserRepository();

  static instance;
  static getInstance = (): TraineeController => {
    if (!TraineeController.instance) {
      TraineeController.instance = new TraineeController();
      return TraineeController.instance;
    }
    return TraineeController.instance;
  };
  create = async (req: IRequest, res: Response) => {
    const userId = req.user;
    const id = await this.userRepository.generateId();
    const { password, ...rest } = req.body;
    const hashPassword: string = await bcrypt.hash(password, 10);
    const dataTocreate = {
      originalId: id,
      _id: id,
      password: hashPassword,
      createdBy: userId,
      createdAt: Date.now(),
      ...rest
     };
    const user = await this.userRepository.create(dataTocreate);
    if (!user) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    res.send({
      status: 'OK',
      message: 'Trainee added successfully'
    });
  };

  delete = async (req: IRequest, res: Response) => {
    const userId = req.user;
    const { id } = req.params;
    const data = {
      userId,
      id,
    };
    const user = await this.userRepository.delete(data);
    if (!user) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    res.send({
      status: 'OK',
      message: 'Trainee deleted successfully'
    });
  };

  update = async (req: IRequest, res: Response) => {
    const { id, dataToUpdate } = req.body;
    const userId = req.user;
    const data = {
      id,
      userId,
      dataToUpdate,
      updatedAt: Date.now(),
      updatedBy: userId
    };
    const user = await this.userRepository.update(data);
    if (!user) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    res.send({
      status: 'OK',
      message: 'Trainee updated successfully'
    });
  };

  getAll = async (req: Request, res: Response) => {
    const { skip, limit, name, email, ...rest } = req.query;
    let { sort } = rest;
    if (sort === '' || sort === undefined) {
      sort = 'createdAt';
    }
    const options = { skip, limit, sort };
    let regexValue;
    let reg = {};
    if (name !== '' && name !== undefined) {
      const del1 = name;
      regexValue = 'name';
      reg = { [regexValue]: { $regex: `^${del1}`, $options: 'i' } };
    }
    if (email !== '' && email !== undefined) {
      regexValue = 'email';
      const del2 = email;
      reg = { ...reg, [regexValue]: { $regex: `^${del2}`, $options: 'i' } };
    }
    let query = Object.assign(reg, rest);
    query = {
      ...query,
      deletedAt: undefined,
    };
    const getUsers = await this.userRepository.list(query, options);
    if (!getUsers) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    const { listCount, list } = getUsers;
    res.send({
      status: 'OK',
      message: 'Trainee list : ',
      data: {
        total_user: listCount,
        list
      }
    });
  };
}

export default TraineeController.getInstance();
