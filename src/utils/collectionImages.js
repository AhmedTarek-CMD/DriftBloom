const collectionImageModules = import.meta.glob('../assets/*/collection.*', {
  eager: true,
  import: 'default',
})

const normalizeCollectionName = (name = '') =>
  String(name)
    .trim()
    .replace(/\s+collection$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const collectionImagesByName = Object.entries(collectionImageModules).reduce(
  (images, [path, image]) => {
    const match = path.match(/\/assets\/([^/]+)\/collection\.[^/]+$/i)
    if (!match) return images

    images[normalizeCollectionName(match[1])] = image
    return images
  },
  {},
)

export function getCollectionImage(packageName, fallbackImage) {
  const key = normalizeCollectionName(packageName)
  return collectionImagesByName[key] || fallbackImage
}
