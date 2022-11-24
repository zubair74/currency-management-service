import * as dynamoose from 'dynamoose';

export const UserSchema = new dynamoose.Schema(
    {   
        id: {
            type: Number,
            required: true,
            hashKey: true
        },

        username: {
            type: String,
            required: true,
            index: {
                name: "username-index",
            }
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    },
);