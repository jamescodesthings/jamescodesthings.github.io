# Assets

Static assets used by the website. During the build, these are copied to the output directory under `/assets`.

## Images

### profile.png

A headshot of James Macmillan at 1024x1024px, suitable for cropping to a circle. Used on the homepage as the profile photo.

### favicon.svg / favicon.ico / apple-touch-icon.png / og-logo.png

The "ct" monogram. `favicon.svg` is the standalone icon with fixed colours and a dark-mode media rule. The ICO (16 and 32px), the 180px touch icon and the 1200x630 share-card logo are rendered from the monogram on a `#0f1216` tile by `scripts/make-icons.sh`. The inline logo used in the header and footer is `src/templates/sections/logo.ejs`.

### zipline.gif

A 640x480 animated GIF depicting the "I feel like you're just here for the zipline" meme. Used as a humorous callout on the homepage to direct visitors to the CampSnap filters project at https://codesthings.com/campsnap.

## Icons

Technology and tool icons used to illustrate skills and experience on the site. All are either SVG or PNG format.

### icons/aws-dynamo.svg

The official AWS DynamoDB architecture icon (80x80px). Blue-purple gradient background with a white DynamoDB icon. Used to illustrate DynamoDB experience.

### icons/aws-lambda.svg

The official AWS Lambda architecture icon. Used to illustrate serverless/Lambda experience.

### icons/sls.svg

The Serverless Framework logo. Used to illustrate experience with the Serverless Framework.

### icons/capacitor-logo.png

The Ionic Capacitor logo. Used to illustrate experience with Capacitor for cross-platform mobile apps.

### icons/cordova_256.png

The Apache Cordova logo at 256px. Used to illustrate experience with Cordova for hybrid mobile apps.

### icons/nativescript-logo.png

The NativeScript logo. Used to illustrate experience with NativeScript for native mobile development.

### icons/stencil-logo.png

The Stencil.js logo. Used to illustrate experience with Stencil for building web components.

### icons/vite.svg

The Vite build tool logo. Used to illustrate experience with Vite.
