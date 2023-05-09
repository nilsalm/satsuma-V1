const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: { primary: '#BEAEE2', secondary: '#F7DBF0', darker: '#513956', accent: '#CDF0EA', neutral: '#F9F9F9' },
			scale: {
				103: '1.03'
			}
		}
	}
};

module.exports = config;
