const express = require("express");
const app = express();
const PORT = process.PORT || 3030

// TODO: Implement HTTPS
app.listen(PORT, () => {
    console.log(`Identity Service running on port ${PORT}`);
});