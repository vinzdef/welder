const imports = {
    imports: {
        imported_func: new Function(/*NOOP*/)
    }
};

const bootAssembly = () =>
    fetch('/build/main.wasm')
        .then(response => response.arrayBuffer())
        .then(bytes => WebAssembly.instantiate(bytes, imports));

bootAssembly()
    .then(assembly => {
        const program = new Program(assembly.instance)
    })


class Program {
    constructor(instance) {
        this.instance = instance;
        onmessage = ({data}) => this.receive(data);
        this.send({action: 'READY'});
    }

    compute({operator, n1, n2}) {
        return this.instance.exports.compute(operator, n1, n2);
    }

    exec(data) {
        const response = {
            action: 'RESULT'
        };

        switch (data.action) {
            case 'COMPUTE':
                response.result = this.compute(data);
                break;
            default:
                response.result = `[!] UNIMPLEMENTED ACTION <${data.action}>`;
        }

        this.send(response);
    }

    send(data) {
        console.info('[WorkerThread] - {🡩}', data);
        postMessage(data);
    }

    receive(data) {
        console.info('[WorkerThread] - {🡫}', data);
        this.exec(data);
    }
}
