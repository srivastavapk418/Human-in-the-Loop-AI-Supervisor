const mongoose = require('mongoose');
const KnowledgeSchema = new mongoose.Schema({
  key: String,
  answer: String
});
const KnowledgeModel = mongoose.model('Knowledge', KnowledgeSchema);
module.exports = { KnowledgeModel };

