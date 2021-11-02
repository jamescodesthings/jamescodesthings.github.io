import { Component, h } from '@stencil/core';
import { createLogger } from '../../services/logger';

/**
 * The root component, handles routing and app init
 */
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
})
export class AppRoot {
  private readonly redirectStoragePath = 'redirect-path';
  private navCtrl: HTMLIonRouterElement;
  private log = createLogger('component:app-root');

  async componentDidLoad(): Promise<void> {
    this.navCtrl = document.querySelector('ion-router');
    // handle SPA redirect from 404.html
    await this.redirectIfHit404();
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/profile/:name" component="app-profile" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }

  private async redirectIfHit404() {
    let path = '';
    try {
      path = localStorage?.getItem(this.redirectStoragePath);
      if (!path) {
        return;
      }

      this.log('redirecting to %s', path);
      localStorage?.removeItem(this.redirectStoragePath);
      return this.navCtrl.push(path);
    } catch (error) {
      this.log('could not redirect to %s:', path, error);
      return null;
    }
  }
}
