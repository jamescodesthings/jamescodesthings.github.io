import { Component, Prop, State, h, Host } from '@stencil/core';
import { sayHello } from '../../helpers/utils';

/**
 * Default profile page from stencil starter
 */
@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.scss',
})
export class AppProfile {
  /**
   * The page's state
   */
  @State() state = false;
  /**
   * A page prop
   */
  @Prop() name: string;

  /**
   * Format the name
   * @return the formatted name
   */
  formattedName(): string {
    if (this.name) {
      return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
    }
    return '';
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/" />
            </ion-buttons>
            <ion-title>Profile: {this.name}</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <p>
            {sayHello()}! My name is {this.formattedName()}. My name was passed in through a route param!
          </p>

          <ion-item>
            <ion-label>Setting ({this.state.toString()})</ion-label>
            <ion-toggle checked={this.state} onIonChange={ev => (this.state = ev.detail.checked)} />
          </ion-item>
        </ion-content>
      </Host>
    );
  }
}
