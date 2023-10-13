import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
	definition: {
		info: {
			title: 'BookApi',
			version: '1.0.0',
			contact: {
				name: 'Roberto Barbosa'
			}
		}
	},
	apis: ['**/*.ts']
};

export const SwaggerSpec = swaggerJSDoc(options);
