import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("pk-detail")
export default class HelloWorld extends LitElement {
  @property({ type: String }) url: string = "";

  @property({ type: Object }) pokemon: any = {};

  @property({ type: Boolean }) is3d = false;

  updated(cp: any) {
    if (cp.has("url")) this._onUrlChange(this.url);
  }

  _onUrlChange(url: string) {
    if (url) {
      fetch(url)
        .then((r) => r.json())
        .then((res) => {
          this.pokemon = res;
        });
    }
  }

  _on3dChange(e: any) {
    this.is3d = e.currentTarget.checked;
  }

  static styles = css`
    :host {
      display: grid;
      justify-content: center;
      grid-auto-rows: min-content;
    }
    [is3d] {
      /* transform: rotate3d(1, 1, 1, 45deg); */
      transform: rotate3d(-11, 5, -3, 329deg);
    }
  `;

  render() {
    return html`
      <h1>${this.pokemon.name}</h1>
      <img
        ?is3d=${this.is3d}
        src=${this.pokemon?.sprites?.front_shiny}
        width="200"
      />
      <div>
        <input id="checkbox" type="checkbox" @change=${this._on3dChange} />
        <label for="checkbox">${this.is3d ? "2D" : "3D"}</label>
      </div>
      <table>
        <tbody>
          <tr>
            <td>Height</td>
            <td>${this.pokemon.height}</td>
          </tr>
        </tbody>
      </table>
      <h4>Moves</h4>
      <table>
        <tbody>
          ${(this.pokemon?.moves || []).map(
            (move: any) => html`<tr>
              <td>${move.move.name}</td>
            </tr>`
          )}
        </tbody>
      </table>
    `;
  }
}
