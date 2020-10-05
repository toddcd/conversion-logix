const expressApp = require('./express-app');
const { PORT } = require('./config');

expressApp.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
});