import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface Pokemon {
  name: string;
  url: string;
}

@customElement("pk-list")
export default class PkList extends LitElement {
  @property({ type: Array }) items: Pokemon[] = [];

  @property({ type: String }) search = "";

  @property({ type: String }) selectedUrl = "";

  @property({ type: Array }) filteredItems: Pokemon[] = [];

  updated(cp: any) {
    if (cp.has("items") || cp.has("search")) this.filter();
  }

  _onClick(e: any) {
    this.dispatchEvent(
      new CustomEvent("item-click", {
        detail: { url: e.currentTarget.dataset.url },
        composed: true,
        bubbles: true,
      })
    );
  }

  _onInputChange(e: any) {
    const val = e.target.value.toLowerCase();
    this.search = val;
  }

  filter() {
    this.filteredItems = this.items.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(this.search);
    });
  }

  static styles = css`
    .input-container {
      padding: 0 10px;
    }
    input {
      line-height: 27px;
      padding: 2px;
      width: 100%;
    }
    h3 {
      font-size: 14px;
      font-weight: 500;
      padding: 0 10px;
      height: 40px;
      border-bottom: solid 1px #ccc;
      line-height: 40px;
      text-transform: capitalize;
      cursor: pointer;
      margin: 0;
    }
    h3:hover {
      background: #d7d4d4;
    }
    h3[selected] {
      font-weight: bold;
    }
  `;

  render() {
    return html`<div>
      <div class="input-container">
        <input placeholder="search" @input=${this._onInputChange} />
      </div>
      ${this.filteredItems.map((pokemon) => {
        return html`<h3
          @click=${this._onClick}
          ?selected=${pokemon.url === this.selectedUrl}
          data-url=${pokemon.url}
        >
          ${pokemon.name}
        </h3>`;
      })}
    </div>`;
  }
}
