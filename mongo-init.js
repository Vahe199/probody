db = db.getSiblingDB('admin')

db.auth('root', 'vHHCsbSAxrEkYJhy')

db = db.getSiblingDB('probodydb')

db.createUser(
    {
        user: "probody",
        pwd: "Z5evNte7YN96bt4B",
        roles: [
            {
                role: "readWrite",
                db: "probodydb"
            }
        ]
    }
);
