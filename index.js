const express = require('express');
const connectDB = require('./config/config');
const postRoutes = require('./routes/posts');

const app = express();

app.use(express.json());

connectDB();

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
