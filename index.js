module.exports = function (config) {
    const assetsUrl = 'https://raw.githubusercontent.com/0Chel1/RocketTower/refs/heads/main/';

    if (config.backend) {
        if (config.common) {
            config.common.constants.FIND_ROCKETTOWERS = 10051;
            config.common.constants.LOOK_ROCKETTOWERS = "rockettower";
            config.common.constants.CONSTRUCTION_COST.rockettower = 300;
        }

        config.backend.customObjectTypes.rockettower = {
            //sidepanel: '<div><label>Owner: </label>{{ object.user }}</div>'
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
                                        Math.PI,
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
                /*{
                    type: 'sprite',
                    layer: 'lighting',
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
                },*/
                {
                    type: 'runAction',
                    once: true,
                    when: { $state: 'user' },
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

    if (config.engine) {
        config.engine.registerCustomObjectPrototype('rockettower', 'RocketTower', {
            prototypeExtender(prototype, scope, { utils }) {
                const data = id => {
                    if (!scope.runtimeData.roomObjects[id]) {
                        throw new Error("Could not find an object with ID " + id);
                    }
                    return scope.runtimeData.roomObjects[id];
                };

                utils.defineGameObjectProperties(prototype, data, {
                    owner: o => o.user ? { username: scope.runtimeData.users[o.user].username } : undefined,
                    my: o => o.user ? o.user == scope.runtimeData.user._id : undefined,
                    store: o => new scope.globals.Store(o)
                });

                prototype.toString = function () { return `[rockettower #${this.id}]` };
            },
            findConstant: config.common.constants.FIND_ROCKETTOWERS,
            lookConstant: config.common.constants.LOOK_ROCKETTOWERS
        });

        /*prototype.remove = register.wrapFn(function () {

            if (!this.my && !(this.room && this.room.controller && this.room.controller.my)) {
                return C.ERR_NOT_OWNER;
            }
            intents.pushByName('room', 'removeTower', { roomName: data(this.id).room, id: this.id });
            return C.OK;
        });*/
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