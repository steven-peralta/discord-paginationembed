/// <reference types="node" />
import { DMChannel, Emoji, Message, Snowflake, TextChannel, User } from 'discord.js';
import { EventEmitter } from 'events';
import { Embeds } from '../Embeds';
import { FieldsEmbed } from '../FieldsEmbed';
/**
 * The base class for Pagination Modes. **Do not invoke**.
 * @extends [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)
 * @noInheritDoc
 */
export declare class PaginationEmbed<Element> extends EventEmitter {
    constructor();
    /** The authorized users to navigate the pages. Default: `everyone` */
    authorizedUsers: Snowflake[];
    /** The channel where to send the embed. */
    channel: TextChannel | DMChannel;
    /** Settings for assets for the client. */
    clientAssets: IClientAssets;
    /** An array of elements to paginate. */
    array: Element[];
    /** Whether page number indicator on client's message is shown or not. Default: `true` */
    pageIndicator: boolean;
    /**  Whether the client's message will be deleted upon timeout or not. Default: `false` */
    deleteOnTimeout: boolean;
    /** Jumps to a certain page upon PaginationEmbed.build(). Default: `1` */
    page: number;
    /** The time for awaiting a user action before timeout in ms. Default: `30000` */
    timeout: number;
    /** The emojis used for navigation emojis. */
    navigationEmojis: INavigationEmojis;
    /** The emojis used for function emojis. */
    functionEmojis: IFunctionEmoji<Element>;
    /**
     * The disabled navigation emojis.
     * Available navigation emojis to disable:
     * - 'BACK'
     * - 'JUMP'
     * - 'FORWARD'
     * - 'DELETE'
     * - 'ALL'
     */
    disabledNavigationEmojis: Array<'BACK' | 'JUMP' | 'FORWARD' | 'DELETE' | 'ALL'>;
    /**
     * Number of pages for this instance.
     * @ignore
     */
    pages: number;
    /** The disabled navigation emojis (in values). */
    protected _disabledNavigationEmojiValues: any[];
    /** The default navigation emojis. Used for resetting the navigation emojis. */
    protected _defaultNavigationEmojis: {
        back: string;
        jump: string;
        forward: string;
        delete: string;
    };
    build(): void;
    /**
     * Adds a function emoji to the embed.
     *
     * ### Example
     * ```js
     *  <PaginationEmbed>.addFunctionEmoji('🅱', (_, instance) => {
     *    const field = instance.fields[0];
     *
     *    if (field.name.includes('🅱'))
     *      field.name = 'Name';
     *    else
     *      field.name = 'Na🅱e';
     *  });
     * ```
     * @param emoji - The emoji to use as the function's emoji.
     * @param callback - The function to call upon pressing the function emoji.
     */
    addFunctionEmoji(emoji: string, callback: (user: User, instance: Embeds | FieldsEmbed<Element>) => any): this;
    /**
     * Deletes a function emoji.
     * @param emoji - The emoji key to delete.
     */
    deleteFunctionEmoji(emoji: string): this;
    /** Deletes all function emojis, and then re-enables all navigation emojis. */
    resetEmojis(): this;
    /**
     * Sets the array of elements to paginate. This must be called first before any other methods.
     * @param array - An array of elements to paginate.
     */
    setArray(array: Element[]): this;
    /**
     * Set the authorized users to navigate the pages.
     * @param users - An array of user IDs.
     */
    setAuthorizedUsers(users: Snowflake[]): this;
    /**
     * The channel where to send the embed.
     * @param channel - The channel object.
     */
    setChannel(channel: TextChannel | DMChannel): this;
    /**
     * Sets the settings for assets for the client.
     * @param assets - The assets for the client.
     */
    setClientAssets(assets: IClientAssets): this;
    /**
     * Sets the disabled navigation emojis.
     *
     * ### Example
     * ```js
     *  // Disable specific navigation emojis
     *  <PaginationEmbed>.setDisabledNavigationEmojis(['delete', 'jump']);
     *
     *  // Disable all navigation emojis
     *  <PaginationEmbed>.setDisabledNavigationEmojis(['all']);
     * ```
     *
     * @param emojis  - An array of navigation emojis to disable.
     */
    setDisabledNavigationEmojis(emojis: DisabledNavigationEmojis): this;
    /**
     * Sets the emojis used for function emojis.
     *
     * ### Example
     * ```js
     *  <PaginationEmbed>.setFunctionEmojis({
     *    '🔄': (user, instance) => {
     *      const field = instance.fields[0];
     *
     *      if (field.name === 'Name')
     *        field.name = user.tag;
     *      else
     *        field.name = 'Name';
     *    }
     *  });
     * ```
     * @param emojis - An object containing customised emojis to use as function emojis.
     */
    setFunctionEmojis(emojis: IFunctionEmoji<Element>): this;
    /**
     * Sets the emojis used for navigation emojis.
     * @param emojis - An object containing customised emojis to use as navigation emojis.
     */
    setNavigationEmojis(emojis: INavigationEmojis): this;
    /**
     * Sets to jump to a certain page upon calling PaginationEmbed.build().
     * @param page - The page number to jump to.
     */
    setPage(page: number | 'back' | 'forward'): this;
    /**
     * Sets the time for awaiting a user action before timeout in ms.
     * @param timeout Timeout value in ms.
     */
    setTimeout(timeout: number): this;
    /**
     * Sets whether page number indicator on client's message is shown or not.
     * @param indicator - Show page indicator?
     */
    setPageIndicator(boolean: boolean): this;
    /**
     * Sets whether the client's message will be deleted upon timeout or not.
     * @param deleteOnTimeout - Delete client's message upon timeout?
     */
    setDeleteOnTimeout(boolean: boolean): this;
    /**
     * Evaluates the constructor and the client.
     * @ignore
     */
    _verify(): Promise<boolean>;
    /**
     * Returns whether the given navigation emoji is enabled or not.
     * @param emoji The navigation emoji to search.
     */
    protected _enabled(emoji: NavigationEmojiIdentifier): boolean;
    /** Deploys emoji reacts for the message sent by the client. */
    protected _drawNavigation(): Promise<any>;
    /**
     * Helper for intialising the MessageEmbed.
     * [For sub-class] Initialises the MessageEmbed.
     * @param callNavigation - Whether to call _drawNavigation() or not.
     * @ignore
     */
    _loadList(callNavigation?: boolean): Promise<any>;
    /**
     * Calls PaginationEmbed.setPage() and then executes `_loadList()` and `_awaitResponse()`.
     * @param param - The page number to jump to.
     */
    protected _loadPage(param?: number | 'back' | 'forward'): any;
    /** Awaits the reaction from the user. */
    protected _awaitResponse(): any;
    /**
     * Awaits the custom page input from the user.
     * @param user - The user who reacted to jump on a certain page.
     */
    protected _awaitResponseEx(user: User): any;
    /**
     * Emitted upon successful `build()`.
     * @event
     */
    on(event: 'start', listener: () => void): this;
    /**
     * Emitted when the instance is finished by a user reacting with `DELETE` navigation emoji.
     * @event
     */
    on(event: 'finish', listener: ListenerUser): this;
    /**
     * Emitted upon a user reacting on the instance.
     * @event
     */
    on(event: 'react', listener: ListenerReact): this;
    /**
     * Emitted when the awaiting timeout is reached.
     * @event
     */
    on(event: 'expire', listener: () => void): this;
    /**
     * Emitted upon an occurance of error.
     * @event
     */
    on(event: 'error', listener: ListenerError): this;
    /** @event */
    once(event: 'finish', listener: ListenerUser): this;
    /** @event */
    once(event: 'start' | 'expire', listener: () => void): this;
    /** @event */
    once(event: 'react', listener: ListenerReact): this;
    /** @event */
    once(event: 'error', listener: ListenerError): this;
}
/**  @param user The user who responded to the instance. */
declare type ListenerUser = (user: User) => void;
/**
 * @param user The user who responded to the instance.
 * @param emoji The emoji that was reacted to the instance.
 */
declare type ListenerReact = (user: User, emoji: Emoji) => void;
/** @param err The error object. */
declare type ListenerError = (err: Error) => void;
/** Options for [[PaginationEmbed.disabledNavigationEmojis]]. */
export declare type DisabledNavigationEmojis = NavigationEmojiIdentifier[];
/** An object containing emojis to use as navigation emojis. */
export interface INavigationEmojis {
    back: string | '◀';
    jump: string | '↗';
    forward: string | '▶';
    delete: string | '🗑';
}
/** Assets for the client (message). */
export interface IClientAssets {
    /** The message object. */
    message?: Message;
    /** The text during initialisation of the pagination. Default: `"Preparing..."` */
    prepare?: string;
    /**
     * The text during a prompt for page jump.
     *
     * To include a user mention in the text, use `{{user}}` as placeholder.
     *
     * Default: `"{{user}}, To what page would you like to jump? Say 'cancel' or '0' to cancel the prompt."`
     */
    prompt?: string;
}
export declare type NavigationEmojiIdentifier = 'BACK' | 'JUMP' | 'FORWARD' | 'DELETE' | 'ALL';
export interface IFunctionEmoji<Element> {
    [emojiNameOrID: string]: (user: User, instance: Embeds | FieldsEmbed<Element>) => any;
}
export {};