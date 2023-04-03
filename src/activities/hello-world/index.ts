class HelloWorld extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `<h1 class="fe-hello-world">Hello World.</h1>`
  }

}

customElements.define('fe-hello-world', HelloWorld)

document.body.appendChild(document.createElement("fe-hello-world"))
