const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	daisyui: {
		themes: [{
			mytheme: {
				primary: "#BEAEE2",
				secondary: "#F7DBF0",
				accent: "#CDF0EA",
				neutral: "#F9F9F9",
			}
		}]
	},

	plugins: [forms, typography, daisyui]
};

module.exports = config;
