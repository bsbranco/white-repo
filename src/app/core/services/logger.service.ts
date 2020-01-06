import { environment } from 'environments/environment';


const internalLogger = {
    debug: (...output: any) => {
        // tslint:disable-next-line:no-console
        console.debug(... output);
    },
    info: (...output: any) => {
        // tslint:disable-next-line:no-console
        console.info(... output);
    },
    warn: (...output: any) => {
        console.warn(... output);
    },
    error: (...output: any) => {
        console.error(... output);
    }
};

export const logger  = new Proxy(internalLogger, {
    get(target, name) {
        return () => {
            if (!environment.production && target.hasOwnProperty(name)) {
            target[name](...arguments);
            }
        };
    }
});

