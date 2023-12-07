import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

// Helper for ignoring representative links. Needed to improve accessbility.
// Add [data-representative-link="true"] to any anchor tag that should not be navigated to.
document.body.addEventListener(
  'click',
  (e) => {
    if (
      e.target &&
      e.target instanceof HTMLAnchorElement &&
      e.target.dataset['representativeLink'] === 'true'
    ) {
      const url = new URL(e.target.href);

      if (url.href.includes('#') && url.hash === '') {
        e.preventDefault();
      }
    }
  },
  true
);
