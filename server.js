const express = require('express');
const todoRoutes = require('./todos/routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/', todoRoutes);

app.listen(PORT, () => {
    console.log(`Node API running on port ${PORT}`);
});
