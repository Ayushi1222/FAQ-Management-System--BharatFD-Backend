import mongoose from 'mongoose';
const { Schema } = mongoose;

const faqSchema = new Schema({
  questionSlug: {
    type: String,
    required: true,
    unique: true
  },
  translations: [{
    language: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    answerComponents: [{
      type: {
        type: String,
        enum: ['text', 'code', 'image', 'video', 'link'],
        required: true
      },
      content: Schema.Types.Mixed,
      position: Number
    }],
    revisionHistory: [{
      content: {
        question: String,
        answer: String
      },
      modifiedBy: String,
      modifiedAt: Date,
      changeReason: String
    }]
  }],
  metrics: {
    helpfulVotes: { type: Number, default: 0 },
    notHelpfulVotes: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    searchHits: { type: Number, default: 0 }
  },
  relatedFAQs: [{
    faqId: {
      type: Schema.Types.ObjectId,
      ref: 'FAQ'
    },
    relationStrength: Number
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  category: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Using arrow functions for methods
faqSchema.methods.findSimilarFAQs = async () => {
  const similar = await this.model('FAQ').find({
    'translations.question': {
      $regex: new RegExp(this.translations[0].question.split(' ').join('|'), 'i')
    },
    _id: { $ne: this._id }
  }).limit(5);
  return similar;
};

faqSchema.methods.recordEngagement = async (type) => {
  switch(type) {
    case 'view':
      this.metrics.viewCount++;
      break;
    case 'helpful':
      this.metrics.helpfulVotes++;
      break;
    case 'notHelpful':
      this.metrics.notHelpfulVotes++;
      break;
    case 'search':
      this.metrics.searchHits++;
      break;
  }
  await this.save();
};

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;