'use strict';

const pieceLoader = (source) => {
  const pieceManifest = JSON.parse(source);
  if (!pieceManifest.isRecordable) {
    return `export default {
      isRecordable: false
    }`;
  }
  const output = `import image from '${pieceManifest.image}';
  export default {
    image,
    makePiece: import('${pieceManifest.makePiece}'),
    isRecordable: true,
    title: '${pieceManifest.title}',
    id: '${pieceManifest.id}',
    artist: '${pieceManifest.artistId}',
    tags: [${pieceManifest.tags.map((tag) => `"${tag}"`)}],
    releaseDate: new Date('${pieceManifest.releaseDate}'),
  }`;

  return output;
};

module.exports = pieceLoader;
