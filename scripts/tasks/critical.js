const critical = require('critical')
const del = require('del')
const { getCMSPath, getPublicPath } = require('../utils/paths')

const criticalCSS = async done => {
	// require('events').EventEmitter.defaultMaxListeners = 15

	// eslint-disable-next-line import/no-dynamic-require
	const { css: cssFile } = require(getCMSPath('manifest.json'))

	done()

	const {
		PATHS: { critical: paths, proxy },
		TASK: { critical: options }
	} = global

	await del([getCMSPath('templates/inline-css')])

	return Promise.all(
		paths.map(
			({ url, css }) =>
				new Promise((resolve, reject) => {
					critical
						.generate({
							inline: false,
							src: `${proxy}${url}`,
							css: [getPublicPath(cssFile)],
							dest: getCMSPath(`templates/inline-css/${css}.css`),
							...options
						})
						.catch(e => {
							reject(e)
						})
						.then(resolve)
				})
		)
	)
}
module.exports = criticalCSS
