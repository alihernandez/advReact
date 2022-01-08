import 'dotenv/config';
import { config, createSchema} from '@keystone-next/keystone/schema';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

//user authentication
const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, //how long user should stay signed in?
    secret: process.env.COOKIE_SECRET,
};


export default config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        //TODO Add data seeding here
    },
    lists: createSchema({
        //Schema items go here
    }),
    ui: {
        //change for roles
        isAccessAllowed: () => true,
    },
    // TODO add session values here
    });