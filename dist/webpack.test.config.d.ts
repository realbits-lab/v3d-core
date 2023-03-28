export const mode: string;
export const devtool: string;
export const entry: string;
export namespace output {
    namespace library {
        const name: string;
        const type: string;
    }
    const filename: string;
    const path: string;
}
export namespace module {
    const rules: ({
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
}
export namespace resolve {
    const modules: string[];
    const extensions: string[];
    const symlinks: boolean;
}
export namespace experiments {
    const topLevelAwait: boolean;
}
export const target: string[];
export namespace devServer {
    export const allowedHosts: string;
    export namespace _static {
        const directory: string;
    }
    export { _static as static };
    export const compress: boolean;
    export const port: number;
}
export namespace optimization {
    namespace splitChunks {
        const chunks: string;
        namespace cacheGroups {
            namespace defaultVendors {
                const test: RegExp;
                function name(_module: any, chunks: any, _cacheGroupKey: any): string;
            }
        }
    }
}
