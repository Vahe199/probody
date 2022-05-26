db = db.getSiblingDB('admin')

db.auth('root', '2jkpJeB8yGXt')

db = db.getSiblingDB('probodydb')

db.createUser(
    {
        user: "probody",
        pwd: "3ZCnInWRdJt0",
        roles: [
            {
                role: "readWrite",
                db: "probodydb"
            }
        ]
    }
);
