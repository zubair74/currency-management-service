import * as dynamoose from 'dynamoose';

export const UserCreditSchema = new dynamoose.Schema(
    {   
        userId: {
            type: Number,
            required: true,
            hashKey: true
        },

        balance: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
    },
);