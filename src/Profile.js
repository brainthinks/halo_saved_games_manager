'use strict';

module.exports = class Profile {
    static factory (definition) {
        return new Profile(definition);
    }

    static isValidInstance (profile) {
        if (!(profile instanceof Profile)) {
            return false;
        }

        if (profile.destroyed) {
            return false;
        }

        return true;
    }

    static validateDefinition (definition) {
        if (typeof definition !== 'object') {
            throw new Error('profile definition must be an object');
        }

        if (!definition.name) {
            throw new Error('profile definition does not have a name');
        }
        if (!definition.defaultLocation) {
            throw new Error('profile definition does not have a defaultLocation');
        }
        if (!definition.customLocation) {
            throw new Error('profile definition does not have a customLocation');
        }
    }

    constructor ({
        name,
        defaultLocation,
        customLocation,
    }) {
        this.destroyed = false;

        Profile.validateDefinition({
            name,
            defaultLocation,
            customLocation,
        });

        this.name = name;
        this.defaultLocation = defaultLocation;
        this.customLocation = customLocation;
    }

    destroy () {
        if (this.destroyed) {
            return;
        }

        this.name = null;
        this.defaultLocation = null;
        this.customLocation = null;
    }
};