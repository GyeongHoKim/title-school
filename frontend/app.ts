import { LitElement } from "lit";
import { html } from "lit/html.js";
import { customElement } from "lit/decorators.js";

@customElement("app-component")
export class AppComponent extends LitElement {
  override render() {
    return html`<h1>Hello World</h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-component": AppComponent;
  }
}
