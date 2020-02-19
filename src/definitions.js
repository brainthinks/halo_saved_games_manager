'use strict';

const haloCustomEditionDefaultLocation = `${process.env.HOME}\\Documents\\My Games\\Halo CE`;
const spv320DefaultLocation = `${process.env.APPDATA}\\SPV3`;

const customSaveLocation = 'E:\\my_games\\halo';

module.exports = [
    {
        name: 'SPV3.2.0',
        customLocation: customSaveLocation,
        defaultLocation: spv320DefaultLocation,
    },
    {
        name: 'halo_custom_edition_refined',
        customLocation: customSaveLocation,
        defaultLocation: haloCustomEditionDefaultLocation,
    },
];
