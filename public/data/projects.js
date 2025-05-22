class Project {
	static id = 0;

	constructor(
		name,
		/**@type {String} @desc{Если необходимо выыести описание, как список - использовать \n в кач-ве разделителей} */ desc,
		link,
		asset_folder,
		/**@type {String[]} */
		available_orientations,
		/**@type {String[]} */
		tags,
		is_under_maintainance = false
	) {
		this.id = Project.id++;
		this.name = name;
		this.desc = desc;
		this.link = link;
		this.asset_folder = asset_folder;
		this.available_orientations = available_orientations;
		this.tags = tags;
		this.is_under_maintainance = is_under_maintainance;

		this.thumb = '/assets/imgs/projects/' + this.asset_folder + '/thumb.png';

		if (this.available_orientations.length === 2)
			this.video_urls = [
				'/assets/video/projects/' + this.asset_folder + '/d.mp4',
				'/assets/video/projects/' + this.asset_folder + '/m.mp4'
			];
		else {
			if (this.available_orientations.includes('landscape'))
				this.video_urls = ['/assets/video/projects/' + this.asset_folder + '/d.mp4'];
			if (this.available_orientations.includes('portrait'))
				this.video_urls = ['/assets/video/projects/' + this.asset_folder + '/m.mp4'];
		}
	}
}

/**
 * https://schema-draggable.netlify.app/
 * https://beta.elcomspb.ru/tool/highvolt_conf
 * https://www.elcomspb.ru/pumps_selector/
 * https://www.elcomspb.ru/index.php?route=tool/freightcalc
 * ??? https://www.elcomspb.ru/
 */

export const projectItemsList = [
	//ENG
	[
		new Project(
			'ESQ promo website',
			'Promo page of ESQ brand industrial products. Lib-free (all UI components are custom-made)',
			'https://esq.elcomspb.ru/',
			'esq',
			['landscape', 'portrait'],
			['SvelteKit', 'Prisma']
		),
		new Project(
			'Organizational chart editor',
			'This tool allows easily manipulate an organizational structure using visual interface, specifically: \n as admin, you can edit existing schema or build it from scratch; \n you are also free to update employees personal data including photos; \n to "fire" or to "hire" emplyees with a button click;\n as a guest, you can view schema or search users of releavant department \n <a class="inbuilt-link" href="https://portal.elcomspb.ru/interactive-scheme" target="_blank">And this is how the final versions of schemas <strong style="color: #BF4081; cursor: pointer;">looks</strong>. You can\'t do much here as only admins have CRUD functionality.</a>',
			'https://schema-draggable.netlify.app/',
			'schema',
			['landscape'],
			['Vue2', 'Laravel 5']
		),
		// new Project(
		// 	'Atomy new member welcome page',
		// 	'The welcome page for a new cosmetic reseller team member - in essence, a simple input form with some interactive bio.',
		// 	'https://atomy-rus.netlify.app/',
		// 	'atomy',
		// 	['landscape', 'portrait'],
		// 	['Vue 3', 'Tailwind', 'Astro'],
		// 	true
		// ),
		new Project(
			'Industrial pump selection tool',
			'The tool to select right water pumps per duty points provided.',
			'http://77.222.43.140:4000/',
			'jetex',
			['landscape', 'portrait'],
			['SvelteKit', 'Prisma'],
			true
		)
	],
	//RU
	[
		new Project(
			'Промо-сайт бренда ESQ',
			'Рекламный сайт промышленной продукции ESQ. Все компоненты - самописные.',
			'https://esq.elcomspb.ru/',
			'esq',
			['landscape', 'portrait'],
			['SvelteKit', 'Prisma']
		),
		new Project(
			'Редактор организационной структуры',
			'Позволяет управлять структурой организации при помощи визуального интерфейса, а именно: \n как администратор Вы можете редактировать существующую структуру подчиненности внутри компании либо создавать ее с нуля; \n обновлять личную информацию о сотрудниках, включая фото; \n "увольнять" или "нанимать" сотрудников кликом мыши; \n как гость, Вы сможете работать со схемой в режиме просмотра и искать сотрудников необходимых отделов;\n <a class="inbuilt-link" href="https://portal.elcomspb.ru/interactive-scheme" target="_blank">А так выглядят схемы в <strong style="color: #BF4081; cursor: pointer;">финальной версии</strong>. Вносить в них изменения могут только администраторы.',
			'https://schema-draggable.netlify.app/',
			'schema',
			['landscape'],
			['Vue2', 'Laravel 5']
		),
		// new Project(
		// 	'Приветственная страница для новых участников Atomy',
		// 	'Приветственная страница для нового члена команды по продаже косметики. По сути, это простая форма ввода с интерактивным био.',
		// 	'https://atomy-rus.netlify.app/',
		// 	'atomy',
		// 	['landscape', 'portrait'],
		// 	['Vue 3', 'Tailwind', 'Astro'],
		// 	true
		// ),
		new Project(
			'Инструмент для подбора промышленных насосов ',
			'Инструмент для подбора подходящих водяных насосов в зависимости от заданных рабочих точек.',
			'http://77.222.43.140:4000/',
			'jetex',
			['landscape', 'portrait'],
			['SvelteKit', 'Prisma'],
			true
		)
	]
];
