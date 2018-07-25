import React from 'react';
import { render } from 'react-dom';
import App from './App';

/* importing codesets and attaching to window here so that we can define the cvcData using them */

import outcomeCategories from './codesets/outcomeCategories';
import operationTypes from './codesets/operationTypes';
import attemptedVias from './codesets/attemptedVias';
import accessMethods from './codesets/accessMethods';

window.accessMethods = accessMethods;

console.log('source accessMethods: ', accessMethods);
console.log('target accessMethods: ', window.accessMethods);

window.outcomeCategories = outcomeCategories;

console.log('source outcomeCategories: ', outcomeCategories);
console.log('target outcomeCategories: ', window.outcomeCategories);

window.operationTypes = operationTypes;

console.log('source operationTypes: ', operationTypes);
console.log('target operationTypes: ', window.operationTypes);

window.attemptedVias = attemptedVias;

console.log('source attemptedVias: ', attemptedVias);
console.log('target attemptedVias: ', window.attemptedVias);
/* end codeset import */

window.MyApp = function MyApp(divId) {
    const target = document.querySelector(divId);
    return render(<App />, target);
};
