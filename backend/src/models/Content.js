const mongoose = require('mongoose');

const baseOptions = {
  discriminatorKey: 'type',
  collection: 'contents',
  timestamps: true,
};

const ContentSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
}, baseOptions);

const Content = mongoose.model('Content', ContentSchema);

const Article = Content.discriminator(
  'article',
  new mongoose.Schema({
    contentHtml: { type: String, required: true },
  })
);

const Video = Content.discriminator(
  'video',
  new mongoose.Schema({
    videoUrl: { type: String, required: true },
    descriptionHtml: { type: String, required: true },
  })
);

module.exports = { Content, Article, Video };
