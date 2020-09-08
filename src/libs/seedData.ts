import UserRepository from '../repositories/user/UserRepository';
import config from '../config/configuration';
import * as bcrypt from 'bcrypt';

const userRepository = new UserRepository();
export default async function seedData() {
  const { password } = config;
  const hashPassword: string = await bcrypt.hash(password, 10);
  const id = await userRepository.generateId();
  const User = {
    _id: id,
    originalId: id,
    name: 'Ankush Negi',
    email: 'ankush.negi@successive.tech',
    address: 'Noida',
    role: 'head-trainer',
    dob: new Date('1998-04-25'),
    mobileNumber: 9557126356,
    hobbies: ['football'],
    password: hashPassword
  };
  const count = await userRepository.count({ deletedAt: undefined });
  if (count === 0) {
    console.log('User is seeded');
    return userRepository.create(User);
  } else {
    console.log('User is already seeded');
    console.log('Number of total users: ', count);
  }
}
