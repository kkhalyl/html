import fs from 'fs';
import http from 'http';
import dotenv from 'dotenv';
import { createLink } from './util.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

const directoryPath = process.argv[2];
const PORT = process.env.PORT || 3000;

function listarDir(directoryPath, callback) {
    fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return callback(err);
        }

        const result = files.map(file => ({
            name: file.name,
            type: file.isDirectory() ? 'directory' : 'file'
        }));

        callback(null, result);
    });
}

function criarPag(files) {
    // Verifica se files é um array antes de usar forEach
    if (!Array.isArray(files)) {
        return 'Erro ao listar arquivos';
    }

    // Gera o HTML apenas com os links
    return files.map(file => createLink(file.name)).join('<br>');
}

function criarPagConteudo(nomeArquivo) {
    const filePath = path.join(directoryPath, nomeArquivo);

    try {
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            return `<p>O item é um diretório e não pode ser lido.</p><br><a href="/">Voltar</a>`;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        return `<pre>${content}</pre><br><a href="/">Voltar</a>`;
    } catch (error) {
        return `<p>Erro ao ler o arquivo: ${error.message}</p><br><a href="/">Voltar</a>`;
    }
}

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        listarDir(directoryPath, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Erro ao listar diretório.');
                return;
            }

            const html = criarPag(files);
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        });
    } else if (url.startsWith('/')) {
        // Remove o leading '/' para obter o nome do arquivo
        const fileName = decodeURIComponent(url.substring(1)); // Decode URL to handle special characters
        if (fileName) {
            const html = criarPagConteudo(fileName);
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Arquivo não especificado.');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Página não encontrada.');
    }
});

server.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}`);
});
