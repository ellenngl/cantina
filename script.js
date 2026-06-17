document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
    e.preventDefault(); //Quando o usuário clicar em Enviar Resposta, executa essa função.

    const dados = {
           qualidade_comida: document.querySelector( //Vai pegar o valor do input selecionado, ou seja, a resposta do usuário.
            'input[name="qualidade_comida"]:checked' //entre todos esses radios, pega só o que o usuário clicou
        ).value //Diz o valor (Excelente, Bom, Eh, Ruim ou Pessimo) do radio selecionado
    };

        try {
            const response = await fetch('http://localhost:3000/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            alert('Resposta registrada.');
            document.getElementById('feedbackForm').reset();
        }
    } catch (error) {
        console.error('Erro ao enviar feedback:', error);
    }
});



document.getElementById('enviarRecla').addEventListener('submit', async (e) => {
    e.preventDefault(); //Quando o usuário clicar em Enviar Resposta, executa essa função.

    const dados = {
           reclamacao: document.querySelector('[name="reclamacao"]').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/reclamacao', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            alert('Reclamação registrada.');
            document.getElementById('enviarRecla').reset();
        }
    } catch (error) {
        console.error('Erro ao enviar reclamação:', error);
    }
});