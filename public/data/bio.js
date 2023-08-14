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
			'JS (ES6) and its best available frameworks to get the job done: SvelteKit, Vue; NodeJS: I use express; CSS3 and SASS; static site generators (Astro); PHP (Laravel); mySQL - raw or using ORMs like Prisma; server configuration: NGINX, Apache; web compilers: Vite, Webpack, Snowpack; SEO optimization (high web metrics, meta tags, keywords etc.)'
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
			'JS (ES6) и лучшие из существующих фреймворков, чтобы работа выполнялась в кратчайшие сроки: SvelteKit, Vue; NodeJS (express); CSS3 и SASS; генераторы статических сайтов (Astro); PHP (Laravel); mySQL - "сырой" либо с применением ORM систем типа Prisma; конфигурация сервера: NGINX, Apache; сборщики: Vite, Webpack, Snowpack; SEO оптимизация (за счет высоких метрик, мета тагов, ключевых слов и т.д.)'
		),
	],
];
