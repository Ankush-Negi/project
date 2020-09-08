import { validateEmail } from './helpers.js';
import { IUsers } from '../interfaces';

const validId: IUsers[] = [];
const invalidId: IUsers[] = [];


export default function validateUsers(user: IUsers[]): void {
    user.forEach(element => {
        const {traineeEmail, reviewerEmail} = element;
        if (validateEmail(traineeEmail) && validateEmail ( reviewerEmail) ) {
            validId.push({traineeEmail, reviewerEmail});
        }
        else {
            invalidId.push({traineeEmail, reviewerEmail});
        }
    });
    console.log(':::::::::::Valid Users:::::::::::\n', validId);
    console.log('Count : ', validId.length);
    console.log(':::::::::::Invalid Users:::::::::::\n', invalidId);
    console.log('Count : ', invalidId.length);
}