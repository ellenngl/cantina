const express = require('express');
const cors = require('cors');
const db = require('./database');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// Rota para salvar a resposta do aluno
app.post('/api/feedback', (req, res) => {
    const {qualidade_comida } = req.body;
    const sql = `INSERT INTO feedbacks (qualidade_comida) VALUES (?)`;
    
    db.run(sql, [qualidade_comida], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Feedback registrado com sucesso!', id: this.lastID });
    });
});

app.get('/api/relatorio', (req, res) => {

    const data = req.query.data;

    let sql = `
        SELECT * FROM feedbacks
    `;

    let params = [];

    if(data){

        sql += `
            WHERE DATE(data_registro) = ?
        `;

        params.push(data);

    }

    sql += `
        ORDER BY data_registro DESC
    `;

    db.all(sql, params, (err, rows) => {

        if (err) {

            return res.status(400).json({
                error: err.message
            });

        }

        res.json(rows);

    });

});

app.post('/api/reclamacoes', (req, res) => {
    const { reclamacao } = req.body;
    const sql = `INSERT INTO reclamacoes (reclamacao) VALUES (?)`;

    db.run(sql, [reclamacao], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Reclamação registrada com sucesso!', id: this.lastID });
    });
});
app.get('/api/reclamacoes', (req, res) => {

    const sql = `
        SELECT * FROM reclamacoes
        ORDER BY data_registro DESC
    `;

    db.all(sql, [], (err, rows) => {

        if(err){

            return res.status(400).json({
                error: err.message
            });

        }

        res.json(rows);

    });

});
// LOGIN ADMIN
app.post('/api/login', (req,res)=>{

    const { usuario, senha } = req.body;

    // LOGIN SIMPLES
    if(usuario === 'coordenacaoMCVM2026' && senha === 'MCVM2026'){

        res.json({
            sucesso:true
        });

    }else{

        res.status(401).json({
            sucesso:false
        });

    }

});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000: http://localhost:3000');
});