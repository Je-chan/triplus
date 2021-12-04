const {isAuthorized} = require('./user');
const {guide_user_participate} = require('./../../models');
const {selectGuideCardById} = require('./../functions/guide_card');

module.exports = {
  createGuideUserParticipate: async (req) => {
    const resObject = {};
    const accessToken = isAuthorized(req);
    const guideCard = await selectGuideCardById(req.body.guideId);

    // 토큰이 없었을 때
    try {
      if(!accessToken){
        throw 'accessToken이 없습니다';
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
      resObject['code'] = 401;
      resObject['message'] = error;
    }

    // 참가인원이 다 찼을 때
    console.log(guideCard);
    try {
      await guide_user_participate.findAll({
        raw: true,
        where: {guideId: req.body.guideId}
      }).then(result => {
        console.log(result);
      });
    } catch (error) {
      
    }

    // 중복 참가신청 됐을 때

    // 참가신청이 됐을 때
    try {

      resObject['code'] = 201;
      resObject['message'] = '참가신청이 되었습니다'
    } catch (error) {
      
    }
    

    return resObject;
  }
}