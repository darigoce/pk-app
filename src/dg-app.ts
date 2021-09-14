import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./pk-list";
import "./pk-detail";

@customElement("dg-app")
export default class DgApp extends LitElement {
  @property({ type: Array }) list: any[] = [];

  @property({ type: String }) selectedPokemonUrl: string = "";

  constructor() {
    super();
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        this.list = r.results;
      });
  }

  static styles = css`
    :host {
      display: flex;
    }
    pk-list {
      width: 33%;
    }
    pk-detail {
      flex: 1;
    }
  `;

  _onItemClick(e: CustomEvent) {
    this.selectedPokemonUrl = e.detail.url;
  }

  render() {
    return html` <pk-list
        @item-click=${this._onItemClick}
        .items=${this.list}
        .selectedUrl=${this.selectedPokemonUrl}
      ></pk-list>
      <pk-detail .url=${this.selectedPokemonUrl}></pk-detail>`;
  }
}
