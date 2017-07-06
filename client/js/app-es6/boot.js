import { currentInstance } from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.add.bind(negociacaoController);
document.querySelector('#remove').onclick = negociacaoController.remove.bind(negociacaoController);
