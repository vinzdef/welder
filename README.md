# welder
Rust Worker

Tonight I slept quite well, for the first time in a while I did't wake up with any back pain, and I dreamt so well!

In the dream I could see events being dispatched in the form of actions, flowing from the main thread to a WebWorker, which would alwyas send back a perfectly computed state tree for the main thread to render.

But something was off... it wasn't the usual offloading of resource-intensive computations to a separate thread...

The WebWorker was piping data trough a WebAssembly complied Rust backend!!!

Looking out to the horizon in that dreamy landscape I could see compilation of Rust code to WebAssembly on file save, hotswapping of the backend module, the two environments were perfectly merged, the workflow was so smooth and the resulting application super responsive.

___

This is a Proof of Concept.

### How to run this sample application?
Just run a web server in the root and use a modern browser.

There's a convenient `./compile` script that re-compiles `src/rust/main.rs`.

For it to work you need `rustc` and enabled `wasm32-unknown-unknown` target.

