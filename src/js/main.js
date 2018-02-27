const inputs = Array.from(
    document.querySelectorAll('input')
);

const span = document.querySelector('span');
const select = document.querySelector('select');


// Middle layer
class Program extends EventEmitter {
    constructor(workerFilePath) {
        super();
        this.worker = new Worker(workerFilePath);
        this.worker.onmessage = ({data}) => this.receive(data);
    }

    send(data) {
        this.worker.postMessage(data);
    }

    receive(data) {
        this.emit('result', data)
    }
}

// React to results

// It's just an example so I don't care about readyness.
// I assume is so fast that it's already there.
// It's just a PoC peeps.
const onProgramResult = function(data) {
    console.info('[MainThread] - {🡫}', data);

    switch (data.action) {
        case 'READY':
            console.info('[+] WebWorker compiled WebAssembly');
            break;
        case 'RESULT':
            span.innerText = data.result;
            break;
    }
}

const program = new Program('/src/js/worker.js');
program.on('result', onProgramResult)


// Send actions when data changes
const onDataChange = function() {
    if (inputs[0].value === "" || inputs[1].value === "") {
        return;
    }

    const action = {
        action: 'COMPUTE',
        operator: getOperator(),
        n1: Number(inputs[0].value),
        n2: Number(inputs[1].value)
    };

    program.send(action);
    console.info('[MainThread] - {🡩}', action);
}

inputs.forEach(i => i.addEventListener('change', onDataChange))
select.addEventListener('change', onDataChange)



/*
 I didn't manage yet to figure out how to pass a string to the Rust function without emscripten.
 So I'm mapping that to values from 0 to 3. :P
*/
const getOperator = function() {
    switch (select.value) {
        case "SUM":
            return 0
        case "DIFF":
            return 1
        case "MULT":
            return 2
        case "DIV":
            return 3
    }
}
