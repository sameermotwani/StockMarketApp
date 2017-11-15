/**
 * Created by aniru on 3/21/2017.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var OpinionSchema = require('./opinion.schema.server.js')();
    var Opinion = mongoose.model('Opinion', OpinionSchema);

    var api = {
        createOpinion: createOpinion,
        findOpinionById: findOpinionById,
        findAllOpinionsForTicker: findAllOpinionsForTicker,
        updateOpinion: updateOpinion,
        deleteOpinion: deleteOpinion
    };
    return api;

    function createOpinion(opinion) {
        return Opinion.create(opinion);
    }

    function findOpinionById(opinionId) {
        return Opinion.findById({_id: opinionId});
    }

    function findAllOpinionsForTicker(ticker) {
        return Opinion.find({ticker: ticker}).populate('_user');
    }

    function updateOpinion(opinionId, opinion) {
        return Opinion
            .update({_id: opinionId}, {
                $set: {
                    comment: opinion.comment
                }
            });
    }

    function deleteOpinion(opinionId) {
        return Opinion.remove({_id: opinionId});
    }

};