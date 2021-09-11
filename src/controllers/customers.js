const CustomersModel = require('../models/customers');
const { crypto } = require('../utils/password');


function index(req, res){
  res.render('register', {
    title: 'Cadastro de clientes'
  })
}

async function add(req, res){
  const {
    name,
    age,
    email,
    password,
  } = req.body;

  const passwordCrypto = await crypto(toString(password));

  const register = new CustomersModel({
    name,
    age,
    email,
    password: passwordCrypto,
  });

  register.save();
  res.send('cadastro realizado')
}

async function listUsers(req, res){
  const users = await CustomersModel.find()

  res.render('listUsers', {
    users: users,
  })
}

module.exports = {
  index,
  add,
  listUsers
}