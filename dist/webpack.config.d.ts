export = config;
declare const config: {
    mode: string;
    entry: {
        v3dcore: string;
    };
    module: {
        rules: ({
            test: RegExp;
            use: string;
            resolve?: undefined;
        } | {
            test: RegExp;
            resolve: {
                fullySpecified: boolean;
            };
            use?: undefined;
        })[];
    };
    resolve: {
        modules: string[];
        extensions: string[];
        symlinks: boolean;
    };
    experiments: {
        topLevelAwait: boolean;
    };
    optimization: {
        minimize: boolean;
        minimizer: terser<import("terser").MinifyOptions>[];
    };
    target: string[];
}[];
import terser = require("terser-webpack-plugin");
