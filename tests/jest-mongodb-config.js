export const mdb = {
	mongodbMemoryServerOptions: {
		binary: {
			skipMD5: true,
		},
		autoStart: false,
		instance: {},
	},

	useSharedDBForAllJestWorkers: false,
};
