import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface UserInstance extends Model {
    id: number;
    name: string;
    email: string;
    password: string;
    userImg: string;
    bgImg: string;
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    userImg: {
        type: DataTypes.STRING
    },
    bgImg: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
});