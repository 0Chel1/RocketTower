module.exports = function (config) {
    const assetsUrl = 'https://raw.githubusercontent.com/0Chel1/screepsmod-testMod/refs/heads/main/';

    if (config.backend) {
        config.backend.customObjectTypes.rockettower = {
            sidepanel: '<div><label>Description:</label><span>This is Rocket Tower. It Shoots rockets.</span></div>'
        };

        config.backend.renderer.resources['tower_texture'] = `${assetsUrl}RocketTower.png`;
        config.backend.renderer.metadata['rockettower'] = {
            processors: [
                {
                    type: 'sprite',
                    once: true,
                    actions: [
                        {
                            action: 'Repeat',
                            params: [
                                {
                                    action: 'RotateBy',
                                    params: [
                                        15,
                                        10,
                                    ],
                                },
                            ],
                        },
                    ],
                    payload: {
                        texture: 'tower_texture',
                        width: 150,
                        height: 150,
                    }
                },
                {
                    type: 'runAction',
                    once: true,
                    when: { $and: [{ $state: 'user' }] },
                    payload: {
                        id: 'rotateTower',
                    },
                    actions: [{
                        action: 'Repeat',
                        params: [{
                            action: 'RotateBy',
                            params: [15, 10],
                        }],
                    }],
                }
            ]
        };
    }

    /*if (config.cronjobs) {
        // it runs once a year
        config.cronjobs.genMyCustomStructures = [365 * 24 * 60 * 60, async ({ utils }) => {
            const { db, env } = config.common.storage;
            // run once
            // checks if a env variable myCustomStructuresWereGenerated was set. If so, do nothing
            if (await env.get('myCustomStructuresWereGenerated')) {
                return;
            }

            // spawn objects
            await db['rooms.objects'].insert({ room: 'W7N3', x: 25, y: 25, type: 'rockettower' });

            // set the env variable
            await env.set('myCustomStructuresWereGenerated', 1);
        }];
    }*/

}