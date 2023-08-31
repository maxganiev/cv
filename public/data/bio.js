class BioItem {
	constructor(key, value) {
		this.key = key;
		this.value = value;
	}
}

export const bioItemsList = [
	[
		new BioItem('Full name', 'Maxim Ganiev'),
		new BioItem('Specialty', 'Full stack web developer'),
		new BioItem('Residence', 'Saint-Petersburg, Russia'),
		new BioItem(
			'Mission',
			'Build blazingly fast lightweight and SEO friendly webtools from scratch using effective modern technologies'
		),
		new BioItem(
			'Stack',
			'JS [SvelteKit, Vue]; NodeJS [express]; CSS3 [SASS, Bootstrap, Vuetify]; static site generators [Astro]; PHP [Laravel]; mySQL with (-out) ORMs like Prisma; server configuration [NGINX, Apache]; web compilers [Vite, Webpack, Snowpack]; SEO optimization'
		),
	],
	[
		new BioItem('ФИО', 'Максим Ганиев'),
		new BioItem('Специализация', 'Фулл стак веб-разработчик'),
		new BioItem('Местоположение', 'Санкт-Петербург, Россия'),
		new BioItem(
			'Миссия',
			'С нуля пишу быстрые и легкие, SEO - оптимизированные веб-инструменты с использованием самых эффективных современных технологий'
		),
		new BioItem(
			'Стэк',
			'JS [SvelteKit, Vue]; NodeJS [express]; CSS3 [SASS, Bootstrap, Vuetify]; генераторы статических сайтов [Astro]; PHP [Laravel]; mySQL с ORM (Prisma) и без; конфигурация сервера [NGINX, Apache]; сборщики [Vite, Webpack, Snowpack]; SEO оптимизация'
		),
	],
];
