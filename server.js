const app = require('./src/app');
const port = 3000;

app.listen(port, () => {
    console.log(`Api rodando na porta ${port}`)
});