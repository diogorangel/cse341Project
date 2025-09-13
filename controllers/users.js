// controllers/users.js
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDb().db("project1").collection('users').find(); // Adicione ".db('project1')" aqui
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getById = async (req, res, next) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("project1").collection('users').find({_id: userId}); // Adicione ".db('project1')" aqui
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async (req, res, next) => {
    //#swagger.tags = ['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db("project1").collection('users').insertOne(user);
    
    // Altere a condição para verificar se a operação foi reconhecida.
    if (response.acknowledged) {
        // Retorne o novo ID criado com o status 201 (Created)
        res.status(201).json({ id: response.insertedId });
    } else {
        // Caso a operação não seja reconhecida, retorne um erro genérico
        res.status(500).json({ message: 'Some error occurred while creating the user.' });
    }
};
const updateUser = async (req, res, next) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db("project1").collection('users').updateOne({_id: userId}, {$set: user});
    if(response.modifiedCount > 0){
        res.status(204).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};
const deleteUser = async (req, res, next) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db("project1").collection('users').deleteOne({_id: userId});
    if(response.deletedCount > 0){
        res.status(204).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser
};