/// <reference types="react" />
import { DirectionType } from '../config-provider';
export declare type MenuTheme = 'light' | 'dark';
export interface MenuContextProps {
    prefixCls: string;
    inlineCollapsed: boolean;
    antdMenuTheme?: MenuTheme;
    direction?: DirectionType;
    firstLevel: boolean;
}
declare const MenuContext: import("react").Context<MenuContextProps>;
export default MenuContext;
