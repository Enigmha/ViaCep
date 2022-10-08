import Address from '../models/address.js';
import * as requestService from  '../services/request-service'



function State(){

    this.address = new Address();

    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCidade = null;

    this.errorCep = null;
    this.errtNumber = null;
}

const state = new State();

export function init(){
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCidade = document.forms.newAddress.cidade;
    
    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errtNumber = document.querySelector('[data-error="number"]');

    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.btnClear.addEventListener('click', handelBtnClearClick);
    state.btnSave.addEventListener('click', handelBtnSaveClick);

   
}

async function handelBtnSaveClick(event){
    event.preventDefault();
    const result = await requestService.getJson('https://viacep.com.br/ws/01001000/json/');
    console.log(result);
}

function handleInputNumberChange(event) {
    if(event.target.value == "") {
        setFormError("number", "Campo Requerido");
    }
    else{
        setFormError("number", "");
    }
}

function handelBtnClearClick(event) {
    event.preventDefault();
    clearForm();
}

function clearForm() {
    state.inputCep.value = "";
    state.inputCidade.value = "";
    state.inputNumber.value = "";
    state.inputStreet.value = "";

    setFormError("cep", "");
    setFormError("number", "");

    state.inputCep.focus();
}

function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}