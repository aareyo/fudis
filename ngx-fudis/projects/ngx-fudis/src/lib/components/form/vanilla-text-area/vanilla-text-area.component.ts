import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'fudis-vanilla-text-area',
	templateUrl: './vanilla-text-area.component.html',
	styleUrls: ['./vanilla-text-area.component.scss'],
})
export class VanillaTextAreaComponent implements OnInit {
	@ViewChild('fudisTextArea') textarea: ElementRef<HTMLTextAreaElement>;

	/**
	 *	Label is mandatory for every input
	 */
	@Input() label: string;

	@Input() maxLength?: number;

	/**
	 * Fixed size options for texarea - same what text-input has
	 */
	@Input() size?: 's' | 'm' | 'l' = 'l';

	/**
	 *	Helper or info text, aligned underneath the textarea
	 */
	@Input() helpText?: string;

	@Input() required: boolean = false;

	validatorArray: Array<any> = [];

	textAreaControl = new FormControl('', this.validatorArray);

	defaultError: string;

	usedCharacters: number = 0;

	ngOnInit(): void {
		if (this.required) {
			this.validatorArray.push(Validators.required);
		}
	}

	checkLength(): void {
		this.usedCharacters = this.textarea?.nativeElement.value.length;
	}

	checkErrors(): void {
		if (this.textarea.nativeElement.validationMessage) {
			this.defaultError = this.textarea.nativeElement.validationMessage;
		}
	}

	public get classes(): string[] {
		if (this.textAreaControl.touched && this.textAreaControl.invalid) {
			return ['fudis-text-area--invalid'];
		}
		return [];
	}
}