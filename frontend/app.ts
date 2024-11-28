import { css, LitElement } from "lit";
import { html } from "lit/html.js";
import { customElement } from "lit/decorators.js";
import { TitleSchoolController } from "./controllers/title-school.controller";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("app-component")
export class AppComponent extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .card {
      background: white;
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    }
    .image-container {
      width: 100%;
      aspect-ratio: 16 / 9;
      position: relative;
      background-color: rgb(243 244 246);
    }
    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .fallback-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
      color: rgb(107 114 128);
      font-size: 0.875rem;
      text-align: center;
    }
    .card-content {
      padding: 1rem;
    }
    .caption {
      margin: 0;
      color: rgb(75 85 99);
      font-size: 0.875rem;
      line-height: 1.5;
    }
  `;

  private controller: TitleSchoolController;

  constructor() {
    super();
    this.controller = new TitleSchoolController(this);
  }

  override connectedCallback(): void {
    super.connectedCallback();
  }

  override render() {
    return html`
      <div class="card">
        <div class="image-container">
          ${!this.controller.isLoading
        ? html`<img 
                src=${ifDefined(this.controller.titleSchool?.imageUrl)}
                alt="Title School Image"
                class="card-image"
              />`
        : html`<p class="fallback-text">No image available</p>`
          }
        </div>
        <div class="card-content">
          <p class="caption">${this.controller.isLoading ? 'Loading...' : this.controller.titleSchool?.caption}</p>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-component": AppComponent;
  }
}
