/// <reference types="react-scripts" />

declare interface String {
	format(): string;
}

declare interface Number {
	format(): string;
}

type Shop = {
	[key: string]: string;
};
