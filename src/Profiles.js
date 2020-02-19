'use strict';

const Profile = require('./Profile');

module.exports = class Profiles {
    static factory (definitions) {
        return new Profiles(definitions);
    }

    static isValidInstance (profiles) {
        if (!(profiles instanceof Profiles)) {
            return false;
        }

        if (profiles.destroyed) {
            return false;
        }

        return true;
    }

    constructor (definitions) {
        this.destroyed = false;
        this.profiles = {};

        this.addDefinitions(definitions);
    }

    addDefinition (definition) {
        try {
            Profile.validateDefinition(definition);
        }
        catch (error) {
            console.error(error);
            throw new Error('could not add invalid profile definition');
        }    

        if (this.has(definition.name)) {
            throw new Error(`cannot add definition - defintion with name ${definition.name} already exists`);
        }

        this.profiles[definition.name] = Profile.factory(definition);
    }
    
    addDefinitions (definitions) {
        if (!Array.isArray(definitions)) {
            throw new Error('definitions must be an array');
        }

        const invalidDefinitions = definitions.reduce((accumulator, definition, index) => {
            try {
                Profile.validateDefinition(definition);
            }
            catch (error) {
                accumulator.push({
                    index,
                    definition,
                });
            }
        }, []);

        // @todo - this is rigid.  what is a good way to add valid definitions while
        // still properly informing the caller of the definitions that were not added?
        // custom return object?
        if (invalidDefinitions.length) {
            console.error(invalidDefinitions);
            throw new Error('cannot add invalid definitions - no definitions will be added');
        }

        const existingDefinitions = definitions.reduce((accumulator, definition, index) => {
            if (this.has(definition.name)) {
                accumulator.push({
                    index,
                    definition,
                });
            }
        }, []);

        // @todo - this is rigid.  what is a good way to add valid definitions while
        // still properly informing the caller of the definitions that were not added?
        // custom return object?
        if (existingDefinitions.length) {
            console.error(existingDefinitions)
            throw new Error('cannot add existing definitions - no definitions will be added');
        }

        for (let i = 0; i < definitions.length) {
            const definition = definitions[i];

            this.addDefinition(definition);
        }
    }

    has (name) {
        return this.profiles.hasOwnProperty(name);
    }

    each (action) {
        if (typeof action !== 'function') {
            throw new Error('action must be a function');
        }

        for (let profile in this.profiles) {
            const result = action(profile, this);

            if (result === false) {
                break;
            }
        }
    }

    async eachAsync (action) {
        if (typeof action !== 'function') {
            throw new Error('action must be a function');
        }

        for (let profile in this.profiles) {
            const result = await action(profile, this);

            if (result === false) {
                break;
            }
        }
    }

    destroy () {
        if (this.destroyed) {
            return;
        }

        this.destroyed = true;

        this.each(() => {
            profile.destroy();
            delete this.profiles[profile.name];
        });

        this.profiles = null;
    }
};