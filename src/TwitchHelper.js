class Twitch {
    constructor() {
        this.ext = window.Twitch ? window.Twitch.ext : null;
        this.configuration = {
            broadcaster: {},
            global: {},
            developer: {},
        };
        this.context = {}
        if (this.ext) {
            this.initConfigurationListener();
            this.initContextListener();
        } else {
            console.error("Twitch ext helper is not loaded. Please add it in your HTML template")
        }
    }

    initConfigurationListener() {
        this.ext.configuration.onChanged(() => {
            ['broadcaster', 'global', 'developer'].forEach(segment => {
                let config = this.ext.configuration[segment];
                if (config) {
                    this.configuration = {
                        ...this.configuration,
                        [segment]: JSON.parse(config.content)
                    }
                    this.ext.rig.log(`[${segment}] New config: ${config.content}`);
                }
            })
        })
    }

    initContextListener() {
        this.ext.onContext((context,delta)=>{
            this.context = {
                ...this.context,
                ...context
            }
        })
    }

    publishConfig(content, segment = 'broadcaster', version='1.0') {
        let configuration = { ...this.configuration.broadcaster, ...content};
        this.ext.configuration.set(segment, version, JSON.stringify(configuration));
        this.ext.rig.log(`[${segment}] Configuration updated: ${JSON.stringify(configuration)}`)
    }

    sendPubSubMessage(content, target= 'broadcast') {
        this.ext.send(target, 'application/json', content)
        this.ext.rig.log(`[PubSub:${target}] Send message: ${JSON.stringify(content)}`)
    }
}

export default Twitch;