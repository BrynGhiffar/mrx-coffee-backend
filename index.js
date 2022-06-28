const express = require('express');
const app = express();

app.use(express.json())

const users = [
    {
        username: "Bryn",
        password: "123"
    },
    {
        username: "admin",
        password: "admin"
    }
]

app.get("/products", (req, res) => {
    return res.status(200).json([
        {
            name: "Black Cofee",
            description: "It's Black Coffee"
        },
        {
            name: "Latte",
            description: "Es ist Latte"
        },
        {
            name: "Croissant",
            description: "A french croissant"
        },
    ]);
});

app.post("/register", (req, res) => {
    const {username, password} = req.body;

    // does username already exist
    let usernameExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            usernameExists = true;

        }
    }
    if (usernameExists) {
        return res.status(400).send("Username already exists");
    }

    users.push({username: username, password: password});
    return res.status(200).send("User has successfully registered");
});

app.post("/login", (req, res) => {
    const {username, password} = req.body;
    console.log(req.body);
    let valid = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            valid = true;
        }
    }
    if (valid) {
        return res.status(200).send("Login Successful");
    }

    return res.status(400).send("Login Failed");
});

const PORT = 3000;
app.listen(PORT, () => {console.log(`Listening on http://localhost:${PORT}`)});