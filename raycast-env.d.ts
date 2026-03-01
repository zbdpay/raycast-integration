/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** ZBD API Key - Used as ZBD_API_KEY for zbdw */
  "apiKey": string,
  /** zbdw Path - Optional absolute path override for zbdw binary */
  "cliPath"?: string,
  /** API Base URL - Optional ZBD_API_BASE_URL override */
  "apiBaseUrl"?: string,
  /** AI Base URL - Optional ZBD_AI_BASE_URL override */
  "aiBaseUrl"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `init` command */
  export type Init = ExtensionPreferences & {}
  /** Preferences accessible in the `info` command */
  export type Info = ExtensionPreferences & {}
  /** Preferences accessible in the `balance` command */
  export type Balance = ExtensionPreferences & {}
  /** Preferences accessible in the `receive` command */
  export type Receive = ExtensionPreferences & {}
  /** Preferences accessible in the `send` command */
  export type Send = ExtensionPreferences & {}
  /** Preferences accessible in the `payments` command */
  export type Payments = ExtensionPreferences & {}
  /** Preferences accessible in the `payment` command */
  export type Payment = ExtensionPreferences & {}
  /** Preferences accessible in the `paylink-create` command */
  export type PaylinkCreate = ExtensionPreferences & {}
  /** Preferences accessible in the `paylink-get` command */
  export type PaylinkGet = ExtensionPreferences & {}
  /** Preferences accessible in the `paylink-list` command */
  export type PaylinkList = ExtensionPreferences & {}
  /** Preferences accessible in the `paylink-cancel` command */
  export type PaylinkCancel = ExtensionPreferences & {}
  /** Preferences accessible in the `withdraw-create` command */
  export type WithdrawCreate = ExtensionPreferences & {}
  /** Preferences accessible in the `withdraw-status` command */
  export type WithdrawStatus = ExtensionPreferences & {}
  /** Preferences accessible in the `onchain-quote` command */
  export type OnchainQuote = ExtensionPreferences & {}
  /** Preferences accessible in the `onchain-send` command */
  export type OnchainSend = ExtensionPreferences & {}
  /** Preferences accessible in the `onchain-status` command */
  export type OnchainStatus = ExtensionPreferences & {}
  /** Preferences accessible in the `onchain-retry-claim` command */
  export type OnchainRetryClaim = ExtensionPreferences & {}
  /** Preferences accessible in the `fetch` command */
  export type Fetch = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `init` command */
  export type Init = {}
  /** Arguments passed to the `info` command */
  export type Info = {}
  /** Arguments passed to the `balance` command */
  export type Balance = {}
  /** Arguments passed to the `receive` command */
  export type Receive = {}
  /** Arguments passed to the `send` command */
  export type Send = {}
  /** Arguments passed to the `payments` command */
  export type Payments = {}
  /** Arguments passed to the `payment` command */
  export type Payment = {}
  /** Arguments passed to the `paylink-create` command */
  export type PaylinkCreate = {}
  /** Arguments passed to the `paylink-get` command */
  export type PaylinkGet = {}
  /** Arguments passed to the `paylink-list` command */
  export type PaylinkList = {}
  /** Arguments passed to the `paylink-cancel` command */
  export type PaylinkCancel = {}
  /** Arguments passed to the `withdraw-create` command */
  export type WithdrawCreate = {}
  /** Arguments passed to the `withdraw-status` command */
  export type WithdrawStatus = {}
  /** Arguments passed to the `onchain-quote` command */
  export type OnchainQuote = {}
  /** Arguments passed to the `onchain-send` command */
  export type OnchainSend = {}
  /** Arguments passed to the `onchain-status` command */
  export type OnchainStatus = {}
  /** Arguments passed to the `onchain-retry-claim` command */
  export type OnchainRetryClaim = {}
  /** Arguments passed to the `fetch` command */
  export type Fetch = {}
}

