import UserRepository from '../repositories/user/UserRepository';
import OrderRepository from '../repositories/order/OrderRepository';
import ProductRepository from '../repositories/product/ProductRepository';
import config from '../config/configuration';
import * as bcrypt from 'bcrypt';

const userRepository = new UserRepository();
const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();
export default async function seedData() {
  const { password } = config;
  const hashPassword: string = await bcrypt.hash(password, 10);
  const ownerId = await userRepository.generateId();
  const managerId = await userRepository.generateId();
  const userId = await userRepository.generateId();
  const Owner = {
    _id: ownerId,
    originalId: ownerId,
    name: 'Ankush Negi',
    email: 'ankush.negi@successive.tech',
    address: 'Noida',
    role: 'owner',
    dob: new Date('1998-04-25'),
    mobileNumber: 9557126356,
    hobbies: ['football'],
    password: hashPassword
  };
  const ProductManager = {
    _id: managerId,
    originalId: managerId,
    name: 'Ankush Negi',
    email: 'ank.negi@successive.tech',
    address: 'Noida',
    role: 'product-manager',
    dob: new Date('1998-04-25'),
    mobileNumber: 9557126356,
    hobbies: ['football'],
    password: hashPassword
  };
  const User = {
    _id: userId,
    originalId: userId,
    name: 'Ankush Negi',
    email: 'ankush.neg@successive.tech',
    address: 'Noida',
    role: 'user',
    dob: new Date('1998-04-25'),
    mobileNumber: 9557126356,
    hobbies: ['football'],
    password: hashPassword
  };
  const userCount = await userRepository.count({ deletedAt: undefined });
  if (userCount === 0) {
    console.log('User is seeded');
    userRepository.create(Owner);
    userRepository.create(ProductManager);
    userRepository.create(User);
  } else {
    console.log('User is already seeded');
    console.log('Number of total users: ', userCount);
  }
  const prodId = await productRepository.generateId();
  const product = {
    _id: prodId,
    originalId: prodId,
    name: 'football',
    price: 1000,
    description: 'All Good',
    company: managerId,
  };
  const prodCount = await productRepository.count({ deletedAt: undefined });
  if (prodCount === 0) {
    console.log('product is seeded');
    productRepository.create(product);
  } else {
    console.log('Product is already seeded');
    console.log('Number of total users: ', prodCount);
  }
  const orderId = await orderRepository.generateId();
  const order = {
    _id: orderId,
    originalId: orderId,
    products: ['footBall', 'Ball'],
    createdBy: userId,
  };
  const orderCount = await orderRepository.count({ deletedAt: undefined });
  if (orderCount === 0) {
    console.log('order is seeded');
    orderRepository.create(order);
  } else {
    console.log('order is already seeded');
    console.log('Number of total order: ', orderCount);
  }
}
