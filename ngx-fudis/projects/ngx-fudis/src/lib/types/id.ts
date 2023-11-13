/**
 * File containing types used in FudisIdService
 */

export const fudisIdComponents = [
	'alert',
	'autocomplete',
	'button',
	'autocomplete-multi-select',
	'datepicker',
	'daterange',
	'dialog',
	'dropdown',
	'expandable',
	'fieldset',
	'form',
	'heading',
	'input-with-language-options',
	'section',
	'text-area',
	'text-input',
] as const;

export type FudisIdComponent = (typeof fudisIdComponents)[number];

export const fudisIdParents = ['breadcrumbs', 'checkbox-group', 'dropdown-menu', 'radio-button-group'] as const;

export type FudisIdParent = (typeof fudisIdParents)[number];

export type FudisIdFamily = {
	parent: string;
	children: string[];
};

export type FudisIdFamilyData = {
	[key in FudisIdParent]: FudisIdFamily[];
};

export type FudisIdComponentData = {
	[key in FudisIdComponent]: string[];
};