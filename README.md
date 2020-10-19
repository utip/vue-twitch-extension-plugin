# Vue Twitch extension plugin

Vue Twitch extension plugin is Vue.js plugin made to help you to develop Twitch extension.

## Installation: 
This package is published on Github packages.
Before installing it you need to add a `.npmrc` file in your project that contain:
```
registry=https://npm.pkg.github.com/utip
```

Install with
```bash
npm install @utip/vue-twitch-extension-plugin
```

In your HTML template import the twitch-ext module:
```html
<script src="https://extension-files.twitch.tv/helper/v1/twitch-ext.min.js"></script>
```

Then install the plugin
```js
import Vue from 'vue'
import TwitchExtensionPlugin from 'vue-twitch-extension-plugin';

Vue.use(TwitchExtensionPlugin)
```

## Usage:

The twitch extension object describe in [Twitch documentation references](https://dev.twitch.tv/docs/extensions/reference#javascript-helper) is available in all your component with `this.$twitch.ext`

### Configuration service:

Twitch help user to manage the configuration of the extension with their [Configuration service](https://dev.twitch.tv/docs/extensions/building#using-the-configuration-service)

The configuration is available in the `this.$twitch.configuration` object:
```
{
    broadcaster: {},
    developer: {},
    global: {},
}
```

The configuration is reactive and you can add a watch on it to keep it updated in your component:
```js
watch: {
    '$twitch.configuration': function() {
      this.key = this.$twitch.configuration.broadcaster.key
    }
}
```

For each segment the configuration is stored as JS object. You can update a configuration on a segment with:
```js
this.$twitch.publishConfig({key: 'value'}, segment = 'broadcaster', version = '1.0')
```

### Twitch context

The Twitch context (theme, language, current game ...) is available inside your component with:
```js
this.$twitch.context
```