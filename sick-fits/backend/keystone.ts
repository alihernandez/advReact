import { createAuth } from '@keystone-next/auth';
import { User } from './schemas/User';
import { ProductImage } from './schemas/ProductImage';
import { Product } from './schemas/Product';
import 'dotenv/config';
import { config, createSchema} from '@keystone-next/keystone/schema';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { insertSeedData } from './seed-data';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

//user authentication
const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, //how long user should stay signed in?
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // TODO Add in initial roles
    }
});


export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        async onConnect(keystone) {
            console.log('keystone connected to database!');
            if(process.argv.includes('--seed-data')){
            await insertSeedData(keystone);

        }}
    },
    lists: createSchema({
        //Schema items go here
        User,
        Product,
        ProductImage,
    }),
    ui: {
        //Show UI only for people who pass this test
        isAccessAllowed: ({ session }) => {
            // console.log(session);
            return !!session?.data;
        }
    },
    // passes along ID with every session
    session: withItemData(statelessSessions(sessionConfig), {
        //GraphQL query
        User: `id name email`
    })
    })
    );