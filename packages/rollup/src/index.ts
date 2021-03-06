import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export type Maybe<T> = T | null;
export type SupportedConfigTypes = string | boolean | number;

export interface ConfigMap<T> {
    [key: string]: T;
}

export interface CustomPluginConfig {
    disabled: boolean;
    // ...and other configs
}

export interface CustomRollupPluginConfig {
    eslint: ConfigMap<SupportedConfigTypes>;
    babel: ConfigMap<SupportedConfigTypes>;
    typescript: ConfigMap<SupportedConfigTypes>;
}

function selectOpts<T>(
    opts: CustomRollupPluginConfig,
    key: string,
    defaultReturn: any = {}
) : ConfigMap<T> {
    if (opts && typeof opts === 'object') {
        return opts[key] || defaultReturn;
    }
    return defaultReturn;
}

export function fetchPluginWithOpts(
    plugin: any,
    opts: CustomRollupPluginConfig,
    key: string
) : any {
    if (!plugin) throw new Error('fetchPluginWithOpts() -> plugin is required');
    const config = selectOpts<CustomPluginConfig>(opts, key, {});
    const isDisabled = config.disabled || false;
    if (isDisabled) return;
    return config ? plugin(config) : plugin();
}

export function getJsonPlugin(
    opts: CustomRollupPluginConfig
) : any {
    return fetchPluginWithOpts(
        json,
        opts,
        'json'
    );
}

export function getEslintPlugin(
    opts: CustomRollupPluginConfig
) : any {
    return fetchPluginWithOpts(
        eslint,
        opts,
        'eslint'
    );
}

export function getBabelPlugin(
    opts: CustomRollupPluginConfig
) : any {
    return fetchPluginWithOpts(
        babel,
        opts,
        'babel'
    );
}

export function getTsPlugin(
    opts: CustomRollupPluginConfig
) : any {
    return fetchPluginWithOpts(
        typescript,
        opts,
        'typescript'
    );
}

export function getBaseRollupPlugins(
    opts: CustomRollupPluginConfig
) : Array<any> {
    return [
        getJsonPlugin(opts),
        getEslintPlugin(opts),
        getTsPlugin(opts),
        getBabelPlugin(opts)
    ];
}
