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
		tags
	) {
		this.id = Project.id++;
		this.name = name;
		this.desc = desc;
		this.link = link;
		this.asset_folder = asset_folder;
		this.available_orientations = available_orientations;
		this.tags = tags;

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
			'Organizational chart editor',
			'This tool allows easily manipulate an organizational structure using visual interface, specifically: \n as admin, you can edit existing schema or build it from scratch; \n you are also free to update employees personal data including photos; \n to "fire" or to "hire" emplyees with a button click;\n as a guest, you can view schema or search users of releavant department \n <a class="inbuilt-link" href="https://portal.elcomspb.ru/interactive-scheme" target="_blank">And this is how the final versions of schemas <strong style="color: #BF4081; cursor: pointer;">looks</strong>. You can\'t do much here as only admins have CRUD functionality.</a>',
			'https://schema-draggable.netlify.app/',
			'schema',
			['landscape'],
			['Vue2', 'Laravel 5']
		),
		new Project(
			'High voltage motor configurator',
			'This configurator is one of multiples in the series, it does basically what it is called - helps you to select proper electric motor, choose necessary configuration, check its cost and share PDF proposal with your customer. There are also configurators for other types of electric motors, also for pumps, control panels etc.',
			'https://beta.elcomspb.ru/tool/highvolt_conf',
			'hvm',
			['landscape', 'portrait'],
			['SvelteKit', 'Prisma']
		),
		new Project(
			'Pumps selector',
			'A specific tool for technical staff that helps you to choose an industrial electric pump by either entering necessary duty points or by using interactive chart. The selector also provides real-time prices, we also plan to include real-time stock availability. It also suggests you related products.',
			'https://old.elcomspb.ru/pumps_selector/',
			'pump',
			['landscape', 'portrait'],
			['JS', 'Laravel 5']
		),
		new Project(
			'The Portal - a corporative ecosystem',
			"A comprehensive platform that includes wide range of tools to serve needs of the company's employees - dynamic repors, graphic data, business instruments to provide fluid communications between multiple departments, etc. The platform is OAuth2 protected, so you has to be authorized to get access to the content.",
			'https://portal.elcomspb.ru/',
			'portal',
			['landscape'],
			['Vue2', 'Laravel 5']
		)
	],
	//RU
	[
		new Project(
			'Редактор организационной структуры',
			'Позволяет управлять структурой организации при помощи визуального интерфейса, а именно: \n как администратор Вы можете редактировать существующую структуру подчиненности внутри компании либо создавать ее с нуля; \n обновлять личную информацию о сотрудниках, включая фото; \n "увольнять" или "нанимать" сотрудников кликом мыши; \n как гость, Вы сможете работать со схемой в режиме просмотра и искать сотрудников необходимых отделов;\n <a class="inbuilt-link" href="https://portal.elcomspb.ru/interactive-scheme" target="_blank">А так выглядят схемы в <strong style="color: #BF4081; cursor: pointer;">финальной версии</strong>. Вносить в них изменения могут только администраторы.',
			'https://schema-draggable.netlify.app/',
			'schema',
			['landscape'],
			['Vue2', 'Laravel 5']
		),
		new Project(
			'Конфигуратор высоковольтных электродвигателей',
			'Один из множества в серии, его функционал отражается в названии: с его помощью вы можете сконфигурировать высоковольтный двигатель и сохранить результат в PDF. В серии также присутствуют конфигураторы для других типов электродвигателей, а также для насосов, шкафов управления и т.п.',
			'https://beta.elcomspb.ru/tool/highvolt_conf',
			'hvm',
			['landscape', 'portrait'],
			['SvelteKit', 'Prisma']
		),
		new Project(
			'Подбор насосного оборудования',
			'Специализированный продукт для технических сотрудников, который поможет с подбором промышленного электронасоса по рабочим точкам либо с помощью интерактивного графика. В инструменте также выводятся цены на оборудование, обновляемые в режиме реального времени, также планируется добавить публикацию актуальных складских остатков. Также предлагаются сопутствующие товары.',
			'https://old.elcomspb.ru/pumps_selector/',
			'pump',
			['landscape', 'portrait'],
			['JS', 'Laravel 5']
		),
		new Project(
			'Портал - корпоративная экосистема',
			'Сложная  платформа, включающая в себя широкий спектр инструментов для удовлетворения потребностей сотрудников компании — динамические отчеты, графики, бизнес-инструменты для обеспечения гибкого взаимодействия между разными отделами и т. д. Платформа защищена OAuth2, поэтому вы должны быть авторизованы для получения доступа к содержимому.',
			'https://portal.elcomspb.ru/',
			'portal',
			['landscape'],
			['Vue2', 'Laravel 5']
		)
	]
];
