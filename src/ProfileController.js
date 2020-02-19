'use strict';

module.exports = class ProfileController {
    static factory (profiles) {
        return new ProfileController(profiles);
    }

    static isValidInstance (profileController) {
        if (!(profileController instanceof ProfileController)) {
            return false;
        }

        if (profileController.destroyed) {
            return false;
        }

        return true;
    }

    constructor (profiles) {
        this.destroyed = false;

        if (!Profiles.isInstance(profiles)) {
            throw new Error('profiles must be a valid Profiles instance');
        }

        this.profiles = profiles;
    }

    async clear () {
        await this.profiles.eachAsync(async (profile) => {
            await this.unlink(profile.name);
        });
    }

    async link (name) {
        await this.clear();

        const profile = this.profiles.get(name);

        const linkTarget = profile.defaultLocation;
        const linkSource = profile.customLocation;

        // @todo
    }

    async unlink (name) {
        const profile = this.profiles.get(name);

        const linkTarget = profile.defaultLocation;

        // @todo
    }

    destroy () {
        if (this.destroyed) {
            return;
        }

        this.destroyed = true;

        this.profiles.destroy();

        this.profiles = null;
    }
};