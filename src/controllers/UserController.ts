import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";

import { User } from "../db/entity/User";

class UserController {

    static listAll = async (req: Request, res: Response) => {
        //Get all users from database
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find({
            select: ["id", "username", "firstName", "lastName", "email", "role"]
        });

        //Send the list of users 
        res.send(users);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = +req.params.id;

        //Get the user from database
        const userRepository = AppDataSource.getRepository(User);
        try {
            const user = await userRepository.findOneOrFail({
                select: ["id", "firstName", "lastName", "username", "email", "role"],
                where: { id }
            });
            res.send(user)
        } catch (error) {
            res.status(404).send("User not found");
        }
    };

    // Create new user
    static newUser = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { username, password, firstname, lastname, email } = req.body;
        let user = new User();
        user.username = username;
        user.firstName = firstname;
        user.lastName = lastname;
        user.email = email;
        user.password = password;
        // user.role = role;

        //Validate parameters 
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();

        const userRepository = AppDataSource.getRepository(User);
        //Try to save. If fails, the username is already in use

        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("username or email already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("User created");
    };

    static editUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = +req.params.id;

        //Get values from the body
        const { username, role } = req.body;

        //Try to find user on database
        const userRepository = AppDataSource.getRepository(User);

        let user;
        try {
            user = await userRepository.findOneOrFail({ where: { id } });
        } catch (error) {

            res.status(404).send("User not found");
            return;
        }

        //Validate the new values on model
        user.username = username;
        user.role = role;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to store, if fails, that means username already in use
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("username or email already in use");
            return;
        }

        res.status(204).send("Saved Successfully");
    };

    static deleteUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = +req.params.id;

        const userRepository = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        userRepository.delete(id);

        res.status(204).send("Deleted Successfully");
    };
};

export default UserController;