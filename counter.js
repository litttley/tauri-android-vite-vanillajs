import { invoke } from '@tauri-apps/api'
async  function send_hello(){
 const s =  await invoke("greet", { name: "hello world"});
 console.log(s);
}

export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => {
    send_hello()
    setCounter(counter + 1)
  })
  setCounter(0)
}
