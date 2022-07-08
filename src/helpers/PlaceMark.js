export default function PlaceMark(pm) {
    return {
        close() {
            if (pm.options.get('iconImageHref') === '/icons/dot.svg') {
                return
            }

            pm.options.set('iconImageHref', '/icons/dot.svg')
            pm.properties.set('iconContent', '')
            pm.options.set('iconImageSize', [24, 24])
            pm.options.set('iconImageOffset', [-5, -5])
        },

        async open(t, infoPromise) {
            pm.options.set('iconImageHref', '/pointWithBody.svg')
            pm.properties.set('iconContent', t('loading'))
            pm.properties.set('iconContent', await infoPromise)
            pm.options.set('iconImageSize', [212, 60])
            pm.options.set('iconImageOffset', [-12, -50])
        }
    }
}
