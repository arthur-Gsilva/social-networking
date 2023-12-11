import {Request, Response}  from 'express'
import { User } from '../models/user'
import jwt  from 'jsonwebtoken'
import dotenv from 'dotenv'

import bcrypt from 'bcrypt'

dotenv.config()

const createToken = (user: any) => {
    return jwt.sign({email: user.email, name: user.name}, process.env.SECRET as string)
}

export const register = async (req: Request, res: Response) => {

    const { name, email, password, confirmPassword } = req.body

    let passwordHash = await bcrypt.hash(password, 8)

    if(confirmPassword !== password){
        res.status(500).json({msg: "Senhas não batem"})
    }

    let hasUser = await User.findOne({where: {email}})

    if(!hasUser){
        if(name && email && password){
            try{
                let newUser = await User.create({
                    name,
                    email,
                    password: passwordHash
                })
       
                res.status(201).json({msg: "Usuário criado com sucesso"})
            } catch(error){
                res.status(500).json({msg: "Erro ao criar usuário"})
            }
        } else{
            res.status(500).json({ msg: 'dados não enviados' })
        }
    } else{
        res.status(500).json({msg: "Usuário já cadastrado"})
    }

    
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if(email){
        try {    
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado' });
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password);
    
            if (!passwordMatch) {
                return res.status(401).json({ msg: 'Senha incorreta' });
            }

            const token = createToken(user)
            res.status(200).json({msg: "Usuário logado com sucesso",  data: {user, token} });
            
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao fazer login' });
        }
    } else{
        res.status(500).json({ msg: 'Preencha o email' });
    }
    
}

// const {  email, password } = req.body

//     let user = await User.findOne({ 
//         where: { email }
//     });

//     if(user) {
//         const data = user

//         const checkPassword = await bcrypt.compare(password, user.password)
//         if(!checkPassword){
//             return res.status(422).json({error: "Senha incorreta!"})
//         }
//         res.json({ status: true });
//         return;
//     } else{
//         res.json({error: "Usuário não encontrado"})
//     }
// }