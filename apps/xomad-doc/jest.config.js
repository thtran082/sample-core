module.exports = {
  name: 'xomad-doc',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/xomad-doc',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
